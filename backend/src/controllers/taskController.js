const Task = require("../models/Task");
const {
  successResponse,
  errorResponse,
  paginationResponse,
} = require("../utils/responseFormatter");
const { clearUserCache } = require("../middlewares/cacheMiddleware");
const logger = require("../config/logger");

/**
 * @desc    Get all tasks (with filtering, sorting, pagination)
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      search,
      sortBy,
      order,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    const query = {};

    // Users can only see their own tasks, admins can see all
    if (req.user.role !== "admin") {
      query.user = req.user.id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "asc" ? 1 : -1;
    } else {
      sortOptions.createdAt = -1; // Default: newest first
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const tasks = await Task.find(query)
      .populate("user", "name email")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Task.countDocuments(query);

    return paginationResponse(res, 200, "Tasks retrieved successfully", tasks, {
      total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (error) {
    logger.error(`Get tasks error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!task) {
      return errorResponse(res, 404, "Task not found");
    }

    // Check authorization
    if (req.user.role !== "admin" && task.user._id.toString() !== req.user.id) {
      return errorResponse(res, 403, "Not authorized to access this task");
    }

    return successResponse(res, 200, "Task retrieved successfully", { task });
  } catch (error) {
    logger.error(`Get task error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Create new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Create task with current user
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id,
    });

    await task.populate("user", "name email");

    // Clear cache for this user
    await clearUserCache(req.user.id);

    logger.info(`Task created: ${task._id} by user: ${req.user.email}`);

    return successResponse(res, 201, "Task created successfully", { task });
  } catch (error) {
    logger.error(`Create task error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return errorResponse(res, 404, "Task not found");
    }

    // Check authorization
    if (req.user.role !== "admin" && task.user.toString() !== req.user.id) {
      return errorResponse(res, 403, "Not authorized to update this task");
    }

    // Update fields
    const { title, description, status, priority, dueDate } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();
    await task.populate("user", "name email");

    // Clear cache for this user
    await clearUserCache(task.user._id);

    logger.info(`Task updated: ${task._id} by user: ${req.user.email}`);

    return successResponse(res, 200, "Task updated successfully", { task });
  } catch (error) {
    logger.error(`Update task error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return errorResponse(res, 404, "Task not found");
    }

    // Check authorization
    if (req.user.role !== "admin" && task.user.toString() !== req.user.id) {
      return errorResponse(res, 403, "Not authorized to delete this task");
    }

    const userId = task.user;
    await task.deleteOne();

    // Clear cache for this user
    await clearUserCache(userId);

    logger.info(`Task deleted: ${req.params.id} by user: ${req.user.email}`);

    return successResponse(res, 200, "Task deleted successfully");
  } catch (error) {
    logger.error(`Delete task error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get task statistics
 * @route   GET /api/tasks/stats
 * @access  Private
 */
const getTaskStats = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { user: req.user.id };

    const stats = await Task.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] },
          },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          high: {
            $sum: { $cond: [{ $eq: ["$priority", "high"] }, 1, 0] },
          },
          medium: {
            $sum: { $cond: [{ $eq: ["$priority", "medium"] }, 1, 0] },
          },
          low: {
            $sum: { $cond: [{ $eq: ["$priority", "low"] }, 1, 0] },
          },
        },
      },
    ]);

    const result =
      stats.length > 0
        ? stats[0]
        : {
            total: 0,
            pending: 0,
            inProgress: 0,
            completed: 0,
            high: 0,
            medium: 0,
            low: 0,
          };

    delete result._id;

    return successResponse(res, 200, "Task statistics retrieved", result);
  } catch (error) {
    logger.error(`Get task stats error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
};
