const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is patient
const isPatient = (req, res, next) => {
  if (req.user && (req.user.userType === 'Patient' || req.user.userType === 'patient')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Patient only.' });
  }
};

// Middleware to check if user is doctor
const isDoctor = (req, res, next) => {
  if (req.user && (req.user.userType === 'Doctor' || req.user.userType === 'doctor')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Doctor only.' });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && (req.user.userType === 'Admin' || req.user.userType === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

module.exports = { auth, isPatient, isDoctor, isAdmin };

