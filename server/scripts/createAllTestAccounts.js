const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const mongoURI = "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";

const createAllTestAccounts = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB\n");

    // ============================================
    // CREATE TEST PATIENT
    // ============================================
    console.log("👤 Creating Test Patient...");
    let patient = await Patient.findOne({ email: 'patient@test.com' });
    if (patient) {
      await Patient.deleteOne({ _id: patient._id });
      console.log("   🗑️  Deleted old patient account");
    }
    
    patient = new Patient({
      name: 'Test Patient',
      email: 'patient@test.com',
      password: 'patient123', // Plain password - model will hash it
      phone: '1234567890',
      age: 25,
      gender: 'Male',
      bloodGroup: 'O+',
      address: '123 Test Street, Test City'
    });
    await patient.save();
    console.log("   ✅ Patient created: patient@test.com / patient123\n");

    // ============================================
    // CREATE TEST DOCTOR
    // ============================================
    console.log("👨‍⚕️ Creating Test Doctor...");
    let doctor = await Doctor.findOne({ email: 'doctor@test.com' });
    if (doctor) {
      await Doctor.deleteOne({ _id: doctor._id });
      console.log("   🗑️  Deleted old doctor account");
    }
    
    doctor = new Doctor({
      name: 'Dr. Test Doctor',
      email: 'doctor@test.com',
      password: 'doctor123', // Plain password - model will hash it
      specialization: 'General Medicine',
      phone: '9876543210'
    });
    await doctor.save();
    console.log("   ✅ Doctor created: doctor@test.com / doctor123\n");

    // ============================================
    // CREATE TEST ADMIN
    // ============================================
    console.log("👑 Creating Test Admin...");
    let admin = await Admin.findOne({ email: 'admin@test.com' });
    if (admin) {
      await Admin.deleteOne({ _id: admin._id });
      console.log("   🗑️  Deleted old admin account");
    }
    
    admin = new Admin({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123', // Plain password - model will hash it
      role: 'admin',
      permissions: {
        managePatients: true,
        manageDoctors: true,
        manageAppointments: true,
        viewReports: true,
        systemSettings: true
      }
    });
    await admin.save();
    console.log("   ✅ Admin created: admin@test.com / admin123\n");

    // ============================================
    // VERIFY PASSWORDS
    // ============================================
    console.log("🔍 Verifying Passwords...");
    
    // Verify Patient Password
    const patientCheck = await Patient.findOne({ email: 'patient@test.com' });
    const patientPasswordMatch = await bcrypt.compare('patient123', patientCheck.password);
    console.log(`   ${patientPasswordMatch ? '✅' : '❌'} Patient password: ${patientPasswordMatch ? 'MATCH' : 'NO MATCH'}`);
    
    // Verify Doctor Password
    const doctorCheck = await Doctor.findOne({ email: 'doctor@test.com' });
    const doctorPasswordMatch = await bcrypt.compare('doctor123', doctorCheck.password);
    console.log(`   ${doctorPasswordMatch ? '✅' : '❌'} Doctor password: ${doctorPasswordMatch ? 'MATCH' : 'NO MATCH'}`);
    
    // Verify Admin Password
    const adminCheck = await Admin.findOne({ email: 'admin@test.com' });
    const adminPasswordMatch = await bcrypt.compare('admin123', adminCheck.password);
    console.log(`   ${adminPasswordMatch ? '✅' : '❌'} Admin password: ${adminPasswordMatch ? 'MATCH' : 'NO MATCH'}`);

    // ============================================
    // SUMMARY
    // ============================================
    console.log("\n" + "=".repeat(60));
    console.log("✅ ALL TEST ACCOUNTS CREATED SUCCESSFULLY!");
    console.log("=".repeat(60) + "\n");
    
    console.log("📋 LOGIN CREDENTIALS FOR TEACHER DEMO:\n");
    
    console.log("👤 PATIENT:");
    console.log("   Email: patient@test.com");
    console.log("   Password: patient123");
    console.log("   UserType: Patient\n");
    
    console.log("👨‍⚕️ DOCTOR:");
    console.log("   Email: doctor@test.com");
    console.log("   Password: doctor123");
    console.log("   UserType: Doctor\n");
    
    console.log("👑 ADMIN:");
    console.log("   Email: admin@test.com");
    console.log("   Password: admin123");
    console.log("   UserType: Admin\n");
    
    console.log("=".repeat(60));
    console.log("🚀 Ab sab accounts ready hain - teacher ko demo de sakte hain!");
    console.log("=".repeat(60) + "\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createAllTestAccounts();

