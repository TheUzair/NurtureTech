import { createClient } from 'redis';

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}`, // Ensure this is correctly formatted
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect the Redis client
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Could not connect to Redis:', error);
  }
})();

export { redisClient };
