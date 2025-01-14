import pool from '../config/db.js';
import { redisClient } from '../utils/cache.js'; 

export const getAllCaregivers = async (req, res) => {
  const year = req.query.year;
  const cacheKey = year ? `caregivers_list_${year}` : 'caregivers_list';

  try {
    // Check if data is in cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    // PostgreSQL query with parameterized inputs
    let query = 'SELECT id, name, status, year FROM caregiver';
    const params = [];
    
    if (year) {
      query += ' WHERE year = $1';
      params.push(year);
    }

    // Execute the query with parameters if any
    const { rows: caregivers } = await pool.query(query, params);

    const caregiversList = caregivers.map(caregiver => ({
      id: caregiver.id,
      name: caregiver.name,
      status: caregiver.status,
      year: caregiver.year,
    }));

    // Cache the data
    await redisClient.setEx(cacheKey, 5, JSON.stringify(caregiversList));

    return res.status(200).json(caregiversList);
  } catch (error) {
    console.error('Error fetching caregivers:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve caregivers',
        code: 500,
        details: error.message,
      },
    });
  }
};