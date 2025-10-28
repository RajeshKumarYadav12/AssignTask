require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/database");
const { connectRedis } = require("./config/redis");
const logger = require("./config/logger");
const swaggerSpecs = require("./config/swagger");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");

/**
 * Initialize Express App
 */
const app = express();

/**
 * Connect to Database and Redis
 */
(async () => {
  await connectDB();
  await connectRedis();
})();

/**
 * Security Middleware
 */
// Helmet - Set security headers
app.use(helmet());

// CORS - Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate Limiting - Prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Strict rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later.",
  skipSuccessfulRequests: true,
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

/**
 * Body Parser Middleware
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * Logging Middleware
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

/**
 * API Documentation
 */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Backend API Documentation",
  })
);

/**
 * Health Check Route
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

/**
 * Welcome Route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Backend API",
    documentation: "/api-docs",
    health: "/health",
  });
});

/**
 * Error Handling Middleware
 */
app.use(notFound);
app.use(errorHandler);

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`API Documentation: http://localhost:${PORT}/api-docs`);
});

/**
 * Handle Unhandled Promise Rejections
 */
process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

/**
 * Handle Uncaught Exceptions
 */
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = app;
