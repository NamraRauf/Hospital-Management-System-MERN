const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { auth, isAdmin } = require("../middleware/auth");

// Public route - Register admin (can be restricted later)
router.post("/register", adminController.registerAdmin);

// Protected routes - require authentication and admin role
router.get("/profile", auth, isAdmin, adminController.getMyProfile);
router.get("/dashboard/stats", auth, isAdmin, adminController.getDashboardStats);
router.get("/patients", auth, isAdmin, adminController.getAllPatients);
router.get("/doctors", auth, isAdmin, adminController.getAllDoctors);
router.get("/admins", auth, isAdmin, adminController.getAllAdmins);
router.delete("/patients/:id", auth, isAdmin, adminController.deletePatient);
router.delete("/doctors/:id", auth, isAdmin, adminController.deleteDoctor);

module.exports = router;

