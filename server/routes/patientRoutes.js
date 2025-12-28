const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const { auth, isPatient } = require("../middleware/auth");

// Public routes
// Register a new patient
router.post("/register", patientController.registerPatient);

// Protected routes - require authentication
// Get current patient's own profile
router.get("/profile", auth, isPatient, patientController.getMyProfile);

// Update current patient's own profile
router.put("/profile", auth, isPatient, patientController.updateMyProfile);

// Admin/Doctor routes - get all patients
router.get("/", auth, patientController.getPatients);

// Admin/Doctor routes - get single patient by ID
router.get("/:id", auth, patientController.getPatientById);

// Admin/Doctor routes - update patient info
router.put("/:id", auth, patientController.updatePatient);

// Admin/Doctor routes - delete patient
router.delete("/:id", auth, patientController.deletePatient);

module.exports = router;
