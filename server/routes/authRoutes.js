const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');
const router = express.Router();

// Note: Doctor registration is handled by /api/doctors/register route
// Patient registration is handled by /api/patients/register route

// ✅ Login Route with JWT Token
router.post('/login', async (req, res) => {
    const { email, password, userType: requestedUserType } = req.body;

    try {
        // Validate email format
        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        let user = null;
        let userType = null;
        let userId = null;
        let userName = null;

        // If userType is specified, check that specific collection first
        if (requestedUserType) {
            const normalizedType = requestedUserType.toLowerCase();
            if (normalizedType === 'admin') {
                user = await Admin.findOne({ email: email.toLowerCase().trim() });
                userType = 'Admin';
            } else if (normalizedType === 'doctor') {
                user = await Doctor.findOne({ email: email.toLowerCase().trim() });
                userType = 'Doctor';
            } else if (normalizedType === 'patient') {
                user = await Patient.findOne({ email: email.toLowerCase().trim() });
                userType = 'Patient';
            }
        }

        // If not found with specified type, or no type specified, check all collections
        if (!user) {
            user = await Admin.findOne({ email: email.toLowerCase().trim() });
            userType = 'Admin';
            
            if (!user) {
                user = await Doctor.findOne({ email: email.toLowerCase().trim() });
                userType = 'Doctor';
                
                if (!user) {
                    user = await Patient.findOne({ email: email.toLowerCase().trim() });
                    userType = 'Patient';
                    
                    if (!user) {
                        return res.status(404).json({ 
                            message: 'User not found. Please check your email or register first.',
                            hint: 'Make sure you have registered with this email address.'
                        });
                    }
                }
            }
        }

        userId = user._id;
        userName = user.name;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { 
                userId: userId.toString(), 
                userType: userType,
                email: email 
            },
            process.env.JWT_SECRET || 'your-secret-key-change-in-production',
            { expiresIn: '7d' }
        );

        // Get user details without password
        const userResponse = {
            id: userId,
            name: userName,
            email: email,
            userType: userType
        };

        res.status(200).json({ 
            message: 'Login Successful', 
            userType,
            token,
            user: userResponse
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
