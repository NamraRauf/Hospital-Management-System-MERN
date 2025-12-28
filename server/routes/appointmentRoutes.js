const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const { auth, isPatient, isDoctor, isAdmin } = require("../middleware/auth");

// Patient routes - get my appointments (must come before /:id routes)
router.get("/my-appointments", auth, isPatient, appointmentController.getMyAppointments);

// Doctor routes - get my appointments (must come before /:id routes)
router.get("/doctor", auth, isDoctor, appointmentController.getDoctorAppointments);

// Patient routes - create appointment
router.post("/", auth, isPatient, appointmentController.createAppointment);

// Admin/Doctor routes - get all appointments (must come after specific routes)
router.get("/", auth, appointmentController.getAllAppointments);

// Update appointment status
router.put("/:appointmentId/status", auth, appointmentController.updateAppointmentStatus);

// Delete appointment
router.delete("/:appointmentId", auth, appointmentController.deleteAppointment);

module.exports = router;

