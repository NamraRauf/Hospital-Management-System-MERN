const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const patientId = req.user.userId;

    // Validation
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "Doctor, date, and time are required" });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Create appointment
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      doctorName: doctor.name,
      date: new Date(date),
      time: time,
      reason: reason || '',
      status: 'pending'
    });

    await appointment.save();

    // Populate appointment with doctor and patient details
    await appointment.populate('doctor', 'name email');
    await appointment.populate('patient', 'name email');

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      message: "Error booking appointment",
      error: error.message
    });
  }
};

// Get all appointments for current patient
exports.getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user.userId;
    const appointments = await Appointment.find({ patient: patientId })
      .populate('doctor', 'name email')
      .sort({ date: -1, time: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message
    });
  }
};

// Get all appointments (for admin/doctor)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email')
      .sort({ date: -1, time: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message
    });
  }
};

// Get appointments for a specific doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.userId;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name email phone')
      .sort({ date: -1, time: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message
    });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate('patient', 'name email').populate('doctor', 'name email');

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment status updated",
      appointment
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({
      message: "Error updating appointment",
      error: error.message
    });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({
      message: "Error deleting appointment",
      error: error.message
    });
  }
};

