# 🚀 Localhost Setup Guide

## Quick Start - Run on Localhost

### Step 1: Install Dependencies

```bash
# Install all dependencies (both server and client)
npm install
```

### Step 2: Set Up Environment Variables

#### Backend (Server)
Create a `.env` file in the `server/` directory:

```env
PORT=6000
MONGO_URI=mongodb://localhost:27017/hospital-management
# OR use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

#### Frontend (Client)
Create a `.env` file in the `client/` directory (optional):

```env
REACT_APP_API_URL=http://localhost:6000/api
```

### Step 3: Start MongoDB (if using local MongoDB)

```bash
# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# On Windows:
# Start MongoDB service from Services
```

### Step 4: Run the Application

#### Option A: Run Both Server and Client (Recommended)

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
# Server will run on http://localhost:6000
```

**Terminal 2 - Start Frontend Client:**
```bash
cd client
npm start
# Frontend will run on http://localhost:3000
```

#### Option B: Use Root Scripts

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

### Step 5: Access the Application

1. Open your browser and go to: `http://localhost:3000`
2. You should see the Login page
3. Register a new patient or doctor account
4. Login with your credentials

## 🔑 Testing the Login System

### Register a Patient:
1. Click "Register here" on the login page
2. Select "Patient" as user type
3. Fill in: Name, Email, Password
4. Click "Register"
5. You'll be redirected to login page

### Register a Doctor:
1. Click "Register here" on the login page
2. Select "Doctor" as user type
3. Fill in: Name, Email, Password
4. Click "Register"
5. You'll be redirected to login page

### Login:
1. Enter your email and password
2. Select user type (Patient or Doctor)
3. Click "Login"
4. You'll be redirected to your dashboard:
   - Patients → `/patient-dashboard`
   - Doctors → `/doctor-dashboard`

## ✅ Features Now Working

- ✅ Patient Registration
- ✅ Doctor Registration  
- ✅ Patient Login with JWT Token
- ✅ Doctor Login with JWT Token
- ✅ Protected Routes (requires login)
- ✅ Role-based Dashboard Access
- ✅ Secure Password Hashing (bcrypt)
- ✅ Session Management (localStorage)

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Make sure MongoDB is running locally, OR
- Update `MONGO_URI` in `server/.env` to use MongoDB Atlas

### Issue: "CORS Error"
**Solution:**
- Make sure backend server is running on port 6000
- Check that `FRONTEND_URL` in server `.env` includes `http://localhost:3000`

### Issue: "Login Failed"
**Solution:**
- Make sure you've registered an account first
- Check that email and password are correct
- Verify backend server is running and connected to database

### Issue: "Module not found"
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
cd server && rm -rf node_modules package-lock.json
cd ../client && rm -rf node_modules package-lock.json
cd ..
npm install
```

## 📝 Notes

- The login system now uses JWT tokens for authentication
- Passwords are securely hashed using bcrypt
- User sessions are stored in localStorage
- Protected routes automatically redirect to login if not authenticated
- Each user type (Patient/Doctor) has their own dashboard

