console.log("✅ Starting server.js...");
console.log("📦 MongoDB: Hard-coded connection string");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// CORS configuration - allow requests from frontend
// In production, allow specific origins; in development, allow all
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      process.env.FRONTEND_URL,
      /\.vercel\.app$/,  // Allow all Vercel deployments
      /\.netlify\.app$/, // Allow all Netlify deployments
    ].filter(Boolean);
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Check if origin matches allowed patterns
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
      callback(null, true); // Allow for now, can restrict later
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("🏥 Hospital Management System API is Running");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err.message);
});

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    // Use environment variable if available (for production), otherwise use hard-coded (for local dev)
    const mongoURI = process.env.MONGO_URI || "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";
    
    // Connection options
    const options = {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
      socketTimeoutMS: 45000
    };
    
    await mongoose.connect(mongoURI, options);
    console.log("✅ MongoDB Connected Successfully");
    console.log("📦 Database: hospital");
    if (process.env.MONGO_URI) {
      console.log("🔧 Using environment variable for MongoDB connection");
    } else {
      console.log("🔧 Using hard-coded MongoDB connection (local dev)");
    }
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("⚠️  Server will continue running, but database operations may fail");
    console.log("💡 To fix: Check MongoDB Atlas connection string or MONGO_URI environment variable");
  }
};

connectDB();

// Vercel serverless function export
module.exports = app;

// For local development, start server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
