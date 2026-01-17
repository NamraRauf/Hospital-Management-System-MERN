import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', userType: 'patient' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('🔐 Login attempt:', { email: formData.email, userType: formData.userType });
      const res = await loginUser(formData);
      console.log('✅ Login response:', res);
      console.log('✅ Response data:', res?.data);
      
      if (res?.data?.token) {
        console.log('✅ Token received:', res.data.token.substring(0, 20) + '...');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user || {}));
        console.log('✅ Token saved to localStorage');
      } else {
        console.error('❌ No token in response:', res);
        localStorage.removeItem('token');
        setError('Login failed: No token received');
        setLoading(false);
        return;
      }

      // Prefer server-reported userType (Admin/Doctor/Patient), fallback to selected value
      const resolvedUserType = (res?.data?.userType || formData.userType || 'patient').toLowerCase();
      console.log('✅ UserType resolved:', resolvedUserType);
      localStorage.setItem('userType', resolvedUserType);
      
      // Navigate to appropriate dashboard
      console.log('✅ Navigating to dashboard...');
      if (resolvedUserType === 'admin') {
        navigate('/admin-dashboard');
      } else if (resolvedUserType === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (error) {
      console.error('❌ Login Error:', error);
      console.error('❌ Error Response:', error.response);
      console.error('❌ Error Data:', error.response?.data);
      console.error('❌ Error Status:', error.response?.status);
      console.error('❌ Error Message:', error.message);
      
      let errorMessage = 'Login Failed. Please check your credentials.';
      
      if (error.response) {
        // Server responded with error
        const serverMessage = error.response.data?.message || error.response.data?.error;
        console.error('❌ Server error message:', serverMessage);
        errorMessage = serverMessage || errorMessage;
      } else if (error.request) {
        // Request made but no response
        console.error('❌ No response from server');
        errorMessage = 'Cannot connect to server. Check if Vercel backend is up.';
      } else {
        // Something else happened
        console.error('❌ Other error:', error.message);
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '50px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#2563eb',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            margin: '0 auto 20px',
            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)'
          }}>
            🏥
          </div>
          <h2 style={{ 
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '10px',
            color: '#1e293b'
          }}>
            Welcome Back
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Sign in to your account
          </p>
        </div>
        
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '14px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #fecaca',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="you@example.com" 
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.3s',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
              }
            }}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Don't have an account?
          </p>
          <a 
            href="/register" 
            style={{ 
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Create an account →
          </a>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a 
            href="/" 
            style={{ 
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
