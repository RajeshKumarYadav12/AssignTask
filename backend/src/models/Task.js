const mongoose = require("mongoose");

/**
 * Task Schema - Secondary entity for CRUD operations
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a task description"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "in-progress", "completed"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "{VALUE} is not a valid priority",
      },
      default: "medium",
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          // Due date should be in the future
          return !value || value >= new Date();
        },
        message: "Due date must be in the future",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must belong to a user"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ status: 1, priority: 1 });
taskSchema.index({ dueDate: 1 });

/**
 * Update completion status and timestamp
 */
taskSchema.pre("save", function (next) {
  if (this.status === "completed" && !this.completedAt) {
    this.completedAt = new Date();
    this.isCompleted = true;
  } else if (this.status !== "completed") {
    this.completedAt = null;
    this.isCompleted = false;
  }
  next();
});

/**
 * Virtual for checking if task is overdue
 */
taskSchema.virtual("isOverdue").get(function () {
  if (!this.dueDate || this.status === "completed") {
    return false;
  }
  return new Date() > this.dueDate;
});

/**
 * Remove version key from JSON response
 */
taskSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
