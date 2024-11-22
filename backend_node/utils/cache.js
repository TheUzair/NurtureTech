import { createClient } from 'redis';

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD, 
  socket: {
    host: process.env.REDIS_HOST, 
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
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
