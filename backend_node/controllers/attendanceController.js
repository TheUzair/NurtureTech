import connection from '../config/db.js';
import { redisClient } from '../utils/cache.js';
import { format, startOfWeek, endOfWeek, subWeeks } from 'date-fns';

export const getAllAttendance = async (req, res) => {
  try {
    const cacheKey = 'attendance_list';
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const query = 'SELECT * FROM attendance';
    const [attendanceRecords] = await connection.execute(query);

    const attendanceList = attendanceRecords.map(record => ({
      id: record.id,
      child_id: record.child_id,
      date: record.date.toISOString(),
      status: record.status,
    }));

    await redisClient.setEx(cacheKey, 5, JSON.stringify(attendanceList)); 

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

const getWeekRange = (date) => {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  };
};

const getAttendanceCount = async (startDate, endDate) => {
  const query = `
    SELECT COUNT(*) AS count FROM attendance 
    WHERE date >= ? AND date <= ? AND status IN ('on-time', 'late attendance')
  `;
  const [result] = await connection.execute(query, [format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')]);
  return result[0].count;
};

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
