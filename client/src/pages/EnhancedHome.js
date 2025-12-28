import React from 'react';
import { useNavigate } from 'react-router-dom';

const EnhancedHome = () => {
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
                onClick={() => navigate('/login')}
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
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
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
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '100px 40px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            marginBottom: '20px',
            lineHeight: '1.2',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Modern Hospital Management
            <br />
            <span style={{ color: '#fbbf24' }}>Made Simple</span>
          </h1>
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Complete MERN Stack solution for managing patients, doctors, appointments,
            and medical records. Secure, efficient, and user-friendly.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleGetStarted}
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
              {token ? 'Go to Dashboard' : 'Start Free Trial'}
            </button>
            {!token && (
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '16px 40px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: '700',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Sign In
              </button>
            )}
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
            Complete Hospital Management Solution
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {/* Feature 1 */}
            <div
              onClick={handleGetStarted}
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
                Patient Portal
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Complete patient management with profile editing, appointment booking,
                medical history tracking, and secure access to records.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              onClick={handleGetStarted}
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
                Doctor Dashboard
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Dedicated dashboard for doctors to manage schedules, view patient records,
                handle appointments, and update medical records efficiently.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              onClick={handleGetStarted}
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
                Online appointment booking with real-time availability,
                automated reminders, and complete schedule management.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              onClick={handleGetStarted}
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
                backgroundColor: '#8b5cf6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px'
              }}>
                🔒
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Secure & Private
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                JWT-based authentication, encrypted passwords, role-based access control,
                and secure data storage with MongoDB Atlas.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              onClick={handleGetStarted}
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
                Admin Panel
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Complete admin dashboard with patient management, doctor management,
                statistics, reports, and system administration.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              onClick={() => navigate('/')}
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
                MERN Stack
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Built with MongoDB, Express.js, React.js, and Node.js -
                modern, scalable, and maintainable architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '80px 40px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>100%</h3>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Secure</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>24/7</h3>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Available</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>MERN</h3>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Stack</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>100%</h3>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Reliable</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 40px', backgroundColor: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '20px'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Join thousands of hospitals already using our system to manage their operations efficiently.
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

export default EnhancedHome;

