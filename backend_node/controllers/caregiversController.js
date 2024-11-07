import connection from '../config/db.js';
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

    let query = 'SELECT id, name, status, year FROM caregiver';
    const params = [];
    
    if (year) {
      query += ' WHERE year = ?';
      params.push(year);
    }

    // Execute the query with parameters if any
    const [caregivers] = await connection.execute(query, params);

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
    console.error(error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve caregivers',
        code: 500,
        details: error.message,
      },
    });
  }
};
