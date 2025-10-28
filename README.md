# 🚀 Task Management System# 🚀 Full-Stack Task Management System



> Full-Stack Application with Next.js 14, TypeScript, Tailwind CSS, Node.js, Express, and MongoDBA production-ready, scalable full-stack application with **Next.js 14 + TypeScript + Tailwind CSS** frontend and **Node.js + Express + MongoDB** backend, featuring JWT authentication, role-based access control, Redis caching, Docker support, and comprehensive API documentation.



![Task Dashboard](https://raw.githubusercontent.com/RajeshKumarYadav12/AssignTask/main/screenshot.png)## 📋 Assignment Overview



---**Position**: Backend Developer (Intern)  

**Company**: Bajarangs / PrimeTrade.ai  

## 📋 Assignment Details**Submission**: Complete full-stack application with all bonus features implemented



**Position:** Backend Developer (Intern)  ## ✨ Features Implemented

**Company:** Bajarangs / PrimeTrade.ai  

**Submission Date:** October 29, 2025### Core Requirements ✅



---- [x] User Registration & Login with JWT Authentication

- [x] Role-Based Access Control (User & Admin roles)

## ✨ Features Implemented- [x] Complete CRUD API for Tasks (Secondary Entity)

- [x] Input Validation with express-validator

### Core Requirements- [x] Global Error Handling with structured responses

- ✅ User Registration & Login with JWT Authentication- [x] MongoDB Database with Mongoose ODM

- ✅ Role-Based Access Control (User & Admin roles)- [x] API Documentation with Swagger/OpenAPI

- ✅ Complete CRUD API for Tasks- [x] Security (Helmet, CORS, Rate Limiting, Input Sanitization)

- ✅ Input Validation with express-validator

- ✅ Global Error Handling### Bonus Features ✅

- ✅ MongoDB Database with Mongoose ODM

- ✅ API Documentation with Swagger/OpenAPI- [x] **Redis Caching** - High-performance caching for GET requests

- ✅ Security (Helmet, CORS, Rate Limiting)- [x] **Docker & Docker Compose** - Complete containerization

- [x] **Winston Logging** - Professional logging with file rotation

### Bonus Features- [x] **Next.js 14 Frontend** - Modern React framework

- ✅ Redis Caching for high performance- [x] **Tailwind CSS** - Beautiful, responsive UI

- ✅ Docker & Docker Compose support- [x] **TypeScript** - Full type safety

- ✅ Winston Logging with file rotation- [x] **Scalable Architecture** - Microservices-ready structure

- ✅ Next.js 14 Frontend with App Router

- ✅ Tailwind CSS responsive design## 🏗️ Architecture

- ✅ TypeScript for type safety

- ✅ Scalable microservices architecture```

┌─────────────────────────────────────────────────────────────┐

---│                        Frontend (Next.js 14)                 │

│  - React Server Components    - Tailwind CSS                │

## 🛠 Tech Stack│  - TypeScript                 - React Hook Form              │

│  - JWT Auth Context           - Toast Notifications          │

### Backend└────────────────────┬────────────────────────────────────────┘

- Node.js 18+                     │ HTTP/REST API

- Express.js 4.18                     │ (JWT Bearer Tokens)

- MongoDB with Mongoose 8.0┌────────────────────▼────────────────────────────────────────┐

- Redis 4.6 (optional)│                    Backend (Node.js + Express)               │

- JWT Authentication│  - RESTful API               - JWT Authentication            │

- Winston Logger│  - Role-Based Access Control - Input Validation             │

- Swagger UI│  - Global Error Handler      - Security Middleware           │

└─────┬──────────────┬──────────────┬─────────────────────────┘

### Frontend      │              │              │

- Next.js 14 (App Router)      ▼              ▼              ▼

- React 18.2┌──────────┐  ┌──────────┐  ┌──────────┐

- TypeScript 5.3│ MongoDB  │  │  Redis   │  │  Logs    │

- Tailwind CSS 3.4│ Database │  │  Cache   │  │  (Winston)│

- Axios└──────────┘  └──────────┘  └──────────┘

- React Hook Form```



---## 📁 Project Structure



## 📁 Project Structure```

Assignment2/

```├── backend/                  # Backend API

Assignment2/│   ├── src/

││   │   ├── config/          # Configuration files

├── backend/│   │   ├── controllers/     # Request handlers

│   ├── src/│   │   ├── middlewares/     # Custom middleware

│   │   ├── config/          # Database & Redis config│   │   ├── models/          # Database models

│   │   ├── controllers/     # Business logic│   │   ├── routes/          # API routes

│   │   ├── middlewares/     # Auth, error handling│   │   ├── utils/           # Utility functions

│   │   ├── models/          # Mongoose schemas│   │   ├── validators/      # Input validation

│   │   ├── routes/          # API endpoints│   │   └── server.js        # Entry point

│   │   ├── validators/      # Input validation│   ├── logs/                # Application logs

│   │   └── server.js        # Entry point│   ├── Dockerfile           # Backend Docker config

│   ├── .env.example         # Environment template│   ├── docker-compose.yml   # Full stack orchestration

│   ├── Dockerfile│   ├── package.json

│   └── docker-compose.yml│   └── README.md

││

├── frontend/├── frontend/                # Frontend Application

│   ├── src/│   ├── src/

│   │   ├── app/            # Next.js pages│   │   ├── app/            # Next.js app router

│   │   ├── contexts/       # Auth context│   │   ├── contexts/       # React contexts

│   │   ├── lib/            # API client│   │   ├── lib/            # Utilities & API client

│   │   └── types/          # TypeScript types│   │   └── types/          # TypeScript types

│   ├── .env.local.example│   ├── public/             # Static assets

│   └── tailwind.config.js│   ├── tailwind.config.js  # Tailwind configuration

││   ├── package.json

└── README.md│   └── README.md

```│

└── README.md               # This file

---```



## 🚀 Setup & Installation## 🚀 Quick Start Guide



### Prerequisites### Prerequisites

- Node.js v18+

- MongoDB Atlas account (or local MongoDB)- **Node.js** v18 or higher

- Redis (optional)- **MongoDB** (local or Atlas)

- **Redis** (optional, for caching)

### 1️⃣ Backend Setup- **Docker** (optional, for containerization)



```bash### Option 1: Local Development (Recommended for Development)

# Navigate to backend

cd backend#### 1. Backend Setup



# Install dependencies```powershell

npm install# Navigate to backend directory

cd backend

# Create .env file

cp .env.example .env# Install dependencies

npm install

# Update .env with your values:

# MONGODB_URI=your_mongodb_connection_string# Create environment file

# JWT_SECRET=your_secret_keycopy .env.example .env

# JWT_REFRESH_SECRET=your_refresh_secret

# Edit .env with your configuration

# Run backend# Required: MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET

npm run dev

```# Start MongoDB (if local)

# mongod

**Backend runs on:** `http://localhost:5000`  

**API Docs:** `http://localhost:5000/api-docs`# Start Redis (optional)

# redis-server

### 2️⃣ Frontend Setup

# Run backend

```bashnpm run dev

# Navigate to frontend (new terminal)```

cd frontend

Backend will run on: **http://localhost:5000**  

# Install dependenciesAPI Documentation: **http://localhost:5000/api-docs**

npm install

#### 2. Frontend Setup

# Create .env.local

cp .env.local.example .env.local```powershell

# Open new terminal

# Add API URL# Navigate to frontend directory

# NEXT_PUBLIC_API_URL=http://localhost:5000/apicd frontend



# Run frontend# Install dependencies

npm run devnpm install

```

# Create environment file

**Frontend runs on:** `http://localhost:3000`copy .env.local.example .env.local



---# Start frontend

npm run dev

## 🐳 Docker Setup (Alternative)```



```bashFrontend will run on: **http://localhost:3000**

cd backend

docker-compose up -d### Option 2: Docker (Recommended for Production)

```

```powershell

This starts MongoDB, Redis, and Backend API.# Navigate to backend directory

cd backend

Then run frontend separately:

```bash# Start all services (MongoDB, Redis, Backend)

cd frontenddocker-compose up -d

npm run dev

```# View logs

docker-compose logs -f

---

# Stop services

## 📸 Screenshotsdocker-compose down

```

### Dashboard View

![Dashboard](https://raw.githubusercontent.com/RajeshKumarYadav12/AssignTask/main/screenshot.png)Services:



---- **Backend API**: http://localhost:5000

- **MongoDB**: localhost:27017

## 📚 API Documentation- **Redis**: localhost:6379



### Base URLFor frontend with Docker, run it separately:

```

http://localhost:5000/api```powershell

```cd frontend

npm install

### Interactive Documentationnpm run dev

``````

http://localhost:5000/api-docs

```## 🔑 Default Credentials



### Main Endpoints### Admin Account



#### Authentication- **Email**: admin@example.com

| Method | Endpoint | Description |- **Password**: password123

|--------|----------|-------------|- **Access**: Full system access, user management, analytics

| POST | `/api/auth/register` | Register new user |

| POST | `/api/auth/login` | Login user |### Regular User Account

| GET | `/api/auth/me` | Get current user |

| POST | `/api/auth/refresh` | Refresh token |- **Email**: user@example.com

| POST | `/api/auth/logout` | Logout user |- **Password**: password123

- **Access**: Personal tasks, profile management

#### Tasks

| Method | Endpoint | Description |**Note**: Create these accounts by:

|--------|----------|-------------|

| GET | `/api/tasks` | Get all tasks |1. Register via `/register` endpoint or UI

| GET | `/api/tasks/:id` | Get single task |2. Manually update role in MongoDB to 'admin'

| POST | `/api/tasks` | Create task |

| PUT | `/api/tasks/:id` | Update task |## 📚 API Endpoints

| DELETE | `/api/tasks/:id` | Delete task |

| GET | `/api/tasks/stats` | Get statistics |### Authentication



#### Admin (Admin only)```

| Method | Endpoint | Description |POST   /api/auth/register       - Register new user

|--------|----------|-------------|POST   /api/auth/login          - Login user

| GET | `/api/admin/users` | Get all users |GET    /api/auth/me             - Get current user (Protected)

| GET | `/api/admin/users/:id` | Get user by ID |POST   /api/auth/refresh        - Refresh access token

| PUT | `/api/admin/users/:id` | Update user |POST   /api/auth/logout         - Logout user (Protected)

| DELETE | `/api/admin/users/:id` | Delete user |PUT    /api/auth/profile        - Update profile (Protected)

PUT    /api/auth/change-password - Change password (Protected)

---```



## 🔐 Environment Variables### Tasks



### Backend (.env)```

```envGET    /api/tasks               - Get all tasks with filters (Protected)

NODE_ENV=developmentGET    /api/tasks/:id           - Get single task (Protected)

PORT=5000POST   /api/tasks               - Create task (Protected)

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagerPUT    /api/tasks/:id           - Update task (Protected)

JWT_SECRET=your_super_secret_jwt_keyDELETE /api/tasks/:id           - Delete task (Protected)

JWT_REFRESH_SECRET=your_refresh_secret_keyGET    /api/tasks/stats         - Get task statistics (Protected)

JWT_EXPIRE=7d```

JWT_REFRESH_EXPIRE=30d

REDIS_ENABLED=false### Admin (Admin only)

REDIS_HOST=localhost

REDIS_PORT=6379```

CLIENT_URL=http://localhost:3000GET    /api/admin/users         - Get all users

```GET    /api/admin/users/:id     - Get user by ID

PUT    /api/admin/users/:id     - Update user

### Frontend (.env.local)DELETE /api/admin/users/:id     - Delete user

```envGET    /api/admin/stats         - Get system statistics

NEXT_PUBLIC_API_URL=http://localhost:5000/api```

```

## 📖 API Documentation

---

Interactive API documentation available at:

## 🔒 Security Features

- **Swagger UI**: http://localhost:5000/api-docs

- JWT authentication with access & refresh tokens

- Password hashing with bcrypt (10 rounds)Features:

- Rate limiting (100 req/15min general, 5 req/15min auth)

- Input validation and sanitization- Try out endpoints directly

- NoSQL injection prevention- View request/response schemas

- XSS protection with Helmet- Authentication with Bearer token

- CORS configuration- Example requests and responses

- Secure HTTP headers

## 🧪 Testing the API

---

### Using Swagger UI (Recommended)

## 📊 Database Schema

1. Open http://localhost:5000/api-docs

### User Model2. Click "Authorize" button

```javascript3. Enter: `Bearer <your-token>`

{4. Test endpoints interactively

  name: String (required, 2-50 chars),

  email: String (required, unique),### Using cURL

  password: String (required, hashed),

  role: Enum ['user', 'admin'],```powershell

  isActive: Boolean,# Register

  lastLogin: Date,curl -X POST http://localhost:5000/api/auth/register `

  refreshToken: String  -H "Content-Type: application/json" `

}  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

```

# Login

### Task Modelcurl -X POST http://localhost:5000/api/auth/login `

```javascript  -H "Content-Type: application/json" `

{  -d '{"email":"john@example.com","password":"password123"}'

  title: String (required, 3-100 chars),

  description: String (required, max 500 chars),# Create Task (replace <TOKEN>)

  status: Enum ['pending', 'in-progress', 'completed'],curl -X POST http://localhost:5000/api/tasks `

  priority: Enum ['low', 'medium', 'high'],  -H "Authorization: Bearer <TOKEN>" `

  dueDate: Date (optional),  -H "Content-Type: application/json" `

  user: ObjectId (ref: User),  -d '{"title":"New Task","description":"Task description","priority":"high"}'

  isCompleted: Boolean,```

  completedAt: Date

}## 🔒 Security Features

```

1. **JWT Authentication**

---

   - Access token (7 days)

## 🎯 Frontend Features   - Refresh token (30 days)

   - Automatic token refresh

- Responsive design (mobile-first)

- Real-time form validation2. **Password Security**

- Toast notifications

- Loading states   - Bcrypt hashing with salt

- Auto token refresh   - Minimum 6 characters

- Protected routes   - Password change endpoint

- Task filtering by status & priority

- Task statistics dashboard3. **Rate Limiting**



---   - General API: 100 req/15min

   - Auth endpoints: 5 req/15min

## 🧪 Testing the API

4. **Input Sanitization**

### Using Swagger UI

1. Go to `http://localhost:5000/api-docs`   - NoSQL injection prevention

2. Click "Authorize" button   - XSS protection

3. Enter: `Bearer YOUR_TOKEN`   - Input validation

4. Test endpoints interactively

5. **Security Headers**

### Using cURL   - Helmet middleware

```bash   - CORS configuration

# Register   - Content Security Policy

curl -X POST http://localhost:5000/api/auth/register \

  -H "Content-Type: application/json" \## 🎯 Frontend Features

  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

### Pages

# Login

curl -X POST http://localhost:5000/api/auth/login \- **Landing Page** (`/`) - Hero section with features

  -H "Content-Type: application/json" \- **Login** (`/login`) - User authentication

  -d '{"email":"john@example.com","password":"password123"}'- **Register** (`/register`) - New user registration

- **Dashboard** (`/dashboard`) - Protected task management

# Create Task (replace TOKEN)

curl -X POST http://localhost:5000/api/tasks \### Key Features

  -H "Authorization: Bearer TOKEN" \

  -H "Content-Type: application/json" \- **Responsive Design** - Mobile-first approach

  -d '{"title":"New Task","description":"Description","priority":"high"}'- **Form Validation** - Real-time validation

```- **Toast Notifications** - Success/error messages

- **Loading States** - Smooth user experience

---- **Auto Token Refresh** - Seamless authentication

- **Protected Routes** - Auth guards

## 🐛 Troubleshooting

## 📊 Database Schema

### Backend Issues

### User Model

**MongoDB Connection Error**

- Check your `MONGODB_URI` in `.env````javascript

- Ensure IP is whitelisted in MongoDB Atlas{

- Verify username and password  name: String (required, 2-50 chars),

  email: String (required, unique, validated),

**Port 5000 in use**  password: String (required, hashed, min 6 chars),

- Change `PORT` in `.env`  role: Enum ['user', 'admin'] (default: 'user'),

- Or kill the process: `netstat -ano | findstr :5000`  isActive: Boolean (default: true),

  lastLogin: Date,

**Redis Connection Error** (Non-critical)  refreshToken: String,

- Set `REDIS_ENABLED=false` in `.env`  timestamps: true

- App continues without caching}

```

### Frontend Issues

### Task Model

**API Connection Failed**

- Verify backend is running on port 5000```javascript

- Check `NEXT_PUBLIC_API_URL` in `.env.local`{

- Check browser console for errors  title: String (required, 3-100 chars),

  description: String (required, max 500 chars),

**Module Not Found**  status: Enum ['pending', 'in-progress', 'completed'],

```bash  priority: Enum ['low', 'medium', 'high'],

rm -rf node_modules package-lock.json  dueDate: Date (optional, future date),

npm install  user: ObjectId (ref: 'User', required),

```  isCompleted: Boolean,

  completedAt: Date,

---  timestamps: true

}

## 📦 Deployment```



### Backend (Render/Railway)## 🔄 Scalability & Performance

1. Create account on Render or Railway

2. Connect GitHub repository### Caching Strategy

3. Set environment variables

4. Deploy from `backend` folder- Redis caching for GET requests

- Automatic cache invalidation

### Frontend (Vercel)- Configurable expiry times (60-3600s)

1. Install Vercel CLI: `npm i -g vercel`- Cache key includes user ID for security

2. Run: `vercel`

3. Set `NEXT_PUBLIC_API_URL` environment variable### Database Optimization



---- Indexed fields (email, user+createdAt, status+priority)

- Connection pooling

## 📝 Available Scripts- Efficient Mongoose queries

- Pagination support

### Backend

```bash### Microservices Ready

npm run dev      # Development with nodemon

npm start        # Production mode- Modular architecture

```- Separated concerns

- Easy service extraction

### Frontend- Docker containerization

```bash- Independent scaling

npm run dev      # Development mode

npm run build    # Build for production### Load Balancing

npm start        # Production server

npm run lint     # ESLint- Stateless design

```- Horizontal scaling support

- JWT (no server sessions)

---- Can run multiple instances



## ✅ Repository Checklist## 🐳 Docker Deployment



- ✅ `/backend` and `/frontend` folders### Development

- ✅ `README.md` with complete setup instructions

- ✅ All features implemented and documented```powershell

- ✅ Tech stack clearly mentioneddocker-compose up

- ✅ Screenshots included```

- ✅ API documentation (Swagger)

- ✅ `.env.example` files (not actual `.env`)### Production

- ✅ Clean code structure

- ✅ Security best practices```powershell

- ✅ Error handlingdocker-compose -f docker-compose.prod.yml up -d

```

---

### Services in Docker Compose

## 👨‍💻 Author

- **backend**: Node.js API (Port 5000)

**Backend Developer Intern Assignment**  - **mongodb**: Database (Port 27017)

Submitted for: **Bajarangs / PrimeTrade.ai**- **redis**: Cache (Port 6379)



---## 🌐 Deployment Guide



## 📄 License### Backend Deployment (Render/Railway)



MIT License - Free for learning and development1. **Create account** on Render.com or Railway.app

2. **Connect GitHub repository**

---3. **Set environment variables**:

   ```

## 🎉 Thank You!   NODE_ENV=production

   MONGODB_URI=<your-mongodb-atlas-uri>

This project demonstrates:   JWT_SECRET=<strong-secret-key>

- ✅ Production-ready code   JWT_REFRESH_SECRET=<another-strong-secret>

- ✅ Scalable architecture   REDIS_HOST=<redis-cloud-host>

- ✅ Security best practices   FRONTEND_URL=<your-frontend-url>

- ✅ Modern tech stack   ```

- ✅ Complete documentation4. **Deploy** from backend folder



**Ready for deployment! 🚀**### Frontend Deployment (Vercel)


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
#   A s s i g n T a s k 
 
 