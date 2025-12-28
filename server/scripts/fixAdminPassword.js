const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const mongoURI = "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";

const fixAdminPassword = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Find admin
    const admin = await Admin.findOne({ email: 'superadmin@hospital.com' });
    
    if (!admin) {
      console.log("❌ Admin not found!");
      process.exit(1);
      return;
    }

    console.log("✅ Found admin:", admin.name);
    console.log("   Email:", admin.email);

    // Delete old admin to avoid double-hashing issue
    await Admin.deleteOne({ _id: admin._id });
    console.log("🗑️  Deleted old admin (to fix password hashing)");

    // Create new admin with plain password (model will hash it)
    const newAdmin = new Admin({
      name: 'Super Admin',
      email: 'superadmin@hospital.com',
      password: 'admin123', // Plain password - model will hash it
      role: 'superadmin',
      permissions: {
        managePatients: true,
        manageDoctors: true,
        manageAppointments: true,
        viewReports: true,
        systemSettings: true
      }
    });

    await newAdmin.save();
    console.log("✅ Admin recreated with correct password!");

    // Verify password
    const testPassword = await bcrypt.compare('admin123', newAdmin.password);
    console.log("🔍 Password verification test:", testPassword ? "✅ Match" : "❌ No Match");

    console.log("");
    console.log("📋 Login Credentials:");
    console.log("   Email: superadmin@hospital.com");
    console.log("   Password: admin123");
    console.log("   UserType: Admin");
    console.log("");
    console.log("🚀 Ab login karein - ab kaam karega!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

fixAdminPassword();

