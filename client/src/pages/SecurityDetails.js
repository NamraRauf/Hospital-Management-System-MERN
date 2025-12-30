import React from 'react';
import { useNavigate } from 'react-router-dom';

const SecurityDetails = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px' }}>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: 'white',
        padding: '20px 40px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        borderRadius: '12px',
        maxWidth: '1400px',
        margin: '0 auto 40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#8b5cf6',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            color: 'white',
            fontWeight: 'bold'
          }}>
            🔒
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#1e293b', fontWeight: '700' }}>
            Security & Privacy
          </h1>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1d4ed8';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#2563eb';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ← Back to Home
        </button>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px 40px',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          marginBottom: '40px',
          boxShadow: '0 20px 60px rgba(118, 75, 162, 0.3)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
          <h1 style={{ fontSize: '48px', fontWeight: '700', margin: '0 0 20px 0' }}>
            Enterprise-Grade Security
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.95, maxWidth: '800px', margin: '0 auto' }}>
            Multiple layers of security protection to ensure your data is safe and private
          </p>
        </div>

        {/* Security Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Feature 1: Authentication */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
          }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#3b82f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '20px'
            }}>
              🔑
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>
              JWT Token Authentication
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '15px' }}>
              Secure token-based authentication system that validates user identity on every request.
            </p>
            <div style={{ padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#1e40af', fontWeight: '600', marginBottom: '8px' }}>
                Features:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px' }}>
                <li>7-day token expiration</li>
                <li>Automatic token refresh</li>
                <li>Secure token storage</li>
                <li>Role-based token claims</li>
              </ul>
            </div>
          </div>

          {/* Feature 2: Password Encryption */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
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
              🔐
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>
              Bcrypt Password Encryption
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '15px' }}>
              Industry-standard password hashing using bcrypt with salt rounds for maximum security.
            </p>
            <div style={{ padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#166534', fontWeight: '600', marginBottom: '8px' }}>
                Security Level:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px' }}>
                <li>10 salt rounds (high security)</li>
                <li>One-way hashing (irreversible)</li>
                <li>No plain text storage</li>
                <li>Automatic hashing on save</li>
              </ul>
            </div>
          </div>

          {/* Feature 3: Role-Based Access */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
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
              👥
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>
              Role-Based Access Control (RBAC)
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '15px' }}>
              Granular access control based on user roles (Patient, Doctor, Admin) with protected routes.
            </p>
            <div style={{ padding: '15px', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#92400e', fontWeight: '600', marginBottom: '8px' }}>
                Access Levels:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px' }}>
                <li>Patient: Own data access</li>
                <li>Doctor: Patient records + appointments</li>
                <li>Admin: Full system access</li>
                <li>Protected routes middleware</li>
              </ul>
            </div>
          </div>

          {/* Feature 4: Database Security */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
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
              🗄️
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>
              MongoDB Atlas Cloud Database
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '15px' }}>
              Secure cloud database with enterprise-grade security features and automatic backups.
            </p>
            <div style={{ padding: '15px', backgroundColor: '#faf5ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#6b21a8', fontWeight: '600', marginBottom: '8px' }}>
                Database Security:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px' }}>
                <li>Encrypted connections (TLS/SSL)</li>
                <li>IP whitelisting support</li>
                <li>Automatic backups</li>
                <li>Access control & monitoring</li>
              </ul>
            </div>
          </div>

          {/* Feature 5: API Security */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
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
              🛡️
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>
              API Endpoint Protection
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '15px' }}>
              All API endpoints are protected with authentication middleware and CORS configuration.
            </p>
            <div style={{ padding: '15px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#991b1b', fontWeight: '600', marginBottom: '8px' }}>
                Protection Features:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px' }}>
                <li>JWT token validation</li>
                <li>CORS policy enforcement</li>
                <li>Input validation & sanitization</li>
                <li>Rate limiting ready</li>
              </ul>
            </div>
          </div>

          {/* Feature 6: Data Privacy */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
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
              🔒
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>
              Data Privacy & Compliance
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '15px' }}>
              HIPAA-ready architecture with data encryption, access logs, and privacy controls.
            </p>
            <div style={{ padding: '15px', backgroundColor: '#ecfeff', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#164e63', fontWeight: '600', marginBottom: '8px' }}>
                Privacy Features:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px' }}>
                <li>Data encryption at rest</li>
                <li>Secure data transmission</li>
                <li>Access logging & audit trails</li>
                <li>User data isolation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Architecture Diagram */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '30px', textAlign: 'center' }}>
            Security Architecture
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌐</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '10px' }}>
                Frontend (React)
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                Token storage in localStorage<br/>
                Protected routes<br/>
                Secure API calls
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔐</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '10px' }}>
                Authentication Layer
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                JWT token validation<br/>
                Role verification<br/>
                Session management
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚡</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '10px' }}>
                Backend (Express)
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                Middleware protection<br/>
                Input validation<br/>
                CORS configuration
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🗄️</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '10px' }}>
                Database (MongoDB)
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                Encrypted connections<br/>
                Hashed passwords<br/>
                Secure queries
              </p>
            </div>
          </div>
        </div>

        {/* Security Best Practices */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '30px', textAlign: 'center' }}>
            Security Best Practices Implemented
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                Password Security
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Minimum 6 characters, bcrypt hashing, never stored in plain text
              </p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                Token Management
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                7-day expiration, secure storage, automatic validation on requests
              </p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                Access Control
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Role-based permissions, protected routes, user type verification
              </p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                Data Validation
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Input sanitization, email validation, required field checks
              </p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                Secure Communication
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                HTTPS ready, CORS configured, secure API endpoints
              </p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                Error Handling
              </h4>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Secure error messages, no sensitive data exposure, proper logging
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDetails;

