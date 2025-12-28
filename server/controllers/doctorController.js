const Doctor = require("../models/Doctor");

// Register a new doctor
exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, phone } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Build doctor object
    const doctorData = { name, email, password };
    if (specialization) doctorData.specialization = specialization;
    if (phone) doctorData.phone = phone;

    const doctor = new Doctor(doctorData);
    await doctor.save();
    
    // Return doctor without password
    const doctorResponse = doctor.toObject();
    delete doctorResponse.password;
    
    res.status(201).json({ 
      message: "Doctor registered successfully", 
      doctor: doctorResponse 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Error registering doctor:", error);
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

// ✅ Doctor Profile dikhana (kept for backward compatibility)
exports.getDoctorProfile = exports.getDoctorById;

// ✅ Doctor Profile update karna (kept for backward compatibility)
exports.updateDoctorProfile = exports.updateDoctor;
