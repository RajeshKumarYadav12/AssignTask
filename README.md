# 🚀 Full-Stack Task Management System

A production-ready, scalable full-stack application with **Next.js 14 + TypeScript + Tailwind CSS** frontend and **Node.js + Express + MongoDB** backend, featuring JWT authentication, role-based access control, Redis caching, Docker support, and comprehensive API documentation.

## 📋 Assignment Overview

**Position**: Backend Developer (Intern)  
**Company**: Bajarangs / PrimeTrade.ai  
**Submission**: Complete full-stack application with all bonus features implemented

## ✨ Features Implemented

### Core Requirements ✅

- [x] User Registration & Login with JWT Authentication
- [x] Role-Based Access Control (User & Admin roles)
- [x] Complete CRUD API for Tasks (Secondary Entity)
- [x] Input Validation with express-validator
- [x] Global Error Handling with structured responses
- [x] MongoDB Database with Mongoose ODM
- [x] API Documentation with Swagger/OpenAPI
- [x] Security (Helmet, CORS, Rate Limiting, Input Sanitization)

### Bonus Features ✅

- [x] **Redis Caching** - High-performance caching for GET requests
- [x] **Docker & Docker Compose** - Complete containerization
- [x] **Winston Logging** - Professional logging with file rotation
- [x] **Next.js 14 Frontend** - Modern React framework
- [x] **Tailwind CSS** - Beautiful, responsive UI
- [x] **TypeScript** - Full type safety
- [x] **Scalable Architecture** - Microservices-ready structure

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js 14)                 │
│  - React Server Components    - Tailwind CSS                │
│  - TypeScript                 - React Hook Form              │
│  - JWT Auth Context           - Toast Notifications          │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
                     │ (JWT Bearer Tokens)
┌────────────────────▼────────────────────────────────────────┐
│                    Backend (Node.js + Express)               │
│  - RESTful API               - JWT Authentication            │
│  - Role-Based Access Control - Input Validation             │
│  - Global Error Handler      - Security Middleware           │
└─────┬──────────────┬──────────────┬─────────────────────────┘
      │              │              │
      ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ MongoDB  │  │  Redis   │  │  Logs    │
│ Database │  │  Cache   │  │  (Winston)│
└──────────┘  └──────────┘  └──────────┘
```

## 📁 Project Structure

```
Assignment2/
├── backend/                  # Backend API
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   ├── validators/      # Input validation
│   │   └── server.js        # Entry point
│   ├── logs/                # Application logs
│   ├── Dockerfile           # Backend Docker config
│   ├── docker-compose.yml   # Full stack orchestration
│   ├── package.json
│   └── README.md
│
├── frontend/                # Frontend Application
│   ├── src/
│   │   ├── app/            # Next.js app router
│   │   ├── contexts/       # React contexts
│   │   ├── lib/            # Utilities & API client
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   ├── tailwind.config.js  # Tailwind configuration
│   ├── package.json
│   └── README.md
│
└── README.md               # This file
```

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local or Atlas)
- **Redis** (optional, for caching)
- **Docker** (optional, for containerization)

### Option 1: Local Development (Recommended for Development)

#### 1. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env with your configuration
# Required: MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET

# Start MongoDB (if local)
# mongod

# Start Redis (optional)
# redis-server

# Run backend
npm run dev
```

Backend will run on: **http://localhost:5000**  
API Documentation: **http://localhost:5000/api-docs**

#### 2. Frontend Setup

```powershell
# Open new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.local.example .env.local

# Start frontend
npm run dev
```

Frontend will run on: **http://localhost:3000**

### Option 2: Docker (Recommended for Production)

```powershell
# Navigate to backend directory
cd backend

# Start all services (MongoDB, Redis, Backend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services:

- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

For frontend with Docker, run it separately:

```powershell
cd frontend
npm install
npm run dev
```

## 🔑 Default Credentials

### Admin Account

- **Email**: admin@example.com
- **Password**: password123
- **Access**: Full system access, user management, analytics

### Regular User Account

- **Email**: user@example.com
- **Password**: password123
- **Access**: Personal tasks, profile management

**Note**: Create these accounts by:

1. Register via `/register` endpoint or UI
2. Manually update role in MongoDB to 'admin'

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/me             - Get current user (Protected)
POST   /api/auth/refresh        - Refresh access token
POST   /api/auth/logout         - Logout user (Protected)
PUT    /api/auth/profile        - Update profile (Protected)
PUT    /api/auth/change-password - Change password (Protected)
```

### Tasks

```
GET    /api/tasks               - Get all tasks with filters (Protected)
GET    /api/tasks/:id           - Get single task (Protected)
POST   /api/tasks               - Create task (Protected)
PUT    /api/tasks/:id           - Update task (Protected)
DELETE /api/tasks/:id           - Delete task (Protected)
GET    /api/tasks/stats         - Get task statistics (Protected)
```

### Admin (Admin only)

```
GET    /api/admin/users         - Get all users
GET    /api/admin/users/:id     - Get user by ID
PUT    /api/admin/users/:id     - Update user
DELETE /api/admin/users/:id     - Delete user
GET    /api/admin/stats         - Get system statistics
```

## 📖 API Documentation

Interactive API documentation available at:

- **Swagger UI**: http://localhost:5000/api-docs

Features:

- Try out endpoints directly
- View request/response schemas
- Authentication with Bearer token
- Example requests and responses

