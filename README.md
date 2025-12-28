# 🏥 Hospital Management System - MERN Stack

Complete MERN Stack Hospital Management System with Patient, Doctor, and Admin dashboards.

## 🚀 Quick Start (Dusre Laptop Par Setup)

### Step 1: Clone Repository
```bash
git clone https://github.com/NamraRauf/Hospital-Management-System-MERN.git
cd Hospital-Management-System-MERN
```

### Step 2: Backend Setup
```bash
cd server
npm install
```

### Step 3: Frontend Setup
```bash
cd ../client
npm install
```

### Step 4: Start Backend Server
```bash
cd ../server
npm start
```
Backend will run on `http://localhost:5000`

### Step 5: Start Frontend (New Terminal)
```bash
cd client
npm start
```
Frontend will run on `http://localhost:3001`

### Step 6: Create Test Accounts
```bash
cd server
node scripts/createAllTestAccounts.js
```

## 📋 Login Credentials (Teacher Demo)

### 👤 Patient
- Email: `patient@test.com`
- Password: `patient123`
- UserType: **Patient**

### 👨‍⚕️ Doctor
- Email: `doctor@test.com`
- Password: `doctor123`
- UserType: **Doctor**

### 👑 Admin
- Email: `admin@test.com`
- Password: `admin123`
- UserType: **Admin**

## 🛠️ Technology Stack

- **MongoDB** - Database (MongoDB Atlas)
- **Express.js** - Backend Framework
- **React.js** - Frontend Framework
- **Node.js** - Runtime Environment

## 📁 Project Structure

```
Hospital-Management-System-MERN/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/         # All pages
│   │   ├── components/    # Reusable components
│   │   └── services/       # API calls
├── server/                 # Express Backend
│   ├── models/            # MongoDB Models
│   ├── routes/             # API Routes
│   ├── controllers/        # Business Logic
│   └── scripts/            # Utility Scripts
└── README.md
```

## 🔧 Requirements

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

## 📝 Features

- ✅ Patient Registration & Login
- ✅ Doctor Registration & Login
- ✅ Admin Login
- ✅ Patient Dashboard
- ✅ Doctor Dashboard (Appointments, Medical Records, Analytics)
- ✅ Admin Dashboard (User Management)
- ✅ Appointment System
- ✅ Medical Records Management
- ✅ Analytics & Reports

## 🌐 Access URLs

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:5000
- **Home Page:** http://localhost:3001/

## 📚 Documentation

- `TEACHER_DEMO_CREDENTIALS.md` - Login credentials for demo
- `COMPLETE_PROJECT_EXPLANATION.md` - Complete project explanation
- `LOGIN_FIX_GUIDE.md` - Login troubleshooting guide

## ⚠️ Important Notes

1. **Backend server must run first** (port 5000)
2. **MongoDB connection** is already configured (MongoDB Atlas)
3. **Create test accounts** before demo using the script
4. **UserType selection** is required during login

## 🐛 Troubleshooting

### Backend not starting?
- Check if port 5000 is available
- Verify MongoDB connection string

### Frontend not starting?
- Check if port 3001 is available
- Verify all dependencies are installed

### Login issues?
- Run `node server/scripts/createAllTestAccounts.js`
- Check browser console for errors
- Verify UserType is selected correctly

## 📞 Support

For issues or questions, check the documentation files in the repository.

---

**Made with ❤️ using MERN Stack**

