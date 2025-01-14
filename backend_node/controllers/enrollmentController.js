import pool from '../config/db.js';
import { redisClient } from '../utils/cache.js'; 

export const getAllEnrollments = async (req, res) => {
  const year = req.query.year || '2024'; 
  const cacheKey = `enrollment_list_${year}`;

  try {
    // Try to get data from Redis cache
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      // If cached data exists, return it
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If cache is empty, query from the database with year filtering
    const query = 'SELECT * FROM enrollment WHERE date::TEXT LIKE $1';
    const params = [`${year}%`];
    const { rows: enrollments } = await pool.query(query, params);

    // Prepare the enrollments list with relevant attributes from the Enrollment model
    const enrollmentList = enrollments.map(enrollment => ({
      id: enrollment.id,
      child_id: enrollment.child_id,
      date: enrollment.date, 
      program: enrollment.program,
    }));

    // Cache the result with a timeout of 600 seconds
    await redisClient.setEx(cacheKey, 600, JSON.stringify(enrollmentList));

    return res.status(200).json(enrollmentList);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve enrollments',
        code: 500,
        details: error.message,
      },
    });
  }
};
