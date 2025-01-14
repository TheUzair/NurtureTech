import pool from '../config/db.js';

export const getAllChildren = async (year) => {
  const query = year
    ? 'SELECT * FROM child WHERE year = $1'
    : 'SELECT * FROM child';
  const values = year ? [year] : [];
  const { rows: children } = await pool.query(query, values);
  return children;
};