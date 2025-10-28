const User = require("../models/User");
const { generateTokens } = require("../utils/jwtUtils");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");
const logger = require("../config/logger");

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User already exists with this email");
    }

    // Create user (password will be hashed by pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user", // Default to 'user' if not specified
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    logger.info(`New user registered: ${user.email}`);

    return successResponse(res, 201, "User registered successfully", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return errorResponse(res, 401, "Invalid email or password");
    }

    // Check if user is active
    if (!user.isActive) {
      return errorResponse(
        res,
        401,
        "Account is deactivated. Please contact support."
      );
    }

    // Verify password
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return errorResponse(res, 401, "Invalid email or password");
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Update last login and save refresh token
    user.lastLogin = new Date();
    user.refreshToken = refreshToken;
    await user.save();

    logger.info(`User logged in: ${user.email}`);

    return successResponse(res, 200, "Login successful", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    return successResponse(res, 200, "User profile retrieved", {
      user,
    });
  } catch (error) {
    logger.error(`Get profile error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, 400, "Refresh token is required");
    }

    // Verify refresh token
    const { verifyToken } = require("../utils/jwtUtils");
    const decoded = verifyToken(refreshToken, true);

    // Find user with this refresh token
    const user = await User.findOne({
      _id: decoded.id,
      refreshToken,
    }).select("+refreshToken");

    if (!user) {
      return errorResponse(res, 401, "Invalid refresh token");
    }

    // Generate new tokens
    const tokens = generateTokens(user._id);

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return successResponse(res, 200, "Token refreshed successfully", {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    logger.error(`Refresh token error: ${error.message}`);
    return errorResponse(res, 401, "Invalid or expired refresh token");
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (req, res, next) => {
  try {
    // Remove refresh token
    const user = await User.findById(req.user.id);
    user.refreshToken = null;
    await user.save();

    logger.info(`User logged out: ${user.email}`);

    return successResponse(res, 200, "Logout successful");
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (email && email !== user.email) {
      // Check if new email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(res, 400, "Email already in use");
      }
      user.email = email;
    }

    await user.save();

    logger.info(`User profile updated: ${user.email}`);

    return successResponse(res, 200, "Profile updated successfully", {
      user,
    });
  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    // Verify current password
    const isPasswordMatch = await user.matchPassword(currentPassword);

    if (!isPasswordMatch) {
      return errorResponse(res, 401, "Current password is incorrect");
    }

    // Update password
    user.password = newPassword;
    await user.save();

    logger.info(`Password changed: ${user.email}`);

    return successResponse(res, 200, "Password changed successfully");
  } catch (error) {
    logger.error(`Change password error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  refreshToken,
  logout,
  updateProfile,
  changePassword,
};
