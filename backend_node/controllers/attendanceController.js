import pool from '../config/db.js';
import { redisClient } from '../utils/cache.js';
import { format, startOfWeek, endOfWeek, subWeeks } from 'date-fns';

// Fetch all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const cacheKey = 'attendance_list';
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const query = 'SELECT * FROM attendance';
    const { rows: attendanceRecords } = await pool.query(query);

    const attendanceList = attendanceRecords.map((record) => ({
      id: record.id,
      child_id: record.child_id,
      date: record.date.toISOString(),
      status: record.status,
    }));

    await redisClient.setEx(cacheKey, 300, JSON.stringify(attendanceList)); // Cache for 5 minutes

    return res.status(200).json(attendanceList);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve attendance records',
        code: 500,
        details: error.message,
      },
    });
  }
};

// Helper function to get the start and end of the week
const getWeekRange = (date) => {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  };
};

// Fetch attendance count for a specific date range
const getAttendanceCount = async (startDate, endDate) => {
  const query = `
    SELECT COUNT(*) AS count 
    FROM attendance 
    WHERE date >= $1 AND date <= $2 AND status IN ('on-time', 'late attendance')
  `;
  const { rows } = await pool.query(query, [format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')]);
  return parseInt(rows[0].count, 10);
};

// Predict attendance change percentage between weeks
export const predictAttendance = async (req, res) => {
  try {
    const today = new Date();
    const { start: currentWeekStart, end: currentWeekEnd } = getWeekRange(today);
    const { start: lastWeekStart, end: lastWeekEnd } = getWeekRange(subWeeks(today, 1));

    const currentWeekAttendance = await getAttendanceCount(currentWeekStart, currentWeekEnd);
    const lastWeekAttendance = await getAttendanceCount(lastWeekStart, lastWeekEnd);

    let changePercentage = 'No data for last week';
    if (lastWeekAttendance > 0) {
      changePercentage = Math.round(((currentWeekAttendance - lastWeekAttendance) / lastWeekAttendance) * 100);
    }

    const result = {
      current_week_attendance: currentWeekAttendance,
      last_week_attendance: lastWeekAttendance,
      change_percentage: changePercentage,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in attendance prediction:', error);
    res.status(500).json({ message: 'Failed to predict attendance' });
  }
};