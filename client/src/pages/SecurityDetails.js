import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SecurityDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tabId) => {
    console.log('Tab clicked:', tabId);
    setActiveTab(tabId);
    window.scrollTo(0, 0);
  };

  const handleBackClick = () => {
    console.log('Back button clicked');
    navigate('/');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
          <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '10px' }}>
            Secure & Private
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Enterprise-grade security with multiple layers of protection
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f8f9fa',
          borderBottom: '2px solid #e2e8f0',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: '📋 Overview', icon: '📋' },
            { id: 'authentication', label: '🔐 Authentication', icon: '🔐' },
            { id: 'authorization', label: '🛡️ Authorization', icon: '🛡️' },
            { id: 'encryption', label: '🔒 Encryption', icon: '🔒' },
            { id: 'database', label: '💾 Database', icon: '💾' },
            { id: 'network', label: '🌐 Network', icon: '🌐' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleTabClick(tab.id);
              }}
              style={{
                padding: '20px 30px',
                backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#667eea' : '#64748b',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
                position: 'relative',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ padding: '40px' }}>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                🔒 Security Overview
              </h2>
              
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #0ea5e9',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🎯 Security Features
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <span style={{ fontSize: '24px' }}>✅</span>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#1e293b' }}>JWT Token Authentication</div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>Secure token-based authentication system</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <span style={{ fontSize: '24px' }}>✅</span>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#1e293b' }}>Bcrypt Password Encryption</div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>Industry-standard password hashing</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <span style={{ fontSize: '24px' }}>✅</span>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#1e293b' }}>Role-Based Access Control (RBAC)</div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>User permissions based on roles</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <span style={{ fontSize: '24px' }}>✅</span>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#1e293b' }}>MongoDB Atlas Secure Cloud Database</div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>Encrypted cloud database with secure connections</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <span style={{ fontSize: '24px' }}>✅</span>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#1e293b' }}>HTTPS Ready & CORS Protected</div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>Secure communication and cross-origin protection</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fef3c7',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #f59e0b',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#1e293b' }}>
                  🛡️ Security Layers
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔐</div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>Authentication Layer</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>User identity verification</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>🛡️</div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>Authorization Layer</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>Access control & permissions</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔒</div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>Encryption Layer</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>Data protection & hashing</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌐</div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>Network Layer</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>Secure communication</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'authentication' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                🔐 JWT Token Authentication
              </h2>
              
              <div style={{
                backgroundColor: '#ecfeff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #0ea5e9',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  📝 How It Works:
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>1. User Login</div>
                    <div style={{ color: '#64748b' }}>User provides email and password</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>2. Token Generation</div>
                    <div style={{ color: '#64748b' }}>Backend generates JWT token with user info</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>3. Token Storage</div>
                    <div style={{ color: '#64748b' }}>Token stored in browser localStorage</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>4. Token Validation</div>
                    <div style={{ color: '#64748b' }}>Every API request includes token for verification</div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #22c55e'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#1e293b' }}>
                  ✅ Benefits:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>Stateless authentication</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>Token expiration (7 days)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>Secure user identification</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>No server-side session storage needed</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'authorization' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                🛡️ Role-Based Access Control (RBAC)
              </h2>
              
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #f59e0b',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  👥 User Roles:
                </h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #3b82f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <span style={{ fontSize: '32px' }}>👤</span>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '20px', color: '#1e293b' }}>Patient</div>
                        <div style={{ color: '#64748b' }}>Can view own profile, book appointments</div>
                      </div>
                    </div>
                    <div style={{ padding: '15px', backgroundColor: '#eff6ff', borderRadius: '8px', fontSize: '14px' }}>
                      <strong>Permissions:</strong> View own data, Book appointments, Update profile
                    </div>
                  </div>
                  <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #10b981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <span style={{ fontSize: '32px' }}>👨‍⚕️</span>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '20px', color: '#1e293b' }}>Doctor</div>
                        <div style={{ color: '#64748b' }}>Can view appointments, manage medical records</div>
                      </div>
                    </div>
                    <div style={{ padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px', fontSize: '14px' }}>
                      <strong>Permissions:</strong> View appointments, Manage records, View patient data, Analytics
                    </div>
                  </div>
                  <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #8b5cf6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <span style={{ fontSize: '32px' }}>👑</span>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '20px', color: '#1e293b' }}>Admin</div>
                        <div style={{ color: '#64748b' }}>Full system access and management</div>
                      </div>
                    </div>
                    <div style={{ padding: '15px', backgroundColor: '#faf5ff', borderRadius: '8px', fontSize: '14px' }}>
                      <strong>Permissions:</strong> Manage all users, View all data, System administration, Reports
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #0ea5e9'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#1e293b' }}>
                  🔒 Protected Routes:
                </h3>
                <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.8' }}>
                  Each route checks user role before allowing access. Unauthorized users are redirected to login page.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'encryption' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                🔒 Bcrypt Password Encryption
              </h2>
              
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #22c55e',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🔐 Encryption Process:
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>1. Password Input</div>
                    <div style={{ color: '#64748b' }}>User enters plain text password</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>2. Hashing</div>
                    <div style={{ color: '#64748b' }}>Bcrypt creates secure hash with salt rounds (10)</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>3. Storage</div>
                    <div style={{ color: '#64748b' }}>Only hash stored in database, never plain password</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>4. Verification</div>
                    <div style={{ color: '#64748b' }}>Login compares hash, original password never stored</div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fef3c7',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #f59e0b'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#1e293b' }}>
                  ✅ Security Features:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>One-way hashing (cannot reverse)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>Salt rounds prevent rainbow table attacks</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>Industry-standard encryption algorithm</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                💾 MongoDB Atlas Secure Cloud Database
              </h2>
              
              <div style={{
                backgroundColor: '#ecfeff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #0ea5e9',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🔐 Database Security:
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>🌐 Cloud Hosting</div>
                    <div style={{ color: '#64748b' }}>MongoDB Atlas provides secure cloud infrastructure</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>🔒 Encrypted Connections</div>
                    <div style={{ color: '#64748b' }}>All database connections use SSL/TLS encryption</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>👤 Access Control</div>
                    <div style={{ color: '#64748b' }}>Database user with limited permissions</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>🛡️ IP Whitelisting</div>
                    <div style={{ color: '#64748b' }}>Network access restrictions for security</div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #22c55e'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#1e293b' }}>
                  ✅ Benefits:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>Automatic backups and disaster recovery</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>99.95% uptime SLA</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>Scalable infrastructure</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <span>Compliance with security standards</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                🌐 Network Security (HTTPS & CORS)
              </h2>
              
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #f59e0b',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🔒 HTTPS Ready:
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>🔐 SSL/TLS Encryption</div>
                    <div style={{ color: '#64748b' }}>All data transmitted over encrypted connection</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>✅ Certificate Validation</div>
                    <div style={{ color: '#64748b' }}>SSL certificates verify server identity</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>🛡️ Data Integrity</div>
                    <div style={{ color: '#64748b' }}>Prevents man-in-the-middle attacks</div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #0ea5e9',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🌐 CORS Protection:
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>🚫 Cross-Origin Restrictions</div>
                    <div style={{ color: '#64748b' }}>Only allowed origins can access API</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>✅ Preflight Requests</div>
                    <div style={{ color: '#64748b' }}>OPTIONS requests validated before actual requests</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '18px' }}>🛡️ Header Validation</div>
                    <div style={{ color: '#64748b' }}>Only authorized headers accepted</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleBackClick();
              }}
              style={{
                padding: '15px 40px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5568d3';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#667eea';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDetails;

