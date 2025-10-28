/**
 * Standard API Response Formatter
 */

/**
 * Success Response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {Object} data - Response data
 */
const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Error Response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Array} errors - Detailed errors array
 */
const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Pagination Response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {Array} data - Response data array
 * @param {Object} pagination - Pagination metadata
 */
const paginationResponse = (res, statusCode, message, data, pagination) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination: {
      total: pagination.total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(pagination.total / pagination.limit),
    },
  });
};

module.exports = {
  successResponse,
  errorResponse,
  paginationResponse,
};
