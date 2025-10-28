const jwt = require("jsonwebtoken");

/**
 * Generate JWT Access Token
 * @param {string} userId - User ID to encode in token
 * @returns {string} - JWT access token
 */
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

/**
 * Generate JWT Refresh Token
 * @param {string} userId - User ID to encode in token
 * @returns {string} - JWT refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "30d",
  });
};

/**
 * Verify JWT Token
 * @param {string} token - Token to verify
 * @param {boolean} isRefresh - Whether token is a refresh token
 * @returns {Object} - Decoded token payload
 */
const verifyToken = (token, isRefresh = false) => {
  const secret = isRefresh
    ? process.env.JWT_REFRESH_SECRET
    : process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

/**
 * Generate both access and refresh tokens
 * @param {string} userId - User ID to encode in tokens
 * @returns {Object} - Object containing both tokens
 */
const generateTokens = (userId) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  generateTokens,
};
