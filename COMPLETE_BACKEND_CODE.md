# 📦 Complete Backend Code - Hospital Management System

## 🏗️ Backend Structure (MERN Stack - Express.js + Node.js)

```
server/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── .env                   # Environment variables
├── models/                # MongoDB Schemas (Mongoose)
│   ├── Patient.js
│   ├── Doctor.js
│   └── Admin.js
├── routes/                # API Routes
│   ├── authRoutes.js
│   ├── patientRoutes.js
│   ├── doctorRoutes.js
│   └── adminRoutes.js
├── controllers/           # Business Logic
│   ├── patientController.js
│   ├── doctorController.js
│   └── adminController.js
└── middleware/            # Express Middleware
    └── auth.js            # JWT Authentication
```

---

## 📄 1. server.js (Main Server File)

```javascript
console.log("✅ Starting server.js...");
console.log("📂 ENV MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// CORS configuration - allow requests from frontend
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      process.env.FRONTEND_URL,
      /\.vercel\.app$/,
      /\.netlify\.app$/,
    ].filter(Boolean);
    
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      }
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/admin", adminRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🏥 Hospital Management System API is Running");
});

// MongoDB connection error handler
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err.message);
});

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/hospital-management";
    
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    };
    
    await mongoose.connect(mongoURI, options);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("⚠️  Server will continue running, but database operations may fail");
    console.log("💡 To fix: Install MongoDB locally or use MongoDB Atlas");
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## 📄 2. Models (MongoDB Schemas)

### Patient.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 0,
        max: 150
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    address: {
        type: String,
        trim: true
    },
    medicalHistory: {
        type: String,
        default: ''
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    emergencyContact: {
        name: String,
        phone: String,
        relation: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Update timestamp on save
patientSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
```

### Doctor.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
```

### Admin.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin'
    },
    permissions: {
        managePatients: { type: Boolean, default: true },
        manageDoctors: { type: Boolean, default: true },
        manageAppointments: { type: Boolean, default: true },
        viewReports: { type: Boolean, default: true },
        systemSettings: { type: Boolean, default: false }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Update timestamp on save
adminSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
```

---

## 📄 3. Middleware (auth.js)

```javascript
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is patient
const isPatient = (req, res, next) => {
  if (req.user && (req.user.userType === 'Patient' || req.user.userType === 'patient')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Patient only.' });
  }
};

// Middleware to check if user is doctor
const isDoctor = (req, res, next) => {
  if (req.user && (req.user.userType === 'Doctor' || req.user.userType === 'doctor')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Doctor only.' });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && (req.user.userType === 'Admin' || req.user.userType === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

module.exports = { auth, isPatient, isDoctor, isAdmin };
```

---

## 📄 4. Routes

### authRoutes.js
- `POST /api/auth/login` - Login (Patient/Doctor/Admin)
- `POST /api/auth/register/doctor` - Register Doctor

### patientRoutes.js
- `POST /api/patients/register` - Register Patient
- `GET /api/patients/profile` - Get My Profile (Protected)
- `PUT /api/patients/profile` - Update My Profile (Protected)
- `GET /api/patients` - Get All Patients (Protected)
- `GET /api/patients/:id` - Get Patient by ID (Protected)
- `PUT /api/patients/:id` - Update Patient (Protected)
- `DELETE /api/patients/:id` - Delete Patient (Protected)

### adminRoutes.js
- `POST /api/admin/register` - Register Admin
- `GET /api/admin/profile` - Get Admin Profile (Protected)
- `GET /api/admin/dashboard/stats` - Get Dashboard Stats (Protected)
- `GET /api/admin/patients` - Get All Patients (Protected)
- `GET /api/admin/doctors` - Get All Doctors (Protected)
- `DELETE /api/admin/patients/:id` - Delete Patient (Protected)
- `DELETE /api/admin/doctors/:id` - Delete Doctor (Protected)

---

## 📄 5. Controllers

### patientController.js
- `registerPatient` - Register new patient (with MongoDB connection check)
- `getMyProfile` - Get current patient's profile (from JWT token)
- `updateMyProfile` - Update current patient's profile (from JWT token)
- `getPatients` - Get all patients
- `getPatientById` - Get patient by ID
- `updatePatient` - Update patient
- `deletePatient` - Delete patient

### adminController.js
- `registerAdmin` - Register new admin
- `getMyProfile` - Get admin profile
- `getDashboardStats` - Get dashboard statistics
- `getAllPatients` - Get all patients
- `getAllDoctors` - Get all doctors
- `deletePatient` - Delete patient
- `deleteDoctor` - Delete doctor

### doctorController.js
```javascript
const Doctor = require("../models/Doctor");

// Register a new doctor
exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const doctor = new Doctor({ name, email, password });
    await doctor.save();
    res.status(201).json({ message: "Doctor registered successfully", doctor });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error registering doctor", error: error.message });
  }
};

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};

// Get single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error: error.message });
  }
};

// Update doctor info
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error: error.message });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};
```

---

## 📦 Dependencies (package.json)

```json
{
  "dependencies": {
    "bcryptjs": "^3.0.2",      // Password hashing
    "cors": "^2.8.5",          // Cross-Origin Resource Sharing
    "dotenv": "^17.2.0",       // Environment variables
    "express": "^5.1.0",      // Web framework
    "jsonwebtoken": "^9.0.2",  // JWT authentication
    "mongoose": "^8.16.5"     // MongoDB ODM
  }
}
```

---

## 🔐 Environment Variables (.env)

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-management?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-change-in-production
```

---

## 🚀 API Endpoints Summary

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register/doctor` - Register Doctor

### Patients
- `POST /api/patients/register` - Register Patient
- `GET /api/patients/profile` - Get My Profile (Auth Required)
- `PUT /api/patients/profile` - Update My Profile (Auth Required)
- `GET /api/patients` - Get All Patients (Auth Required)
- `GET /api/patients/:id` - Get Patient by ID (Auth Required)
- `PUT /api/patients/:id` - Update Patient (Auth Required)
- `DELETE /api/patients/:id` - Delete Patient (Auth Required)

### Admin
- `POST /api/admin/register` - Register Admin
- `GET /api/admin/profile` - Get Admin Profile (Auth Required)
- `GET /api/admin/dashboard/stats` - Get Dashboard Stats (Auth Required)
- `GET /api/admin/patients` - Get All Patients (Auth Required)
- `GET /api/admin/doctors` - Get All Doctors (Auth Required)
- `DELETE /api/admin/patients/:id` - Delete Patient (Auth Required)
- `DELETE /api/admin/doctors/:id` - Delete Doctor (Auth Required)

---

## ✅ Features Implemented

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Role-Based Access Control (Patient/Doctor/Admin)
- ✅ CORS Configuration
- ✅ MongoDB Connection (Atlas)
- ✅ Error Handling
- ✅ Protected Routes
- ✅ CRUD Operations

---

## 🎯 MERN Stack - Backend (Express.js + Node.js)

- **M**ongoDB → Models (Mongoose Schemas)
- **E**xpress.js → Routes, Controllers, Middleware
- **R**eact.js → Frontend (separate)
- **N**ode.js → Server Runtime

**Complete Backend Code Ready!** ✅

