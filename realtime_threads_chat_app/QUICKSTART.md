# Quick Start Guide

Get the Realtime Threads & Chat Application running in 5 minutes!

## ⚡ Quick Setup

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd realtime_threads_chat_app_sourcecode

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and change JWT_SECRET to a random string

# Frontend
cd ../frontend
cp .env.example .env.local
# Default values should work for local development
```

### 3. Run Database Migrations

```bash
cd backend
npm run migrate
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Application

- Frontend: http://localhost:4000
- Backend API: http://localhost:5000

## 🎯 First Steps

1. **Sign Up** - Create a new account
2. **Create a Thread** - Click "New Thread" button
3. **Add a Reply** - Comment on a thread
4. **Start a Chat** - Go to Chat page and message someone
5. **Check Notifications** - View your notification bell

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill processes on ports 4000 or 5000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process -Force
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**Database errors?**
```bash
# Delete and recreate database
cd backend
rm database.sqlite
npm run migrate
```

**Module not found errors?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed information
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Review [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

Happy coding! 🚀
