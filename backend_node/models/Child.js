import connection from '../config/db.js';

export const getAllChildren = async (year) => {
  const query = year ? 'SELECT * FROM child WHERE year = ?' : 'SELECT * FROM child';
  const [children] = await connection.execute(query, year ? [year] : []);
  return children;
};

