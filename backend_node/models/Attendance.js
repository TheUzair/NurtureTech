import pool from '../config/db.js';

const getAllAttendanceRecords = async () => {
  const { rows: attendanceRecords } = await pool.query('SELECT * FROM attendance');
  return attendanceRecords;
};

export default getAllAttendanceRecords;
