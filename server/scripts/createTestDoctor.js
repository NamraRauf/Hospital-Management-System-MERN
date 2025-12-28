const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');

const mongoURI = "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";

const createTestDoctor = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email: 'doctor@test.com' });
    
    if (existingDoctor) {
      console.log("ℹ️  Doctor already exists: doctor@test.com");
      console.log("   Password: doctor123");
      process.exit(0);
      return;
    }

    // Create test doctor
    const hashedPassword = await bcrypt.hash('doctor123', 10);
    const doctor = new Doctor({
      name: 'Dr. Test Doctor',
      email: 'doctor@test.com',
      password: hashedPassword,
      specialization: 'General Medicine',
      phone: '1234567890'
    });

    await doctor.save();
    console.log("✅ Test Doctor Created Successfully!");
    console.log("");
    console.log("📋 Login Credentials:");
    console.log("   Email: doctor@test.com");
    console.log("   Password: doctor123");
    console.log("   UserType: Doctor");
    console.log("");
    console.log("🚀 Ab login kar sakte hain!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createTestDoctor();

