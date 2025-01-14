import pool from '../config/db.js';
import { redisClient } from '../utils/cache.js';

export const getAllChildren = async (req, res) => {
  const year = req.query.year; 
  const cacheKey = year ? `children_list_${year}` : 'children_list'; // Cache key for specific years or all children

  try {
    // Check for cached data
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Query based on whether 'year' is provided
    const query = year 
      ? 'SELECT * FROM child WHERE year = $1' 
      : 'SELECT * FROM child';
    const params = year ? [year] : [];
    
    // Execute PostgreSQL query
    const { rows: children } = await pool.query(query, params);

    // Transform result
    const childrenList = children.map(child => ({
      id: child.id,
      name: child.name,
      age: child.age,
      status: child.status,
      year: child.year,
    }));

    // Cache the result with a 5-second expiration
    await redisClient.setEx(cacheKey, 5, JSON.stringify(childrenList));
    return res.status(200).json(childrenList);
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve children',
        code: 500,
        details: error.message,
      },
    });
  }
};