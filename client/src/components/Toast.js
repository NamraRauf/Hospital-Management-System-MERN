import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      backgroundColor: '#10b981',
      borderColor: '#059669',
      icon: '✅'
    },
    error: {
      backgroundColor: '#ef4444',
      borderColor: '#dc2626',
      icon: '❌'
    },
    warning: {
      backgroundColor: '#f59e0b',
      borderColor: '#d97706',
      icon: '⚠️'
    },
    info: {
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      icon: 'ℹ️'
    }
  };

  const style = styles[type] || styles.success;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: style.backgroundColor,
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 10000,
        animation: 'slideInRight 0.3s ease-out',
        border: `2px solid ${style.borderColor}`,
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <span style={{ fontSize: '24px' }}>{style.icon}</span>
      <span style={{ flex: 1, fontSize: '16px', fontWeight: '600' }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '0',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;

