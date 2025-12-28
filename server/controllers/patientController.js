const Patient = require("../models/Patient");
const mongoose = require("mongoose");

// Register a new patient
exports.registerPatient = async (req, res) => {
  try {
    // Check MongoDB connection - but allow if connecting
    const dbState = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (dbState === 0) {
      // Try to connect if disconnected
      try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/hospital-management", {
          serverSelectionTimeoutMS: 3000
        });
      } catch (connectErr) {
        // If still can't connect, return helpful error
        return res.status(503).json({ 
          message: "Database connection required. Please setup MongoDB Atlas (free) or install local MongoDB.",
          error: "MongoDB not connected",
          setupGuide: "See MONGODB_FIX.md for setup instructions"
        });
      }
    }

    const { name, email, password, phone, age, gender, address, medicalHistory, bloodGroup, emergencyContact } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email }).maxTimeMS(5000);
    if (existingPatient) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Build patient object - only include fields that have values
    const patientData = { 
      name, 
      email, 
      password
    };
    
    // Add optional fields only if they have values
    if (phone) patientData.phone = phone;
    if (age) patientData.age = age;
    if (gender) patientData.gender = gender;
    if (address) patientData.address = address;
    if (medicalHistory) patientData.medicalHistory = medicalHistory;
    if (bloodGroup && bloodGroup.trim() !== '') patientData.bloodGroup = bloodGroup; // Only add if not empty
    if (emergencyContact) patientData.emergencyContact = emergencyContact;

    const patient = new Patient(patientData);
    
    await patient.save();
    
    // Return patient without password
    const patientResponse = patient.toObject();
    delete patientResponse.password;
    
    res.status(201).json({ 
      message: "Patient registered successfully", 
      patient: patientResponse 
    });
  } catch (error) {
    console.error("Registration Error:", error);
    console.error("Error Details:", JSON.stringify(error, null, 2));
    
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors || {}).map(err => err.message).join(', ');
      console.error("Validation Errors:", validationErrors);
      return res.status(400).json({ 
        message: `Validation failed: ${validationErrors}`,
        error: validationErrors
      });
    }
    
    if (error.name === 'MongoServerError' || error.name === 'MongoTimeoutError') {
      return res.status(503).json({ 
        message: "Database connection error. Please check MongoDB.",
        error: "MongoDB connection timeout"
      });
    }
    
    res.status(500).json({ 
      message: "Error registering patient", 
      error: error.message,
      details: error.name
    });
  }
};

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

// Get single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error: error.message });
  }
};

// Update patient info
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error: error.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error: error.message });
  }
};

// Get current patient's profile (from token)
exports.getMyProfile = async (req, res) => {
  try {
    const patientId = req.user.userId;
    const patient = await Patient.findById(patientId).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

// Update current patient's profile (from token)
exports.updateMyProfile = async (req, res) => {
  try {
    const patientId = req.user.userId || req.user.id; // From auth middleware
    const updateData = { ...req.body };
    
    // Don't allow password update through this route
    delete updateData.password;
    
    // If email is being updated, check if it's already taken by another user
    if (updateData.email) {
      const existingPatient = await Patient.findOne({ 
        email: updateData.email, 
        _id: { $ne: patientId } // Exclude current patient
      });
      if (existingPatient) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    
    // Update patient - allow email updates
    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");
    
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    res.status(200).json({ 
      message: "Profile updated successfully",
      patient 
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ 
      message: "Error updating profile", 
      error: error.message 
    });
  }
};

// ✅ Patient Profile dikhana (kept for backward compatibility)
exports.getPatientProfile = exports.getPatientById;

// ✅ Patient Profile update karna (kept for backward compatibility)
exports.updatePatientProfile = exports.updatePatient;
