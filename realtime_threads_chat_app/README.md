# Realtime Threads & Chat Application

A full-stack realtime web application with threaded discussions and direct messaging capabilities. Built with Next.js, Express, TypeScript, and Socket.IO.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## ✨ Features

- 🔐 **Custom JWT Authentication** - Secure user authentication without third-party dependencies
- 💬 **Real-time Chat** - Instant messaging with Socket.IO
- 📝 **Threaded Discussions** - Create and participate in discussion threads
- 🔔 **Live Notifications** - Real-time updates for likes, replies, and mentions
- 👤 **User Profiles** - Customizable user profiles with avatars
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Clean interface with shadcn/ui components
- ⚡ **Type-Safe** - Full TypeScript coverage across frontend and backend

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 16.0.5 (React 19.2.0)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4.1
- **UI Components:** shadcn/ui (Radix UI)
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Real-time:** Socket.IO Client

### Backend
- **Runtime:** Node.js with Express 4.21.2
- **Language:** TypeScript 5
- **Database:** SQLite (better-sqlite3)
- **Authentication:** JWT + bcrypt
- **File Upload:** Multer
- **Real-time:** Socket.IO

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd realtime_threads_chat_app_sourcecode
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file and update the JWT_SECRET
# nano .env  (or use your preferred editor)

# Run database migrations (creates tables)
npm run migrate

# Start development server
npm run dev
```

The backend server will start on http://localhost:5000

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend application will start on http://localhost:4000

### 4. Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:4000
- **Backend API:** http://localhost:5000

## 📁 Project Structure

```
realtime_threads_chat_app_sourcecode/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── db/               # Database connection
│   │   ├── middleware/       # Express middleware
│   │   ├── migrations/       # SQL migration files
│   │   ├── modules/          # Feature modules
│   │   ├── routes/           # API routes
│   │   ├── realtime/         # Socket.IO setup
│   │   ├── app.ts            # Express app
│   │   └── server.ts         # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js pages
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utility functions
│   │   └── types/            # TypeScript types
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
DATABASE_PATH=./database.sqlite
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
UPLOAD_DIR=./uploads
FRONTEND_URL=http://localhost:4000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NODE_ENV=development
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Thread Endpoints

- `GET /api/threads` - List all threads
- `POST /api/threads` - Create a new thread (protected)
- `GET /api/threads/:id` - Get thread details
- `POST /api/threads/:id/like` - Toggle like on thread (protected)
- `POST /api/threads/:id/replies` - Add reply to thread (protected)

### User Endpoints

- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/:id` - Update user profile (protected)

### Chat Endpoints

- `GET /api/chat/users` - Get list of users for chat
- `GET /api/chat/:userId` - Get conversation with user
- `POST /api/chat/:userId` - Send message to user (protected)

### Notification Endpoints

- `GET /api/notifications` - Get user notifications (protected)
- `POST /api/notifications/:id/read` - Mark notification as read
- `GET /api/notifications/unread-count` - Get unread count

## 🚢 Deployment

### Deploy to Vercel (Frontend)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure the project:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL
5. Deploy!

### Deploy Backend (Railway/Render/Heroku)

#### Option 1: Railway

1. Install Railway CLI or use the web interface
2. Create a new project
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Add environment variables from `.env.example`
5. Deploy!

#### Option 2: Render

1. Create a new Web Service on [Render](https://render.com)
2. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
3. Add environment variables
4. Deploy!

### Database Considerations

For production, consider upgrading from SQLite to:
- PostgreSQL (recommended for production)
- MySQL
- Other relational databases

## 🔧 Build Commands

### Backend

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Run migrations
npm run migrate
```

### Frontend

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

## 🧪 Testing

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.



## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Socket.IO for real-time functionality
- All open-source contributors


⭐ Star this repository if you find it helpful!
