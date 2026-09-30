# 🚀 Project Live Deployment Guide

Complete guide to deploy your Hospital Management System online.

## 📋 Deployment Overview

Your MERN stack application needs **3 parts** deployed:

1. **Frontend (React)** → Netlify / Vercel
2. **Backend (Express/Node.js)** → Railway / Render
3. **Database (MongoDB)** → MongoDB Atlas (Already configured ✅)

---

## 🌐 Option 1: Netlify (Frontend) + Railway (Backend) - RECOMMENDED

### Step 1: Deploy Backend on Railway

#### 1.1 Create Railway Account
1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository: `Hospital-Management-System-MERN`

#### 1.2 Configure Backend
1. Railway will auto-detect Node.js
2. **Set Root Directory:** `server`
3. **Set Start Command:** `npm start`
4. **Add Environment Variables:**
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Any random string (e.g., `your-secret-key-123`)
   - `PORT` = `5000` (Railway will auto-assign, but keep this)
   - `NODE_ENV` = `production`

#### 1.3 Get Backend URL
- Railway will give you a URL like: `https://your-app.railway.app`
- **Copy this URL** - you'll need it for frontend

---

### Step 2: Deploy Frontend on Netlify

#### 2.1 Create Netlify Account
1. Go to [https://netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your repository: `Hospital-Management-System-MERN`

#### 2.2 Configure Frontend
1. **Base directory:** `client`
2. **Build command:** `npm install && npm run build`
3. **Publish directory:** `client/build`
4. **Add Environment Variable:**
   - `REACT_APP_API_URL` = `https://your-app.railway.app/api`
   - (Replace with your Railway backend URL)

#### 2.3 Deploy
- Click "Deploy site"
- Wait for build to complete
- You'll get a URL like: `https://your-app.netlify.app`

---

## 🌐 Option 2: Vercel (Frontend) + Render (Backend)

### Step 1: Deploy Backend on Render

#### 1.1 Create Render Account
1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository

#### 1.2 Configure Backend
1. **Name:** `hospital-management-backend`
2. **Root Directory:** `server`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Environment Variables:**
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Any random string
   - `PORT` = `10000` (Render default)
   - `NODE_ENV` = `production`

#### 1.3 Get Backend URL
- Render will give you: `https://your-app.onrender.com`
- **Copy this URL**

---

### Step 2: Deploy Frontend on Vercel

#### 2.1 Create Vercel Account
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository

#### 2.2 Configure Frontend
1. **Root Directory:** `client`
2. **Framework Preset:** React
3. **Build Command:** `npm run build`
4. **Output Directory:** `build`
5. **Environment Variable:**
   - `REACT_APP_API_URL` = `https://your-app.onrender.com/api`

#### 2.3 Deploy
- Click "Deploy"
- You'll get: `https://your-app.vercel.app`

---

## 🔧 Important Configuration

### Backend Environment Variables (Railway/Render)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-12345
PORT=5000
NODE_ENV=production
```

### Frontend Environment Variables (Netlify/Vercel)

```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

**Note:** Replace `your-backend-url.railway.app` with your actual backend URL.

---

## ✅ Post-Deployment Checklist

1. ✅ Backend is running and accessible
2. ✅ Frontend can connect to backend
3. ✅ MongoDB Atlas connection is working
4. ✅ Test login with test accounts
5. ✅ All routes are working
6. ✅ CORS is configured correctly

---

## 🐛 Troubleshooting

### Backend not connecting?

- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for all IPs)
- Verify `MONGO_URI` is correct
- Check Railway/Render logs

### Frontend can't reach backend?

- Verify `REACT_APP_API_URL` is correct
- Check CORS settings in backend
- Ensure backend URL includes `/api` at the end

### Build fails?

- Check Node.js version (should be 14+)
- Verify all dependencies are in `package.json`
- Check build logs for errors

---

## 📱 Quick Deploy Commands

### For Railway (Backend)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

### For Netlify (Frontend)
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
cd client
npm run build
netlify deploy --prod
```

---

## 🎯 Recommended Setup

**Best for Free Tier:**
- **Frontend:** Netlify (Free, fast, easy)
- **Backend:** Railway (Free tier available, auto-deploy)
- **Database:** MongoDB Atlas (Free tier)

**Alternative:**
- **Frontend:** Vercel (Free, excellent for React)
- **Backend:** Render (Free tier, slower cold starts)
- **Database:** MongoDB Atlas (Free tier)

---

## 📞 Need Help?

1. Check deployment logs
2. Verify environment variables
3. Test backend API directly
4. Check browser console for errors

---

**🎉 Once deployed, share your live URLs with your teacher!**

