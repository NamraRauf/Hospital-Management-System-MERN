const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin'
    },
    permissions: {
        managePatients: { type: Boolean, default: true },
        manageDoctors: { type: Boolean, default: true },
        manageAppointments: { type: Boolean, default: true },
        viewReports: { type: Boolean, default: true },
        systemSettings: { type: Boolean, default: false }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Update timestamp on save
adminSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

