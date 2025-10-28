const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Swagger API Documentation Configuration
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend API Documentation",
      version: "1.0.0",
      description:
        "REST API with JWT Authentication, RBAC, and CRUD Operations",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              description: "User full name",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
              example: "john@example.com",
            },
            password: {
              type: "string",
              format: "password",
              description: "User password (min 6 characters)",
              example: "password123",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "User role",
              example: "user",
            },
          },
        },
        Task: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: {
              type: "string",
              description: "Task title",
              example: "Complete project documentation",
            },
            description: {
              type: "string",
              description: "Task description",
              example: "Write comprehensive API documentation",
            },
            status: {
              type: "string",
              enum: ["pending", "in-progress", "completed"],
              description: "Task status",
              example: "pending",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              description: "Task priority",
              example: "high",
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "Task due date",
              example: "2025-12-31T23:59:59Z",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
            data: {
              type: "object",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
