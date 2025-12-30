import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  const handleGetStarted = () => {
    if (token && userType) {
      if (userType === 'admin') {
        navigate('/admin-dashboard');
      } else if (userType === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: 'white',
        padding: '20px 40px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#2563eb',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            color: 'white',
            fontWeight: 'bold'
          }}>
            🏥
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#1e293b', fontWeight: '700' }}>
            Hospital Management System
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {token ? (
            <>
              <button
                onClick={handleGetStarted}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(37, 99, 235, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.3)';
                }}
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
                style={{
                  padding: '10px 24px',
                  backgroundColor: 'transparent',
                  color: '#2563eb',
                  border: '2px solid #2563eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#2563eb';
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Nav Login clicked');
                  navigate('/login');
                }}
                style={{
                  padding: '10px 24px',
                  backgroundColor: 'transparent',
                  color: '#2563eb',
                  border: '2px solid #2563eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  position: 'relative',
                  zIndex: 1001,
                  pointerEvents: 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#2563eb';
                }}
              >
                Login
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Nav Get Started clicked');
                  navigate('/register');
                }}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
                  transition: 'all 0.3s',
                  position: 'relative',
                  zIndex: 1001,
                  pointerEvents: 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(37, 99, 235, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.3)';
                }}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

          {/* Hero Section */}
          <section style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)',
            padding: '120px 40px',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}></div>
            
            <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px',
                margin: '0 auto 30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                🏥
              </div>
              <h1 style={{
                fontSize: '64px',
                fontWeight: '900',
                marginBottom: '25px',
                lineHeight: '1.2',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                letterSpacing: '-1px'
              }}>
                Advanced Hospital Management
                <br />
                <span style={{ 
                  color: '#fbbf24',
                  textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                }}>System</span>
              </h1>
              <p style={{
                fontSize: '22px',
                marginBottom: '50px',
                opacity: 0.95,
                lineHeight: '1.8',
                fontWeight: '400',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Complete MERN Stack solution for managing patients, doctors, appointments, 
                medical records, and payments. Secure, efficient, and professionally designed 
                for modern healthcare facilities.
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Button clicked:', token ? 'Dashboard' : 'Register');
                    handleGetStarted();
                  }}
                  style={{
                    padding: '16px 40px',
                    backgroundColor: '#fbbf24',
                    color: '#1e293b',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: '700',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s',
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                  }}
                >
                  {token ? 'Go to Dashboard' : 'Start Free Trial'}
                </button>
                {!token && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Login button clicked');
                      navigate('/login');
                    }}
                    style={{
                      padding: '16px 40px',
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: '2px solid white',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: '700',
                      transition: 'all 0.3s',
                      position: 'relative',
                      zIndex: 10,
                      pointerEvents: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#667eea';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    Sign In
                  </button>
                )}
              </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{ 
        padding: '80px 40px', 
        backgroundColor: '#f8fafc',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '42px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '20px'
          }}>
            Trusted by Healthcare Professionals
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '18px',
            color: '#64748b',
            marginBottom: '60px'
          }}>
            Comprehensive solution for modern healthcare management
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <StatBox 
              number="10,000+" 
              label="Patients Managed" 
              icon="👥"
              desc="Efficient patient record management"
            />
            <StatBox 
              number="500+" 
              label="Doctors Registered" 
              icon="👨‍⚕️"
              desc="Expert medical professionals"
            />
            <StatBox 
              number="50,000+" 
              label="Appointments Booked" 
              icon="📅"
              desc="Seamless appointment scheduling"
            />
            <StatBox 
              number="99.9%" 
              label="Uptime" 
              icon="⚡"
              desc="Reliable system performance"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 40px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '42px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '60px'
          }}>
            Powerful Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {/* Feature 1 */}
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Patient Management clicked');
                navigate('/register');
              }}
              style={{
                padding: '40px',
                borderRadius: '16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#2563eb',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px'
              }}>
                👥
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Patient Management
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Complete patient registration, profile management, medical history tracking, 
                and appointment scheduling in one place.
              </p>
            </div>

            {/* Feature 2 - Doctor Portal */}
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Doctor Portal clicked');
                const token = localStorage.getItem('token');
                const userType = localStorage.getItem('userType');
                
                // Check user type (handle both lowercase and capitalized)
                const normalizedUserType = userType?.toLowerCase();
                
                // Only doctors can access doctor portal
                if (token && normalizedUserType === 'doctor') {
                  navigate('/doctor-dashboard');
                } else if (token && normalizedUserType === 'admin') {
                  // Admin can also access
                  navigate('/admin-dashboard');
                } else if (token) {
                  // Patient or other user - logout and redirect to login
                  alert('⚠️ Doctor Portal - Please login as Doctor.\n\nLogging out current session...');
                  localStorage.clear();
                  navigate('/login');
                } else {
                  // Not logged in - go to login (not register, so they can select doctor)
                  navigate('/login');
                }
              }}
              style={{
                padding: '40px',
                borderRadius: '16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#10b981',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px'
              }}>
                👨‍⚕️
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Doctor Portal
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Dedicated dashboard for doctors to manage schedules, view patient records, 
                and handle appointments efficiently.
              </p>
            </div>

            {/* Feature 3 */}
            <div 
              onClick={() => {
                const token = localStorage.getItem('token');
                if (token) {
                  navigate('/patient-dashboard');
                } else {
                  navigate('/register');
                }
              }}
              style={{
                padding: '40px',
                borderRadius: '16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f59e0b',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px'
              }}>
                📅
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Appointment System
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Online appointment booking system with real-time availability, 
                automated reminders, and schedule management.
              </p>
            </div>

            {/* Feature 4 - Enhanced Security Section */}
            <div 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Security section clicked');
                navigate('/security-details');
              }}
              style={{
                padding: '40px',
                borderRadius: '16px',
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: '2px solid #764ba2',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(118, 75, 162, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                🔒
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>
                Secure & Private
              </h3>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6', marginBottom: '20px' }}>
                Enterprise-grade security with multiple layers of protection
              </p>
              <div style={{ 
                marginTop: '15px', 
                padding: '12px', 
                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '8px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: '600',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                👆 Click to learn more about our security features
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '14px' }}>
                  <span style={{ fontSize: '18px' }}>✅</span>
                  <span>JWT Token Authentication</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '14px' }}>
                  <span style={{ fontSize: '18px' }}>✅</span>
                  <span>Bcrypt Password Encryption</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '14px' }}>
                  <span style={{ fontSize: '18px' }}>✅</span>
                  <span>Role-Based Access Control (RBAC)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '14px' }}>
                  <span style={{ fontSize: '18px' }}>✅</span>
                  <span>MongoDB Atlas Secure Cloud Database</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '14px' }}>
                  <span style={{ fontSize: '18px' }}>✅</span>
                  <span>HTTPS Ready & CORS Protected</span>
                </div>
              </div>
            </div>

            {/* Feature 5 - Admin Panel */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Admin Panel clicked');
                const token = localStorage.getItem('token');
                const userType = localStorage.getItem('userType');
                
                const normalizedUserType = userType?.toLowerCase();
                
                if (token && normalizedUserType === 'admin') {
                  navigate('/admin-dashboard');
                } else if (token) {
                  alert('⚠️ Admin Panel - Please login as Admin.\n\nLogging out current session...');
                  localStorage.clear();
                  navigate('/login');
                } else {
                  navigate('/login');
                }
              }}
              style={{
                padding: '40px',
                borderRadius: '16px',
                backgroundColor: '#f8fafc',
                border: '2px solid #8b5cf6',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.backgroundColor = '#f3e8ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                ADMIN
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#8b5cf6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px'
              }}>
                👑
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Admin Panel
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Complete admin dashboard with patient management, doctor management,
                statistics, reports, and system administration.
              </p>
            </div>

            {/* Feature 6 - Analytics & Reports */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Analytics clicked');
                const token = localStorage.getItem('token');
                if (token) {
                  navigate('/reports');
                } else {
                  navigate('/login');
                }
              }}
              style={{
                padding: '40px',
                borderRadius: '16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#ef4444',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px'
              }}>
                📊
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Analytics & Reports
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Real-time statistics, comprehensive reports, and data analytics
                to help make informed decisions.
              </p>
            </div>

            {/* Feature 6 - MERN Stack */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('MERN Stack card clicked');
                navigate('/mern-stack');
              }}
              style={{
                padding: '40px',
                borderRadius: '16px',
                backgroundColor: '#f8fafc',
                border: '2px solid #06b6d4',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(6, 182, 212, 0.3)';
                e.currentTarget.style.backgroundColor = '#ecfeff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#06b6d4',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                MERN
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#06b6d4',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px'
              }}>
                💻
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                MERN Stack Architecture
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '15px' }}>
                Built with <strong>MongoDB</strong>, <strong>Express.js</strong>, <strong>React.js</strong>, and <strong>Node.js</strong> - 
                modern, scalable, and maintainable full-stack architecture.
              </p>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '15px'
              }}>
                <span style={{
                  padding: '4px 10px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>MongoDB</span>
                <span style={{
                  padding: '4px 10px',
                  backgroundColor: '#000000',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>Express</span>
                <span style={{
                  padding: '4px 10px',
                  backgroundColor: '#61dafb',
                  color: '#000',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>React</span>
                <span style={{
                  padding: '4px 10px',
                  backgroundColor: '#339933',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>Node.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '80px 40px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '50px',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Why Choose Our System?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            <StatBox
              number="100%"
              label="Secure & HIPAA Compliant"
              icon="🔒"
              desc="End-to-end encryption"
            />
            <StatBox
              number="24/7"
              label="Always Available"
              icon="⏰"
              desc="Cloud-based system"
            />
            <StatBox
              number="MERN"
              label="Modern Tech Stack"
              icon="💻"
              desc="Scalable architecture"
            />
            <StatBox
              number="100%"
              label="Reliable & Fast"
              icon="⚡"
              desc="High performance"
            />
          </div>
        </div>
      </section>

          {/* Hospital Features Section */}
          <section style={{ 
            padding: '100px 40px', 
            backgroundColor: '#f8fafc',
            backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: '48px',
                fontWeight: '800',
                textAlign: 'center',
                color: '#1e293b',
                marginBottom: '20px'
              }}>
                🏥 Complete Hospital Management
              </h2>
              <p style={{
                fontSize: '22px',
                textAlign: 'center',
                color: '#64748b',
                marginBottom: '60px',
                lineHeight: '1.8'
              }}>
                Everything you need to manage a modern healthcare facility
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                marginBottom: '60px'
              }}>
                <HospitalFeature
                  icon="👥"
                  title="Patient Management"
                  features={['Registration', 'Medical History', 'Profile Management', 'Records Tracking']}
                  color="#3b82f6"
                />
                <HospitalFeature
                  icon="👨‍⚕️"
                  title="Doctor Management"
                  features={['Doctor Profiles', 'Specializations', 'Schedule Management', 'Patient Assignment']}
                  color="#10b981"
                />
                <HospitalFeature
                  icon="📅"
                  title="Appointment System"
                  features={['Online Booking', 'Schedule Management', 'Status Tracking', 'Reminders']}
                  color="#f59e0b"
                />
                <HospitalFeature
                  icon="💳"
                  title="Payment Gateway"
                  features={['Stripe Integration', 'Secure Payments', 'Payment History', 'Receipts']}
                  color="#8b5cf6"
                />
                <HospitalFeature
                  icon="👑"
                  title="Admin Panel"
                  features={['User Management', 'System Analytics', 'Reports', 'Settings']}
                  color="#ef4444"
                />
                <HospitalFeature
                  icon="📊"
                  title="Analytics & Reports"
                  features={['Real-time Stats', 'Data Analytics', 'Visual Reports', 'Insights']}
                  color="#06b6d4"
                />
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section style={{ 
            padding: '100px 40px', 
            backgroundColor: '#ffffff',
            background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{
                textAlign: 'center',
                fontSize: '42px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '20px'
              }}>
                What Healthcare Professionals Say
              </h2>
              <p style={{
                textAlign: 'center',
                fontSize: '18px',
                color: '#64748b',
                marginBottom: '60px'
              }}>
                Trusted by hospitals and clinics worldwide
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px'
              }}>
                <TestimonialCard
                  name="Dr. Sarah Johnson"
                  role="Chief Medical Officer"
                  hospital="City General Hospital"
                  text="This system has revolutionized our patient management. The MERN stack implementation is flawless and the UI is incredibly intuitive."
                  rating={5}
                />
                <TestimonialCard
                  name="Dr. Michael Chen"
                  role="Hospital Administrator"
                  hospital="Metro Healthcare"
                  text="Best hospital management system we've used. The admin panel is comprehensive and the real-time analytics are invaluable."
                  rating={5}
                />
                <TestimonialCard
                  name="Dr. Emily Rodriguez"
                  role="Head of Pediatrics"
                  hospital="Children's Medical Center"
                  text="The appointment system is seamless and the patient portal makes everything so easy for our patients. Highly recommended!"
                  rating={5}
                />
              </div>
            </div>
          </section>

          {/* Technology Showcase */}
          <section style={{ 
            padding: '100px 40px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{
                fontSize: '42px',
                fontWeight: '700',
                marginBottom: '20px',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Built with Modern Technology
              </h2>
              <p style={{
                fontSize: '20px',
                marginBottom: '60px',
                opacity: 0.95,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Complete MERN Stack implementation for scalable, secure, and efficient healthcare management
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px'
              }}>
                <TechCard name="MongoDB" desc="NoSQL Database" icon="🍃" color="#10b981" />
                <TechCard name="Express.js" desc="Backend Framework" icon="⚡" color="#000000" />
                <TechCard name="React.js" desc="Frontend Library" icon="⚛️" color="#61dafb" />
                <TechCard name="Node.js" desc="Runtime Environment" icon="🟢" color="#339933" />
              </div>
              <div style={{ marginTop: '50px' }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('MERN Stack button clicked');
                    navigate('/mern-stack');
                  }}
                  style={{
                    padding: '16px 40px',
                    backgroundColor: 'white',
                    color: '#667eea',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: '700',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                  }}
                >
                  View Complete MERN Stack Details →
                </button>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section style={{ 
            padding: '100px 40px', 
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '50px',
                margin: '0 auto 30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                🚀
              </div>
              <h2 style={{
                fontSize: '48px',
                fontWeight: '800',
                marginBottom: '25px',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Ready to Transform Your Hospital?
              </h2>
              <p style={{
                fontSize: '22px',
                marginBottom: '50px',
                opacity: 0.95,
                lineHeight: '1.8',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Join modern healthcare facilities using our comprehensive MERN Stack 
                Hospital Management System.
              </p>
                <button
                  onClick={handleGetStarted}
                  style={{
                    padding: '18px 48px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontWeight: '700',
                    boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
                  }}
                >
                  {token ? 'Go to Dashboard' : 'Create Free Account'}
                </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '60px 40px 30px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
            textAlign: 'left'
          }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                🏥 Hospital Management System
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                Modern MERN Stack solution for efficient hospital management.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <a href="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>Login</a>
                <a href="/register" style={{ color: '#94a3b8', textDecoration: 'none' }}>Register</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Technology</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#94a3b8' }}>
                <div>MongoDB</div>
                <div>Express.js</div>
                <div>React.js</div>
                <div>Node.js</div>
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #334155',
            paddingTop: '30px',
            color: '#94a3b8'
          }}>
            <p style={{ margin: 0 }}>
              © 2024 Hospital Management System. All rights reserved. | MERN Stack FYP Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TestimonialCard = ({ name, role, hospital, text, rating }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  }}
  >
    <div style={{ marginBottom: '20px' }}>
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i} style={{ fontSize: '20px', color: '#fbbf24' }}>⭐</span>
      ))}
    </div>
    <p style={{ 
      fontSize: '16px', 
      color: '#64748b', 
      lineHeight: '1.8', 
      marginBottom: '20px',
      fontStyle: 'italic'
    }}>
      "{text}"
    </p>
    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
      <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '18px' }}>
        {name}
      </div>
      <div style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>
        {role} • {hospital}
      </div>
    </div>
  </div>
);

const TechCard = ({ name, desc, icon, color }) => (
  <div style={{
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '30px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255,255,255,0.2)',
    textAlign: 'center',
    transition: 'all 0.3s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
    e.currentTarget.style.transform = 'translateY(-5px)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
  >
    <div style={{ fontSize: '50px', marginBottom: '15px' }}>{icon}</div>
    <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px', color: 'white' }}>
      {name}
    </h3>
    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)' }}>{desc}</p>
  </div>
);

const StatBox = ({ number, label, icon, desc }) => (
  <div style={{
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '40px 30px',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-10px)';
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
  }}
  >
    <div style={{ fontSize: '50px', marginBottom: '15px' }}>{icon}</div>
    <h3 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '10px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
      {number}
    </h3>
    <p style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', opacity: 1 }}>
      {label}
    </p>
    <p style={{ fontSize: '14px', opacity: 0.8 }}>
      {desc}
    </p>
  </div>
);

const HospitalFeature = ({ icon, title, features, color }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '35px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    border: `2px solid ${color}`,
    transition: 'all 0.3s',
    cursor: 'pointer',
    height: '100%'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-8px)';
    e.currentTarget.style.boxShadow = `0 16px 32px ${color}40`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
  }}
  >
    <div style={{
      width: '70px',
      height: '70px',
      backgroundColor: color,
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      marginBottom: '20px',
      boxShadow: `0 8px 16px ${color}40`
    }}>
      {icon}
    </div>
    <h3 style={{
      fontSize: '24px',
      fontWeight: '800',
      color: '#1e293b',
      marginBottom: '20px'
    }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {features.map((feature, idx) => (
        <div key={idx} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px'
        }}>
          <span style={{ color: color, fontSize: '18px' }}>✓</span>
          <span style={{ color: '#64748b', fontSize: '15px', fontWeight: '500' }}>
            {feature}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Home;

