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
    const { email, password } = req.body;

    try {
        let user = await Admin.findOne({ email });
        let userType = 'Admin';
        let userId = null;
        let userName = null;

        if (!user) {
            user = await Doctor.findOne({ email });
            userType = 'Doctor';
            if (!user) {
                user = await Patient.findOne({ email });
                userType = 'Patient';
                if (!user) {
                    return res.status(404).json({ message: 'User Not Found' });
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
