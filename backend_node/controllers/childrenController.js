import connection from '../config/db.js';
import { redisClient } from '../utils/cache.js'; 

export const getAllChildren = async (req, res) => {
  const year = req.query.year; 
  const cacheKey = year ? `children_list_${year}` : 'children_list'; //  it will store/retrieve data specifically for that year using a unique cache key like children_list_2023

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const query = year ? 'SELECT * FROM child WHERE year = ?' : 'SELECT * FROM child';
    const [children] = await connection.execute(query, year ? [year] : []);

    const childrenList = children.map(child => ({
      id: child.id,
      name: child.name,
      age: child.age,
      status: child.status,
      year: child.year,
    }));

    await redisClient.setEx(cacheKey, 5, JSON.stringify(childrenList));
    return res.status(200).json(childrenList);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve children',
        code: 500,
        details: error.message,
      },
    });
  }
};