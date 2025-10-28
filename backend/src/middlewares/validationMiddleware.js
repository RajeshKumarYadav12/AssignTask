const { validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responseFormatter");

/**
 * Validation Error Handler Middleware
 * Checks for validation errors and returns formatted response
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value,
    }));

    return errorResponse(res, 400, "Validation failed", formattedErrors);
  }

  next();
};

module.exports = validate;
