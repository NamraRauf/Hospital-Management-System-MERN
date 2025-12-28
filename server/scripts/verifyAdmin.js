const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const mongoURI = "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";

const verifyAdmin = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Find all admins
    const admins = await Admin.find().select("-password");
    
    console.log(`\n📊 Total Admins in Database: ${admins.length}\n`);
    
    if (admins.length === 0) {
      console.log("❌ No admins found in database!");
      console.log("💡 Creating admin account...");
      
      const bcrypt = require('bcryptjs');
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
      console.log("✅ Admin created!");
    } else {
      console.log("✅ Admins found:");
      admins.forEach((admin, index) => {
        console.log(`\n${index + 1}. ${admin.name}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Created: ${admin.createdAt}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

verifyAdmin();

