import pool from '../config/db.js';

const getAllCaregivers = async () => {
  const { rows: caregivers } = await pool.query('SELECT * FROM caregiver');
  return caregivers;
};

export default getAllCaregivers;