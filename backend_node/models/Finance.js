import connection from '../config/db.js';

const getAllFinancialRecords = async () => {
  const [financialRecords] = await connection.execute('SELECT * FROM financial');
  return financialRecords;
};

export default getAllFinancialRecords