const redis = require("redis");
const logger = require("./logger");

let redisClient = null;

/**
 * Initialize Redis Client
 * Implements connection pooling and error handling
 */
const connectRedis = async () => {
  // Check if Redis is enabled via environment variable
  if (process.env.REDIS_ENABLED !== 'true') {
    logger.info('Redis caching disabled. Set REDIS_ENABLED=true to enable.');
    return null;
  }

  try {
    redisClient = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
      },
      password: process.env.REDIS_PASSWORD || undefined,
    });

    redisClient.on("error", (err) => {
      logger.error(`Redis Client Error: ${err}`);
    });

    redisClient.on("connect", () => {
      logger.info("Redis Client Connected");
    });

    await redisClient.connect();

    return redisClient;
  } catch (error) {
    logger.warn(
      `Redis connection failed: ${error.message}. Continuing without cache.`
    );
    return null;
  }
};

/**
 * Get Redis Client Instance
 */
const getRedisClient = () => {
  return redisClient;
};

/**
 * Close Redis Connection
 */
const closeRedis = async () => {
  if (redisClient) {
    await redisClient.quit();
    logger.info("Redis connection closed");
  }
};

module.exports = { connectRedis, getRedisClient, closeRedis };
