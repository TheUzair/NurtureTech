import connection from '../config/db.js';

const getAllEnrollments = async () => {
  const [enrollments] = await connection.execute('SELECT * FROM enrollment');
  return enrollments;
};

export default getAllEnrollments