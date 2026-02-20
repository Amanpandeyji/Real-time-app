# GitHub & Vercel Deployment - Quick Reference

## 🎯 Quick Deploy Commands

### Initialize Git (if not already done)
```bash
cd realtime_threads_chat_app_sourcecode
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Create repository (public or private)
3. Don't initialize with README (we already have one)

### Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 🚀 Vercel Deployment (Frontend)

### Option 1: Deploy via Web Interface
1. Visit https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Root Directory:** `frontend`
   - **Framework:** Next.js (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>
   ```
7. Click "Deploy"

### Option 2: Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing? No
# - Project name? (accept default)
# - Directory? ./ (current)
# - Override settings? No

# Add production environment variable
vercel env add NEXT_PUBLIC_API_URL production
# Enter your backend URL

# Redeploy
vercel --prod
```

## 🚂 Railway Deployment (Backend)

### Option 1: Deploy via Web Interface
1. Visit https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add service configuration:
   - **Root Directory:** `backend`
6. Add environment variables:
   ```
   PORT=5000
   JWT_SECRET=<generate-strong-secret>
   DATABASE_PATH=/app/data/database.sqlite
   UPLOAD_DIR=/app/uploads
   FRONTEND_URL=<your-vercel-url>
   ```
7. Add volume for database:
   - Settings → Volumes → New Volume
   - Mount path: `/app/data`
8. Deploy!

### Option 2: Deploy via CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Add environment variables
railway variables set PORT=5000
railway variables set JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('base64'))")
railway variables set DATABASE_PATH=/app/data/database.sqlite
railway variables set UPLOAD_DIR=/app/uploads
railway variables set FRONTEND_URL=https://your-frontend.vercel.app

# Deploy
railway up
```

## 🔗 Connect Frontend to Backend

After both are deployed:

1. **Get Backend URL** from Railway dashboard
2. **Update Frontend Environment Variable** on Vercel:
   - Go to Vercel project → Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` to your Railway backend URL
   - Redeploy frontend

3. **Update Backend CORS** on Railway:
   - Update `FRONTEND_URL` to your Vercel frontend URL

## ✅ Verification Steps

### 1. Check Backend Health
```bash
curl https://your-backend.railway.app/health
```

### 2. Test Frontend
- Open https://your-frontend.vercel.app
- Try to sign up
- Create a thread
- Send a chat message

### 3. Monitor Logs
**Vercel:**
```bash
vercel logs <deployment-url>
```

**Railway:**
```bash
railway logs
```

## 🔄 Update Deployments

### Auto-Deploy (Recommended)
Both platforms auto-deploy on git push to main:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Manual Deploy
**Vercel:**
```bash
cd frontend
vercel --prod
```

**Railway:**
```bash
cd backend
railway up
```

## 🎉 You're Done!

Your application is now live:
- Frontend: https://your-app.vercel.app
- Backend: https://your-app.railway.app

Share your app with the world! 🌍
