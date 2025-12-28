import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredUserType }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && userType.toLowerCase() !== requiredUserType.toLowerCase()) {
    // Redirect to appropriate dashboard based on user type
    if (userType === 'admin' || userType === 'Admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (userType === 'doctor' || userType === 'Doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    } else {
      return <Navigate to="/patient-dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

