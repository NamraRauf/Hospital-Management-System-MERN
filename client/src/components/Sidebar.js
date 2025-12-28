import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getNavItems = () => {
    if (userType === 'admin') {
      return [
        { path: '/admin-dashboard', icon: '🏠', label: 'Dashboard' },
        { path: '/reports', icon: '📊', label: 'Reports' }
      ];
    } else if (userType === 'doctor') {
      return [
        { path: '/doctor-dashboard', icon: '🏠', label: 'Dashboard' },
        { path: '/doctor-appointments', icon: '📅', label: 'Appointments' },
        { path: '/doctor-medical-records', icon: '📋', label: 'Medical Records' },
        { path: '/doctor-analytics', icon: '📊', label: 'Analytics & Reports' }
      ];
    } else {
      return [
        { path: '/patient-dashboard', icon: '🏠', label: 'Dashboard' },
        { path: '/patient-profile', icon: '👤', label: 'My Profile' },
        { path: '/appointments', icon: '📅', label: 'Appointments' },
        { path: '/reports', icon: '📋', label: 'Medical Records' }
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#1e40af',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '20px 0',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      {/* Logo */}
      <div style={{
        padding: '0 20px 30px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'white'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🏥
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700' }}>HMS</div>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>Management</div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div style={{ flex: 1, padding: '0 10px' }}>
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            style={{
              padding: '12px 15px',
              marginBottom: '5px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s',
              fontSize: '15px',
              fontWeight: isActive(item.path) ? '600' : '400'
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div style={{
        padding: '0 10px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '20px'
      }}>
        <div
          onClick={handleLogout}
          style={{
            padding: '12px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'all 0.3s',
            fontSize: '15px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span style={{ fontSize: '20px' }}>🚪</span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

