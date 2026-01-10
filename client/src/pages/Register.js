import React, { useState } from 'react';
import { registerPatient, registerDoctor } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: '',
    userType: 'patient',
    phone: '',
    age: '',
    gender: '',
    address: '',
    medicalHistory: '',
    bloodGroup: '',
    specialization: '' // For doctor registration
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

        // Validation
        if (!formData.password) {
          setError('❌ Password is required!');
          setLoading(false);
          return;
        }

        if (!formData.confirmPassword) {
          setError('❌ Please confirm your password!');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('❌ Password must be at least 6 characters long');
          setLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('❌ Passwords do not match! Please enter the same password in both fields.');
          setLoading(false);
          return;
        }

    try {
      const { confirmPassword, userType, ...dataToSend } = formData;
      
      if (formData.userType === 'patient') {
        await registerPatient(dataToSend);
      } else {
        await registerDoctor(dataToSend);
      }
      
      // Success - show message and redirect
      setSuccess('Registration Successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Registration Error:', error);
      console.error('Error Response:', error.response);
      
      let errorMessage = 'Registration Failed. Please try again.';
      let helpfulMessage = '';
      
      if (error.response) {
        // Server responded with error
        const serverMessage = error.response.data?.message || error.response.data?.error || '';
        errorMessage = serverMessage;
        
        // Add helpful suggestions based on error
        if (serverMessage.toLowerCase().includes('email already exists') || serverMessage.toLowerCase().includes('already exists')) {
          helpfulMessage = '💡 Tip: This email is already registered. Try using a different email or login with existing account.';
        } else if (serverMessage.toLowerCase().includes('password')) {
          helpfulMessage = '💡 Tip: Password must be at least 6 characters long.';
        } else if (serverMessage.toLowerCase().includes('validation')) {
          helpfulMessage = '💡 Tip: Please fill all required fields correctly.';
        }
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'Cannot connect to server.';
        helpfulMessage = '💡 Tip: Make sure backend server is running on port 5000.';
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
      if (helpfulMessage) {
        setError(`${errorMessage}\n\n${helpfulMessage}`);
      }
      
      // Don't show alert - just show error in form
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
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#10b981',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            margin: '0 auto 20px',
            boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)'
          }}>
            🏥
          </div>
          <h2 style={{ 
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '10px',
            color: '#1e293b'
          }}>
            Create Account
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Join our hospital management system
          </p>
        </div>
        
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '16px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '2px solid #fecaca',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', marginBottom: '5px' }}>Registration Failed</div>
                <div style={{ whiteSpace: 'pre-line' }}>{error}</div>
              </div>
            </div>
            {error.toLowerCase().includes('email already exists') && (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
              }}>
                <div style={{ fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
                  ✅ Quick Solution:
                </div>
                <div style={{ color: '#1e40af', fontSize: '13px', lineHeight: '1.6' }}>
                  • Use a different email address (e.g., add numbers: yourname2@gmail.com)<br/>
                  • Or login with existing account: <a href="/login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Click here to Login</a>
                </div>
              </div>
            )}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            padding: '16px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '2px solid #bbf7d0',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '20px' }}>✅</span>
            <span style={{ fontWeight: '600' }}>{success}</span>
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
              Register As
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
              Full Name
            </label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your full name" 
              value={formData.name}
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

          <div style={{ marginBottom: '24px' }}>
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
              placeholder="Minimum 6 characters" 
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Confirm Password <span style={{color: '#dc2626'}}>*</span>
            </label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Re-enter your password (REQUIRED)" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: formData.confirmPassword && formData.password !== formData.confirmPassword ? '2px solid #dc2626' : '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'all 0.3s',
                backgroundColor: formData.confirmPassword && formData.password !== formData.confirmPassword ? '#fef2f2' : 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => {
                if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
                  e.target.style.borderColor = '#dc2626';
                } else {
                  e.target.style.borderColor = '#e5e7eb';
                }
              }}
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px', fontWeight: '600' }}>
                ⚠️ Passwords do not match! Please enter the same password.
              </p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 6 && (
              <p style={{ color: '#10b981', fontSize: '12px', marginTop: '5px', fontWeight: '600' }}>
                ✅ Passwords match!
              </p>
            )}
          </div>

          {formData.userType === 'doctor' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Specialization
                </label>
                <input 
                  type="text" 
                  name="specialization" 
                  placeholder="e.g., Cardiology, Pediatrics, General Medicine" 
                  value={formData.specialization}
                  onChange={handleChange}
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
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Phone Number (Optional)
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Enter your phone number" 
                  value={formData.phone}
                  onChange={handleChange}
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
            </>
          )}

          {formData.userType === 'patient' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Phone Number (Optional)
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Enter your phone number" 
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Age (Optional)
                  </label>
                  <input 
                    type="number" 
                    name="age" 
                    placeholder="Age" 
                    value={formData.age}
                    onChange={handleChange}
                    min="0"
                    max="150"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Gender (Optional)
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s',
              marginTop: '10px',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
              }
            }}
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Already have an account?
          </p>
          <a 
            href="/login" 
            style={{ 
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Sign in →
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

export default Register;