## 🧪 Testing the API

### Using Swagger UI (Recommended)

1. Open http://localhost:5000/api-docs
2. Click "Authorize" button
3. Enter: `Bearer <your-token>`
4. Test endpoints interactively

### Using cURL

```powershell
# Register
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"john@example.com","password":"password123"}'

# Create Task (replace <TOKEN>)
curl -X POST http://localhost:5000/api/tasks `
  -H "Authorization: Bearer <TOKEN>" `
  -H "Content-Type: application/json" `
  -d '{"title":"New Task","description":"Task description","priority":"high"}'
```

## 🔒 Security Features

1. **JWT Authentication**

   - Access token (7 days)
   - Refresh token (30 days)
   - Automatic token refresh

2. **Password Security**

   - Bcrypt hashing with salt
   - Minimum 6 characters
   - Password change endpoint

3. **Rate Limiting**

   - General API: 100 req/15min
   - Auth endpoints: 5 req/15min

4. **Input Sanitization**

   - NoSQL injection prevention
   - XSS protection
   - Input validation

5. **Security Headers**
   - Helmet middleware
   - CORS configuration
   - Content Security Policy

## 🎯 Frontend Features

### Pages

- **Landing Page** (`/`) - Hero section with features
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Dashboard** (`/dashboard`) - Protected task management

### Key Features

- **Responsive Design** - Mobile-first approach
- **Form Validation** - Real-time validation
- **Toast Notifications** - Success/error messages
- **Loading States** - Smooth user experience
- **Auto Token Refresh** - Seamless authentication
- **Protected Routes** - Auth guards

## 📊 Database Schema

### User Model

```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6 chars),
  role: Enum ['user', 'admin'] (default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  refreshToken: String,
  timestamps: true
}
```

### Task Model

```javascript
{
  title: String (required, 3-100 chars),
  description: String (required, max 500 chars),
  status: Enum ['pending', 'in-progress', 'completed'],
  priority: Enum ['low', 'medium', 'high'],
  dueDate: Date (optional, future date),
  user: ObjectId (ref: 'User', required),
  isCompleted: Boolean,
  completedAt: Date,
  timestamps: true
}
```

## 🔄 Scalability & Performance

### Caching Strategy

- Redis caching for GET requests
- Automatic cache invalidation
- Configurable expiry times (60-3600s)
- Cache key includes user ID for security

### Database Optimization

- Indexed fields (email, user+createdAt, status+priority)
- Connection pooling
- Efficient Mongoose queries
- Pagination support

### Microservices Ready

- Modular architecture
- Separated concerns
- Easy service extraction
- Docker containerization
- Independent scaling

### Load Balancing

- Stateless design
- Horizontal scaling support
- JWT (no server sessions)
- Can run multiple instances

## 🐳 Docker Deployment

### Development

```powershell
docker-compose up
```

### Production

```powershell
docker-compose -f docker-compose.prod.yml up -d
```

### Services in Docker Compose

- **backend**: Node.js API (Port 5000)
- **mongodb**: Database (Port 27017)
- **redis**: Cache (Port 6379)

## 🌐 Deployment Guide

### Backend Deployment (Render/Railway)

1. **Create account** on Render.com or Railway.app
2. **Connect GitHub repository**
3. **Set environment variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<strong-secret-key>
   JWT_REFRESH_SECRET=<another-strong-secret>
   REDIS_HOST=<redis-cloud-host>
   FRONTEND_URL=<your-frontend-url>
   ```
4. **Deploy** from backend folder

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**: `vercel`
3. **Set environment variable**:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>
   ```

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/backend_api
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE=30d
REDIS_HOST=localhost
REDIS_PORT=6379
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**

```powershell
# Check MongoDB is running
# For local: mongod
# For Atlas: Check connection string
```

**Redis Connection Failed** (Non-critical)

```
# App will continue without caching
# Start Redis: redis-server
```

**Port 5000 in use**

```powershell
# Change PORT in .env
# Or kill process using port 5000
```

### Frontend Issues

**API Connection Failed**

```powershell
# Verify backend is running
# Check NEXT_PUBLIC_API_URL in .env.local
# Check CORS settings in backend
```

**Build Errors**

```powershell
# Clear cache
Remove-Item -Recurse -Force .next
npm run build
```

## 📈 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Task comments and attachments
- [ ] Real-time updates with WebSockets
- [ ] Advanced filtering and search
- [ ] Export tasks to PDF/CSV
- [ ] Task categories and tags
- [ ] User avatars and profiles
- [ ] Team collaboration features
- [ ] Analytics dashboard

## 🧪 Testing

```powershell
# Backend tests (to be implemented)
cd backend
npm test

# Frontend tests (to be implemented)
cd frontend
npm test
```

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

**Backend Developer Intern Assignment**  
Submitted for: Bajarangs / PrimeTrade.ai  
Date: October 29, 2025

---

## 📞 Support

For issues or questions:

1. Check documentation in `/backend/README.md` and `/frontend/README.md`
2. Review API docs at http://localhost:5000/api-docs
3. Check logs in `backend/logs/`

---

## 🎉 Thank You!

This project demonstrates:

- ✅ Clean, production-ready code
- ✅ Scalable architecture
- ✅ Security best practices
- ✅ Comprehensive documentation
- ✅ Modern tech stack
- ✅ All bonus features implemented

**Ready for production deployment! 🚀**
#   A s s i g n T a s k  
 