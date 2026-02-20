# Pre-Deployment Checklist

Use this checklist before deploying to production.

## 🔒 Security

- [ ] Generate a strong JWT_SECRET (minimum 32 characters)
- [ ] All environment variables are set correctly
- [ ] No sensitive data in Git repository
- [ ] `.env` files are in `.gitignore`
- [ ] CORS is configured for production domain
- [ ] SQL injection prevention verified (parameterized queries)
- [ ] Input validation implemented
- [ ] File upload restrictions in place

## 🗄️ Database

- [ ] Database persistence configured (volumes/disks)
- [ ] Migration scripts run successfully
- [ ] Backup strategy in place
- [ ] Database connection string secured

## 🚀 Backend

- [ ] Build command works (`npm run build`)
- [ ] Start command works (`npm start`)
- [ ] All environment variables configured
- [ ] Health check endpoint available
- [ ] Error logging configured
- [ ] File upload directory configured
- [ ] PORT variable set correctly

## 🎨 Frontend

- [ ] Build command works (`npm run build`)
- [ ] Production build tested locally
- [ ] API URL points to production backend
- [ ] All environment variables configured
- [ ] Error boundaries implemented
- [ ] Loading states for async operations

## 🌐 Networking

- [ ] CORS configured for production URLs
- [ ] WebSocket connections allowed
- [ ] SSL certificates active
- [ ] Custom domains configured (if applicable)
- [ ] DNS records configured correctly

## 📝 Configuration Files

- [ ] `.gitignore` updated
- [ ] `README.md` complete
- [ ] `package.json` has build scripts
- [ ] Environment variable examples provided
- [ ] Deployment documentation written

## ✅ Testing

- [ ] User registration works
- [ ] User login works
- [ ] Thread creation works
- [ ] Replies work
- [ ] Likes work
- [ ] Real-time chat functional
- [ ] Notifications working
- [ ] File uploads working
- [ ] Profile updates work
- [ ] Logout clears session

## 📊 Monitoring

- [ ] Application logs accessible
- [ ] Error tracking configured (optional)
- [ ] Performance monitoring set up (optional)
- [ ] Health checks configured
- [ ] Alerts configured for downtime

## 📦 Version Control

- [ ] All changes committed
- [ ] Meaningful commit messages
- [ ] Repository pushed to GitHub
- [ ] Sensitive files not committed
- [ ] `.gitignore` properly configured

## 🔄 Continuous Deployment

- [ ] Auto-deploy configured (if desired)
- [ ] Build succeeds on deployment platform
- [ ] Environment variables set on platform
- [ ] Deployment triggers on push to main

## 📱 Post-Deployment

- [ ] Production URL accessible
- [ ] All features tested in production
- [ ] SSL certificate valid
- [ ] Mobile responsiveness verified
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Analytics configured (optional)

## 🎯 Final Checks

- [ ] README updated with production URLs
- [ ] Documentation reflects current state
- [ ] Team notified of deployment
- [ ] Rollback plan in place
- [ ] Support channels ready

---

## Quick Commands for Verification

### Test Backend Build
```bash
cd backend
npm run build
node dist/server.js
```

### Test Frontend Build
```bash
cd frontend
npm run build
npm start
```

### Check Environment Variables
```bash
# Backend
cat backend/.env.example

# Frontend
cat frontend/.env.example
```

### Generate Strong JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

---

## Emergency Contacts

- **Developer:** [Your Name/Email]
- **Hosting Support:** [Platform support link]
- **Issue Tracker:** [GitHub Issues URL]

---

✅ Once all items are checked, you're ready to deploy!
