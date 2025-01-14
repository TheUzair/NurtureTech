import pool from '../config/db.js';

const getAllFinancialRecords = async () => {
  const { rows: financialRecords } = await pool.query('SELECT * FROM financial');
  return financialRecords;
};

export default getAllFinancialRecords;