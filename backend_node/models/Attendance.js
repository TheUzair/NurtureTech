import connection from '../config/db.js';

const getAllAttendanceRecords = async () => {
  const [attendanceRecords] = await connection.execute('SELECT * FROM attendance');
  return attendanceRecords;
};

export default getAllAttendanceRecords