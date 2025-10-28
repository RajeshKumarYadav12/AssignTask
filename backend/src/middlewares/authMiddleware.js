const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse } = require("../utils/responseFormatter");
const logger = require("../config/logger");

/**
 * Protect routes - Verify JWT token and authenticate user
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return errorResponse(
        res,
        401,
        "Not authorized to access this route. Please login."
      );
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from token
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return errorResponse(res, 401, "User not found");
      }

      if (!user.isActive) {
        return errorResponse(res, 401, "User account is deactivated");
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      logger.error(`Token verification failed: ${error.message}`);
      return errorResponse(res, 401, "Invalid or expired token");
    }
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);
    return errorResponse(res, 500, "Server error during authentication");
  }
};

/**
 * Role-Based Access Control - Restrict access to specific roles
 * @param  {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 401, "User not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(
        `User ${req.user.email} attempted to access admin route with role: ${req.user.role}`
      );
      return errorResponse(
        res,
        403,
        `User role '${req.user.role}' is not authorized to access this route`
      );
    }

    next();
  };
};

/**
 * Check resource ownership - Ensure user owns the resource
 * Used for restricting users to their own resources
 */
const checkOwnership = (model) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const resource = await model.findById(resourceId);

      if (!resource) {
        return errorResponse(res, 404, "Resource not found");
      }

      // Admin can access all resources
      if (req.user.role === "admin") {
        return next();
      }

      // Check if user owns the resource
      if (resource.user.toString() !== req.user.id) {
        return errorResponse(
          res,
          403,
          "Not authorized to access this resource"
        );
      }

      next();
    } catch (error) {
      logger.error(`Ownership check error: ${error.message}`);
      return errorResponse(res, 500, "Error checking resource ownership");
    }
  };
};

module.exports = { protect, authorize, checkOwnership };
