# Deployment Guide

Complete guide for deploying the Realtime Threads & Chat Application to production.

## 📋 Table of Contents

1. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
2. [Backend Deployment (Railway)](#backend-deployment-railway)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Steps](#post-deployment-steps)

## 🎨 Frontend Deployment (Vercel)

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)

### Step-by-Step Guide

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Project**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend is now live!

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. Wait for SSL certificate provisioning

## 🚂 Backend Deployment (Railway)

### Prerequisites
- Railway account (free tier available)
- GitHub account

### Step-by-Step Guide

1. **Sign up at Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Select `backend` as root directory
   - Railway will auto-detect Node.js

4. **Add Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=<generate-strong-secret>
   DATABASE_PATH=/app/data/database.sqlite
   UPLOAD_DIR=/app/uploads
   FRONTEND_URL=<your-vercel-frontend-url>
   ```

5. **Add Start Command**
   - Go to Settings → Deploy
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

6. **Add Volume for Database** (Important!)
   - Go to Settings → Volumes
   - Add new volume: `/app/data`
   - This ensures database persists across deployments

7. **Deploy**
   - Click "Deploy"
   - Note the generated URL (e.g., `https://your-app.railway.app`)

### Alternative: Render Deployment

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect your GitHub repository

2. **Configure**
   - **Name:** Your app name
   - **Environment:** Node
   - **Region:** Choose closest to users
   - **Branch:** main
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

3. **Add Environment Variables**
   (Same as Railway configuration)

4. **Add Disk for Persistence**
   - Add a persistent disk at `/app/data`

5. **Deploy**

## 🗄️ Database Setup

### For Production (Recommended: PostgreSQL)

If you want to upgrade from SQLite to PostgreSQL:

1. **Add PostgreSQL Database**
   - Railway: Add PostgreSQL plugin
   - Render: Create PostgreSQL database
   - Get connection URL

2. **Update Code**
   ```bash
   # Install PostgreSQL driver
   cd backend
   npm install pg
   ```

3. **Modify db/db.ts** to use PostgreSQL instead of SQLite

4. **Update Environment Variables**
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

### Keeping SQLite (For Small Projects)

1. **Ensure Volume/Disk is Mounted**
   - Railway: Mount volume at `/app/data`
   - Render: Add disk at `/app/data`

2. **Update DATABASE_PATH**
   ```
   DATABASE_PATH=/app/data/database.sqlite
   ```

3. **Run Migrations**
   - Add migration script to package.json:
   ```json
   "scripts": {
     "migrate": "ts-node src/db/migrate.ts",
     "postinstall": "npm run migrate"
   }
   ```

## 🔐 Environment Variables

### Frontend (.env.production)

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NODE_ENV=production
```

### Backend (.env.production)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
DATABASE_PATH=/app/data/database.sqlite
# OR for PostgreSQL:
# DATABASE_URL=postgresql://user:password@host:port/database

# JWT (GENERATE A STRONG SECRET!)
JWT_SECRET=your-super-long-random-secret-change-this-immediately

# Storage
UPLOAD_DIR=/app/uploads

# CORS
FRONTEND_URL=https://your-app.vercel.app
```

### Generate Strong JWT Secret

```bash
# On Linux/Mac
openssl rand -base64 64

# On Windows PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

## ✅ Post-Deployment Steps

### 1. Update Frontend API URL

Update the frontend environment variable to point to your deployed backend:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

Redeploy frontend on Vercel (automatic if connected to Git).

### 2. Configure CORS

Ensure backend allows requests from your frontend domain:

```typescript
// backend/src/app.ts
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4000',
  credentials: true
}));
```

### 3. Test the Application

- ✅ User registration works
- ✅ User login works
- ✅ Creating threads works
- ✅ Real-time chat works
- ✅ Notifications work
- ✅ File uploads work

### 4. Set Up Monitoring

**Railway/Render:**
- Enable application logs
- Set up health checks
- Configure alerts

**Vercel:**
- Monitor build logs
- Set up error tracking (optional: Sentry)

### 5. Configure Custom Domains (Optional)

**Frontend (Vercel):**
1. Settings → Domains
2. Add custom domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

**Backend (Railway):**
1. Settings → Networking
2. Add custom domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: api
   Value: your-app.railway.app
   ```

## 🔍 Troubleshooting

### Frontend Build Fails

```bash
# Check build logs on Vercel
# Common issues:
- Missing environment variables
- TypeScript errors
- Dependency conflicts

# Solution:
- Review error logs
- Ensure all env vars are set
- Run `npm run build` locally first
```

### Backend Crashes

```bash
# Check application logs
# Common issues:
- Missing environment variables
- Database connection errors
- Port already in use

# Solution:
- Verify all env vars
- Check database configuration
- Ensure volumes/disks are mounted
```

### Real-time Features Not Working

```bash
# WebSocket connection issues
# Common causes:
- CORS misconfiguration
- Firewall blocking WebSockets
- Wrong backend URL

# Solution:
- Check CORS settings
- Ensure backend allows WebSocket connections
- Verify NEXT_PUBLIC_API_URL is correct
```

### Database Issues

```bash
# SQLite: "unable to open database file"
# Solution: Ensure volume/disk is mounted correctly

# PostgreSQL: "connection refused"
# Solution: Check DATABASE_URL is correct
```

## 🎯 Production Checklist

- [ ] Strong JWT_SECRET generated
- [ ] Environment variables configured
- [ ] Database persistence enabled (volume/disk)
- [ ] CORS properly configured
- [ ] Frontend points to production backend
- [ ] All features tested
- [ ] Error logging enabled
- [ ] Health checks configured
- [ ] Custom domains configured (optional)
- [ ] SSL certificates active
- [ ] Backups configured (for database)

## 📊 Monitoring & Maintenance

### Logs

**Railway:**
```bash
# View logs in Railway dashboard
# Or use CLI:
railway logs
```

**Vercel:**
```bash
# View logs in Vercel dashboard
# Or use CLI:
vercel logs <deployment-url>
```

### Health Checks

Add a health endpoint to backend:

```typescript
// backend/src/routes/index.ts
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});
```

### Database Backups

**SQLite:**
- Set up automated backups of `/app/data/database.sqlite`
- Download periodically via Railway/Render CLI

**PostgreSQL:**
- Most platforms automatically backup
- Configure backup schedule in platform settings

## 🚀 Continuous Deployment

Both Vercel and Railway support automatic deployments:

1. **Connect to Git Repository**
2. **Enable Auto-Deploy**
3. **Push to Main Branch**
4. **Automatic Build & Deploy**

```bash
git add .
git commit -m "Update feature"
git push origin main
# Automatic deployment triggered!
```

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs

Happy Deploying! 🎉
