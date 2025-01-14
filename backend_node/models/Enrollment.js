import pool from '../config/db.js';

const getAllEnrollments = async () => {
  const { rows: enrollments } = await pool.query('SELECT * FROM enrollment');
  return enrollments;
};

export default getAllEnrollments;
