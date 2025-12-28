import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import PatientProfile from './pages/PatientProfile';
import Appointments from './pages/Appointments';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorAppointments from './pages/DoctorAppointments';
import AdminDashboard from './pages/AdminDashboard';
import Reports from './pages/Reports';
import Dashboard from './pages/Dashboard';
import MERNStackDetails from './pages/MERNStackDetails';
import ProtectedRoute from './components/ProtectedRoute';

const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (token && userType) {
      // User is logged in, redirect to appropriate dashboard if on public routes
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        if (userType === 'admin' || userType === 'Admin') {
          navigate('/admin-dashboard', { replace: true });
        } else if (userType === 'doctor' || userType === 'Doctor') {
          navigate('/doctor-dashboard', { replace: true });
        } else {
          navigate('/patient-dashboard', { replace: true });
        }
      }
    }
    // Don't redirect from home page - let users see the landing page
  }, [navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mern-stack" element={<MERNStackDetails />} />
      
      {/* Protected Routes */}
      <Route 
        path="/patient-dashboard" 
        element={
          <ProtectedRoute requiredUserType="patient">
            <PatientDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/patient-profile" 
        element={
          <ProtectedRoute requiredUserType="patient">
            <PatientProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/appointments" 
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/doctor-dashboard" 
        element={
          <ProtectedRoute requiredUserType="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/doctor-appointments" 
        element={
          <ProtectedRoute requiredUserType="doctor">
            <DoctorAppointments />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute requiredUserType="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;

