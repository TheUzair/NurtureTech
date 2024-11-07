import connection from '../config/db.js';

const getAllCaregivers = async () => {
  const [caregivers] = await connection.execute('SELECT * FROM caregiver');
  return caregivers;
};

export default getAllCaregivers