const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');

const mongoURI = "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";

const createSampleData = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Create sample doctors if they don't exist
    const doctors = [
      { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com', specialization: 'Cardiology' },
      { name: 'Dr. Michael Brown', email: 'michael.brown@hospital.com', specialization: 'Pediatrics' },
      { name: 'Dr. Emily Davis', email: 'emily.davis@hospital.com', specialization: 'General Medicine' },
      { name: 'Dr. James Wilson', email: 'james.wilson@hospital.com', specialization: 'Orthopedics' },
      { name: 'Dr. Lisa Anderson', email: 'lisa.anderson@hospital.com', specialization: 'Dermatology' },
      { name: 'Dr. Robert Taylor', email: 'robert.taylor@hospital.com', specialization: 'Neurology' },
      { name: 'Dr. Maria Garcia', email: 'maria.garcia@hospital.com', specialization: 'Gynecology' },
      { name: 'Dr. David Lee', email: 'david.lee@hospital.com', specialization: 'Psychiatry' }
    ];

    const createdDoctors = [];
    for (const doc of doctors) {
      const existing = await Doctor.findOne({ email: doc.email });
      if (!existing) {
        const hashedPassword = await bcrypt.hash('doctor123', 10);
        const doctor = new Doctor({
          ...doc,
          password: hashedPassword
        });
        await doctor.save();
        createdDoctors.push(doctor);
        console.log(`✅ Created doctor: ${doc.name}`);
      } else {
        createdDoctors.push(existing);
        console.log(`ℹ️  Doctor already exists: ${doc.name}`);
      }
    }

    // Get a patient (or create one)
    let patient = await Patient.findOne({ email: 'testpatient123@gmail.com' });
    if (!patient) {
      patient = await Patient.findOne();
    }

    if (patient && createdDoctors.length > 0) {
      // Create sample appointments
      const today = new Date();
      const appointments = [
        {
          patient: patient._id,
          doctor: createdDoctors[0]._id,
          doctorName: createdDoctors[0].name,
          date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
          time: '10:00',
          reason: 'Regular checkup',
          status: 'confirmed'
        },
        {
          patient: patient._id,
          doctor: createdDoctors[1]._id,
          doctorName: createdDoctors[1].name,
          date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
          time: '14:30',
          reason: 'Follow-up consultation',
          status: 'pending'
        },
        {
          patient: patient._id,
          doctor: createdDoctors[2]._id,
          doctorName: createdDoctors[2].name,
          date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days later
          time: '09:00',
          reason: 'General health check',
          status: 'pending'
        },
        {
          patient: patient._id,
          doctor: createdDoctors[0]._id,
          doctorName: createdDoctors[0].name,
          date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          time: '11:00',
          reason: 'Cardiac consultation',
          status: 'completed'
        },
        {
          patient: patient._id,
          doctor: createdDoctors[3]._id,
          doctorName: createdDoctors[3].name,
          date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days later
          time: '15:00',
          reason: 'Bone health check',
          status: 'pending'
        }
      ];

      // Delete existing appointments for this patient
      await Appointment.deleteMany({ patient: patient._id });
      console.log("🗑️  Cleared existing appointments");

      // Create new appointments
      for (const apt of appointments) {
        const appointment = new Appointment(apt);
        await appointment.save();
        console.log(`✅ Created appointment: ${apt.doctorName} on ${apt.date.toDateString()}`);
      }

      console.log(`\n✅ Created ${appointments.length} sample appointments for patient: ${patient.name}`);
    }

    console.log("\n✅ Sample data creation complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createSampleData();

