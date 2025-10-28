const { getRedisClient } = require("../config/redis");
const logger = require("../config/logger");

/**
 * Cache Middleware - Cache GET requests
 * @param {number} expiry - Cache expiry time in seconds
 */
const cache = (expiry = 3600) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const redisClient = getRedisClient();

    // Skip caching if Redis is not available
    if (!redisClient || !redisClient.isOpen) {
      return next();
    }

    try {
      // Create cache key from URL and query params
      const cacheKey = `cache:${req.originalUrl}:${
        req.user ? req.user.id : "guest"
      }`;

      // Check if data exists in cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        logger.debug(`Cache hit: ${cacheKey}`);
        return res.status(200).json(JSON.parse(cachedData));
      }

      // Store original res.json function
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response
      res.json = (body) => {
        // Only cache successful responses
        if (res.statusCode === 200 && body.success) {
          redisClient
            .setEx(cacheKey, expiry, JSON.stringify(body))
            .then(() => {
              logger.debug(`Cache set: ${cacheKey}`);
            })
            .catch((err) => {
              logger.error(`Cache set error: ${err.message}`);
            });
        }

        return originalJson(body);
      };

      next();
    } catch (error) {
      logger.error(`Cache middleware error: ${error.message}`);
      next();
    }
  };
};

/**
 * Clear cache for specific pattern
 * @param {string} pattern - Redis key pattern
 */
const clearCache = async (pattern) => {
  const redisClient = getRedisClient();

  if (!redisClient || !redisClient.isOpen) {
    return;
  }

  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      logger.debug(`Cache cleared: ${pattern}`);
    }
  } catch (error) {
    logger.error(`Cache clear error: ${error.message}`);
  }
};

/**
 * Clear user-specific cache
 */
const clearUserCache = (userId) => {
  return clearCache(`cache:*:${userId}`);
};

module.exports = { cache, clearCache, clearUserCache };
