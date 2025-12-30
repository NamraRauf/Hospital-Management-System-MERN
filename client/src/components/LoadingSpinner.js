import React from 'react';

const LoadingSpinner = ({ size = 'large', message = 'Loading...' }) => {
  const sizes = {
    small: { width: '24px', height: '24px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '3px' },
    large: { width: '60px', height: '60px', borderWidth: '4px' }
  };

  const spinnerSize = sizes[size] || sizes.large;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      padding: '40px'
    }}>
      <div
        style={{
          width: spinnerSize.width,
          height: spinnerSize.height,
          border: `${spinnerSize.borderWidth} solid #e5e7eb`,
          borderTop: `${spinnerSize.borderWidth} solid #2563eb`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      {message && (
        <div style={{
          fontSize: '18px',
          color: '#64748b',
          fontWeight: '600'
        }}>
          {message}
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

