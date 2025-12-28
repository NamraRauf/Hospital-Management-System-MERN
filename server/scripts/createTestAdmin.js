const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const mongoURI = "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";

const createTestAdmin = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'superadmin@hospital.com' });
    
    if (existingAdmin) {
      console.log("ℹ️  Admin already exists: superadmin@hospital.com");
      console.log("   Updating password...");
      
      // Update password
      const hashedPassword = await bcrypt.hash('admin123', 10);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      
      console.log("✅ Password updated successfully!");
      console.log("");
      console.log("📋 Login Credentials:");
      console.log("   Email: superadmin@hospital.com");
      console.log("   Password: admin123");
      console.log("   UserType: Admin");
      console.log("");
      console.log("🚀 Ab login kar sakte hain!");
      
      process.exit(0);
      return;
    }

    // Create test admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new Admin({
      name: 'Super Admin',
      email: 'superadmin@hospital.com',
      password: hashedPassword,
      role: 'superadmin',
      permissions: {
        managePatients: true,
        manageDoctors: true,
        manageAppointments: true,
        viewReports: true,
        systemSettings: true
      }
    });

    await admin.save();
    console.log("✅ Test Admin Created Successfully!");
    console.log("");
    console.log("📋 Login Credentials:");
    console.log("   Email: superadmin@hospital.com");
    console.log("   Password: admin123");
    console.log("   UserType: Admin");
    console.log("");
    console.log("🚀 Ab login kar sakte hain!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createTestAdmin();

