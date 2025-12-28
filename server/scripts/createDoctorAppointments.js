const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

const mongoURI = "mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority";

const createDoctorAppointments = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Find test doctor
    const doctor = await Doctor.findOne({ email: 'doctor@test.com' });
    if (!doctor) {
      console.log("❌ Doctor not found. Please create doctor account first.");
      process.exit(1);
      return;
    }

    console.log("✅ Found doctor:", doctor.name);

    // Find or create a test patient
    let patient = await Patient.findOne({ email: 'patient@test.com' });
    if (!patient) {
      // Create test patient
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('patient123', 10);
      patient = new Patient({
        name: 'Test Patient',
        email: 'patient@test.com',
        password: hashedPassword,
        phone: '1234567890'
      });
      await patient.save();
      console.log("✅ Created test patient: patient@test.com");
    } else {
      console.log("✅ Found patient:", patient.name);
    }

    // Delete existing appointments for this doctor
    await Appointment.deleteMany({ doctor: doctor._id });
    console.log("🗑️  Cleared existing appointments");

    // Create sample appointments
    const today = new Date();
    const appointments = [
      {
        patient: patient._id,
        doctor: doctor._id,
        doctorName: doctor.name,
        date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        time: '10:00 AM',
        reason: 'Regular checkup',
        status: 'pending'
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        doctorName: doctor.name,
        date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        time: '02:30 PM',
        reason: 'Follow-up consultation',
        status: 'confirmed'
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        doctorName: doctor.name,
        date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
        time: '09:00 AM',
        reason: 'General health check',
        status: 'pending'
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        doctorName: doctor.name,
        date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), // Yesterday
        time: '11:00 AM',
        reason: 'Previous consultation',
        status: 'completed'
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        doctorName: doctor.name,
        date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days later
        time: '03:00 PM',
        reason: 'Routine examination',
        status: 'confirmed'
      }
    ];

    // Create appointments
    for (const apt of appointments) {
      const appointment = new Appointment(apt);
      await appointment.save();
      console.log(`✅ Created appointment: ${apt.date.toDateString()} at ${apt.time} - ${apt.status}`);
    }

    console.log(`\n✅ Created ${appointments.length} appointments for doctor: ${doctor.name}`);
    console.log("\n📋 Appointment Summary:");
    console.log(`   - Pending: ${appointments.filter(a => a.status === 'pending').length}`);
    console.log(`   - Confirmed: ${appointments.filter(a => a.status === 'confirmed').length}`);
    console.log(`   - Completed: ${appointments.filter(a => a.status === 'completed').length}`);
    console.log("\n🚀 Ab doctor appointments page par appointments dikhenge!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createDoctorAppointments();

