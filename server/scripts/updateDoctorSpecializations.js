const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

const mongoURI = "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";

const updateSpecializations = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Update doctor specializations
    const updates = [
      { email: 'sarah.johnson@hospital.com', specialization: 'Cardiology' },
      { email: 'michael.brown@hospital.com', specialization: 'Pediatrics' },
      { email: 'emily.davis@hospital.com', specialization: 'Dermatology' },
      { email: 'james.wilson@hospital.com', specialization: 'Orthopedics' },
      { email: 'lisa.anderson@hospital.com', specialization: 'Neurology' },
      { email: 'robert.taylor@hospital.com', specialization: 'Oncology' },
      { email: 'maria.garcia@hospital.com', specialization: 'Gynecology' },
      { email: 'david.lee@hospital.com', specialization: 'Psychiatry' }
    ];

    for (const update of updates) {
      const doctor = await Doctor.findOneAndUpdate(
        { email: update.email },
        { specialization: update.specialization },
        { new: true }
      );
      if (doctor) {
        console.log(`✅ Updated ${doctor.name} - ${update.specialization}`);
      } else {
        console.log(`⚠️  Doctor not found: ${update.email}`);
      }
    }

    // Add more doctors with different specializations
    const newDoctors = [
      { name: 'Dr. Ahmed Khan', email: 'ahmed.khan@hospital.com', specialization: 'General Surgery', password: '$2b$10$dummy' },
      { name: 'Dr. Priya Sharma', email: 'priya.sharma@hospital.com', specialization: 'ENT (Ear, Nose, Throat)', password: '$2b$10$dummy' },
      { name: 'Dr. John Smith', email: 'john.smith@hospital.com', specialization: 'Urology', password: '$2b$10$dummy' },
      { name: 'Dr. Fatima Ali', email: 'fatima.ali@hospital.com', specialization: 'Ophthalmology', password: '$2b$10$dummy' },
      { name: 'Dr. Carlos Rodriguez', email: 'carlos.rodriguez@hospital.com', specialization: 'Emergency Medicine', password: '$2b$10$dummy' }
    ];

    const bcrypt = require('bcryptjs');
    for (const doc of newDoctors) {
      const existing = await Doctor.findOne({ email: doc.email });
      if (!existing) {
        const hashedPassword = await bcrypt.hash('doctor123', 10);
        const doctor = new Doctor({
          name: doc.name,
          email: doc.email,
          specialization: doc.specialization,
          password: hashedPassword
        });
        await doctor.save();
        console.log(`✅ Created ${doc.name} - ${doc.specialization}`);
      } else {
        console.log(`ℹ️  Doctor already exists: ${doc.name}`);
      }
    }

    console.log("\n✅ All specializations updated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

updateSpecializations();

