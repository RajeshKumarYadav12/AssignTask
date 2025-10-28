const User = require("../models/User");
const Task = require("../models/Task");
const {
  successResponse,
  errorResponse,
  paginationResponse,
} = require("../utils/responseFormatter");
const logger = require("../config/logger");

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, isActive, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};

    if (role) {
      query.role = role;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await User.countDocuments(query);

    return paginationResponse(res, 200, "Users retrieved successfully", users, {
      total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (error) {
    logger.error(`Get all users error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get user by ID (Admin only)
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    // Get user's task count
    const taskCount = await Task.countDocuments({ user: user._id });

    return successResponse(res, 200, "User retrieved successfully", {
      user,
      taskCount,
    });
  } catch (error) {
    logger.error(`Get user by ID error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update user (Admin only)
 * @route   PUT /api/admin/users/:id
 * @access  Private/Admin
 */
const updateUser = async (req, res, next) => {
  try {
    const { name, email, role, isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    // Update fields
    if (name) user.name = name;
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(res, 400, "Email already in use");
      }
      user.email = email;
    }
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    logger.info(`User updated by admin: ${user.email}`);

    return successResponse(res, 200, "User updated successfully", { user });
  } catch (error) {
    logger.error(`Update user error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Delete user (Admin only)
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return errorResponse(res, 400, "Cannot delete your own account");
    }

    // Delete all tasks belonging to this user
    await Task.deleteMany({ user: user._id });

    await user.deleteOne();

    logger.info(`User deleted by admin: ${user.email}`);

    return successResponse(
      res,
      200,
      "User and associated tasks deleted successfully"
    );
  } catch (error) {
    logger.error(`Delete user error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get system statistics (Admin only)
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
const getSystemStats = async (req, res, next) => {
  try {
    // User stats
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: "admin" });
    const regularUsers = await User.countDocuments({ role: "user" });

    // Task stats
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "pending" });
    const inProgressTasks = await Task.countDocuments({
      status: "in-progress",
    });
    const completedTasks = await Task.countDocuments({ status: "completed" });

    // Recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        admins: adminUsers,
        regular: regularUsers,
        recentlyJoined: recentUsers,
      },
      tasks: {
        total: totalTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
      },
    };

    return successResponse(res, 200, "System statistics retrieved", stats);
  } catch (error) {
    logger.error(`Get system stats error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getSystemStats,
};
