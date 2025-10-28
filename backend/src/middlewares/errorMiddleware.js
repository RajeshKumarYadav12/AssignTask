const logger = require("../config/logger");
const { errorResponse } = require("../utils/responseFormatter");

/**
 * Global Error Handler Middleware
 * Catches all errors and returns consistent error responses
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return errorResponse(res, 400, "Validation Error", errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return errorResponse(
      res,
      400,
      `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
    );
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    return errorResponse(res, 400, "Invalid ID format");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return errorResponse(res, 401, "Invalid token");
  }

  if (err.name === "TokenExpiredError") {
    return errorResponse(res, 401, "Token expired");
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, statusCode, message);
};

/**
 * 404 Not Found Handler
 */
const notFound = (req, res) => {
  return errorResponse(res, 404, `Route ${req.originalUrl} not found`);
};

module.exports = { errorHandler, notFound };
