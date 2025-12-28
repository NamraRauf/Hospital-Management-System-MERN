const Admin = require("../models/Admin");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");

// Register a new admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    const admin = new Admin({
      name,
      email,
      password,
      role: role || 'admin'
    });

    await admin.save();

    // Return admin without password
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(201).json({
      message: "Admin registered successfully",
      admin: adminResponse
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ message: "Error registering admin", error: error.message });
  }
};

// Get admin profile
exports.getMyProfile = async (req, res) => {
  try {
    // Use userId from JWT token (set in auth middleware)
    const adminId = req.user.userId || req.user.id;
    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error in getMyProfile:", error);
    res.status(500).json({ message: "Error fetching admin profile", error: error.message });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAdmins = await Admin.countDocuments();
    
    // Recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentPatients = await Patient.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });
    
    const recentDoctors = await Doctor.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get recent patients
    const latestPatients = await Patient.find()
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent doctors
    const latestDoctors = await Doctor.find()
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: {
        totalPatients,
        totalDoctors,
        totalAdmins,
        recentPatients,
        recentDoctors
      },
      recent: {
        patients: latestPatients,
        doctors: latestDoctors
      }
    });
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
};

// Get all patients (for admin)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error in getAllPatients:", error);
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

// Get all doctors (for admin)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error in getAllDoctors:", error);
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};

// Delete patient (admin only)
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error in deletePatient:", error);
    res.status(500).json({ message: "Error deleting patient", error: error.message });
  }
};

// Delete doctor (admin only)
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error in deleteDoctor:", error);
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};

// Get all admins (for admin)
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error in getAllAdmins:", error);
    res.status(500).json({ message: "Error fetching admins", error: error.message });
  }
};

