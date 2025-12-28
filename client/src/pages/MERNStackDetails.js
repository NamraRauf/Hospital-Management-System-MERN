import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MERNStackDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tabId) => {
    console.log('Tab clicked:', tabId);
    setActiveTab(tabId);
    // Force re-render
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
        <div style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          padding: '40px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '50px',
            margin: '0 auto 20px'
          }}>
            💻
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '0 0 10px 0' }}>
            MERN Stack Architecture
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.95, margin: 0 }}>
            Complete Full-Stack Hospital Management System
          </p>
          {/* Test Button */}
          <button
            type="button"
            onClick={() => {
              alert('✅ React is working! Buttons are clickable!');
              console.log('✅ Test button clicked - React is working!');
            }}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'white',
              color: '#06b6d4',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            🧪 Test Button (Click Me!)
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #e5e7eb',
          backgroundColor: '#f8fafc',
          position: 'relative',
          zIndex: 10
        }}>
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'mongodb', label: '🍃 MongoDB', icon: '🍃' },
            { id: 'express', label: '⚡ Express.js', icon: '⚡' },
            { id: 'react', label: '⚛️ React.js', icon: '⚛️' },
            { id: 'nodejs', label: '🟢 Node.js', icon: '🟢' },
            { id: 'structure', label: '📁 Project Structure', icon: '📁' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                console.log('✅ Tab clicked:', tab.id);
                handleTabClick(tab.id);
              }}
              style={{
                flex: 1,
                padding: '20px',
                backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #06b6d4' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                color: activeTab === tab.id ? '#06b6d4' : '#64748b',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 1000,
                outline: 'none',
                userSelect: 'none'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e0f2fe';
                  e.currentTarget.style.color = '#0284c7';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#64748b';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '40px' }}>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                🚀 MERN Stack Overview
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                <TechCard
                  name="MongoDB"
                  desc="NoSQL Database"
                  color="#10b981"
                  icon="🍃"
                  details={[
                    "Patient Collection",
                    "Doctor Collection",
                    "Admin Collection",
                    "Appointment Collection",
                    "Payment Collection"
                  ]}
                />
                <TechCard
                  name="Express.js"
                  desc="Backend Framework"
                  color="#000000"
                  icon="⚡"
                  details={[
                    "RESTful API",
                    "JWT Authentication",
                    "Middleware Support",
                    "Route Handling",
                    "Error Handling"
                  ]}
                />
                <TechCard
                  name="React.js"
                  desc="Frontend Library"
                  color="#61dafb"
                  icon="⚛️"
                  details={[
                    "Component-Based UI",
                    "State Management",
                    "React Router",
                    "Axios for API",
                    "Modern Hooks"
                  ]}
                />
                <TechCard
                  name="Node.js"
                  desc="Runtime Environment"
                  color="#339933"
                  icon="🟢"
                  details={[
                    "Server-Side JavaScript",
                    "NPM Packages",
                    "Event-Driven",
                    "Non-Blocking I/O",
                    "Scalable Backend"
                  ]}
                />
              </div>

              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #06b6d4',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  ✅ MERN Stack Features Implemented:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  <FeatureItem icon="🔐" text="JWT Authentication" />
                  <FeatureItem icon="👥" text="User Management (Patient, Doctor, Admin)" />
                  <FeatureItem icon="📅" text="Appointment System" />
                  <FeatureItem icon="💳" text="Payment Gateway (Stripe)" />
                  <FeatureItem icon="📊" text="Dashboard & Analytics" />
                  <FeatureItem icon="🔒" text="Role-Based Access Control" />
                  <FeatureItem icon="📱" text="Responsive Design" />
                  <FeatureItem icon="🌐" text="RESTful API" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mongodb' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                🍃 MongoDB Database
              </h2>
              
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #10b981',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  📊 Database Collections:
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <CollectionCard
                    name="Patients"
                    fields={['name', 'email', 'password', 'phone', 'age', 'gender', 'medicalHistory', 'bloodGroup']}
                    color="#10b981"
                  />
                  <CollectionCard
                    name="Doctors"
                    fields={['name', 'email', 'password', 'specialization', 'phone']}
                    color="#10b981"
                  />
                  <CollectionCard
                    name="Admins"
                    fields={['name', 'email', 'password', 'role', 'permissions']}
                    color="#10b981"
                  />
                  <CollectionCard
                    name="Appointments"
                    fields={['patient', 'doctor', 'date', 'time', 'reason', 'status']}
                    color="#10b981"
                  />
                  <CollectionCard
                    name="Payments"
                    fields={['patient', 'appointment', 'amount', 'status', 'stripePaymentIntentId']}
                    color="#10b981"
                  />
                </div>
              </div>

              <div style={{
                backgroundColor: '#ecfeff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #06b6d4'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🔗 MongoDB Connection:
                </h3>
                <div style={{
                  backgroundColor: '#1e293b',
                  color: '#10b981',
                  padding: '20px',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  overflowX: 'auto'
                }}>
                  <div>MongoDB Atlas Cloud Database</div>
                  <div>Connection String: mongodb+srv://...</div>
                  <div>Database: hospital_management</div>
                  <div>Collections: 5 (Patients, Doctors, Admins, Appointments, Payments)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'express' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                ⚡ Express.js Backend
              </h2>
              
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #000000',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  📁 Backend Structure:
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <FileStructure
                    name="server.js"
                    desc="Main server file - Express app setup"
                    files={['Port: 5000', 'CORS enabled', 'MongoDB connection', 'Routes setup']}
                  />
                  <FileStructure
                    name="models/"
                    desc="MongoDB Schemas"
                    files={['Patient.js', 'Doctor.js', 'Admin.js', 'Appointment.js', 'Payment.js']}
                  />
                  <FileStructure
                    name="controllers/"
                    desc="Business Logic"
                    files={['patientController.js', 'doctorController.js', 'adminController.js', 'appointmentController.js', 'authController.js', 'paymentController.js']}
                  />
                  <FileStructure
                    name="routes/"
                    desc="API Endpoints"
                    files={['/api/patients', '/api/doctors', '/api/admin', '/api/appointments', '/api/auth', '/api/payments']}
                  />
                  <FileStructure
                    name="middleware/"
                    desc="Authentication & Authorization"
                    files={['auth.js - JWT verification']}
                  />
                </div>
              </div>

              <div style={{
                backgroundColor: '#fef3c7',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #f59e0b'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🔌 API Endpoints:
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <EndpointCard method="POST" path="/api/auth/login" desc="User authentication" />
                  <EndpointCard method="POST" path="/api/patients/register" desc="Patient registration" />
                  <EndpointCard method="POST" path="/api/doctors/register" desc="Doctor registration" />
                  <EndpointCard method="GET" path="/api/patients" desc="Get all patients" />
                  <EndpointCard method="GET" path="/api/doctors" desc="Get all doctors" />
                  <EndpointCard method="POST" path="/api/appointments" desc="Create appointment" />
                  <EndpointCard method="GET" path="/api/appointments/my-appointments" desc="Get user appointments" />
                  <EndpointCard method="POST" path="/api/payments/create-payment-intent" desc="Stripe payment" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'react' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                ⚛️ React.js Frontend
              </h2>
              
              <div style={{
                backgroundColor: '#ecfeff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #61dafb',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  📁 Frontend Structure:
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <FileStructure
                    name="src/pages/"
                    desc="Page Components"
                    files={['Home.js', 'Login.js', 'Register.js', 'PatientDashboard.js', 'DoctorDashboard.js', 'AdminDashboard.js', 'Appointments.js', 'PatientProfile.js']}
                  />
                  <FileStructure
                    name="src/components/"
                    desc="Reusable Components"
                    files={['Sidebar.js', 'ProtectedRoute.js']}
                  />
                  <FileStructure
                    name="src/services/"
                    desc="API Services"
                    files={['api.js - Axios configuration']}
                  />
                  <FileStructure
                    name="src/AppRouter.js"
                    desc="Route Configuration"
                    files={['React Router setup', 'Protected routes', 'Navigation']}
                  />
                </div>
              </div>

              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #3b82f6'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  ⚛️ React Features:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <FeatureBox icon="🔄" title="Hooks" desc="useState, useEffect, useNavigate" />
                  <FeatureBox icon="🛣️" title="React Router" desc="Client-side routing" />
                  <FeatureBox icon="📡" title="Axios" desc="HTTP client for API calls" />
                  <FeatureBox icon="💾" title="LocalStorage" desc="Token & user data storage" />
                  <FeatureBox icon="🎨" title="Inline Styles" desc="Modern UI with React" />
                  <FeatureBox icon="🔒" title="Protected Routes" desc="Role-based access" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nodejs' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                🟢 Node.js Runtime
              </h2>
              
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #339933',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  📦 NPM Packages Used:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <PackageCard name="express" version="^5.1.0" desc="Web framework" />
                  <PackageCard name="mongoose" version="^8.16.5" desc="MongoDB ODM" />
                  <PackageCard name="bcryptjs" version="^3.0.2" desc="Password hashing" />
                  <PackageCard name="jsonwebtoken" version="^9.0.2" desc="JWT tokens" />
                  <PackageCard name="cors" version="^2.8.5" desc="Cross-origin requests" />
                  <PackageCard name="dotenv" version="^17.2.0" desc="Environment variables" />
                  <PackageCard name="stripe" version="latest" desc="Payment gateway" />
                  <PackageCard name="axios" version="^1.12.2" desc="HTTP client (frontend)" />
                </div>
              </div>

              <div style={{
                backgroundColor: '#ecfeff',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #06b6d4'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🚀 Server Configuration:
                </h3>
                <div style={{
                  backgroundColor: '#1e293b',
                  color: '#10b981',
                  padding: '20px',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                }}>
                  <div>Port: 5000</div>
                  <div>Environment: Development/Production</div>
                  <div>Database: MongoDB Atlas</div>
                  <div>Authentication: JWT</div>
                  <div>Payment: Stripe Integration</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1e293b' }}>
                📁 Complete Project Structure
              </h2>
              
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #64748b',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '2'
              }}>
                <div style={{ color: '#1e293b', fontWeight: '700', marginBottom: '15px' }}>Hospital-Management-System/</div>
                <div style={{ marginLeft: '20px' }}>
                  <div style={{ color: '#10b981' }}>📁 server/</div>
                  <div style={{ marginLeft: '40px' }}>
                    <div>📄 server.js</div>
                    <div>📄 package.json</div>
                    <div>📁 models/</div>
                    <div style={{ marginLeft: '20px' }}>
                      <div>📄 Patient.js</div>
                      <div>📄 Doctor.js</div>
                      <div>📄 Admin.js</div>
                      <div>📄 Appointment.js</div>
                      <div>📄 Payment.js</div>
                    </div>
                    <div>📁 controllers/</div>
                    <div style={{ marginLeft: '20px' }}>
                      <div>📄 patientController.js</div>
                      <div>📄 doctorController.js</div>
                      <div>📄 adminController.js</div>
                      <div>📄 appointmentController.js</div>
                      <div>📄 authController.js</div>
                      <div>📄 paymentController.js</div>
                    </div>
                    <div>📁 routes/</div>
                    <div style={{ marginLeft: '20px' }}>
                      <div>📄 patientRoutes.js</div>
                      <div>📄 doctorRoutes.js</div>
                      <div>📄 adminRoutes.js</div>
                      <div>📄 appointmentRoutes.js</div>
                      <div>📄 authRoutes.js</div>
                    </div>
                    <div>📁 middleware/</div>
                    <div style={{ marginLeft: '20px' }}>📄 auth.js</div>
                  </div>
                  <div style={{ color: '#61dafb', marginTop: '15px' }}>📁 client/</div>
                  <div style={{ marginLeft: '40px' }}>
                    <div>📄 package.json</div>
                    <div>📁 src/</div>
                    <div style={{ marginLeft: '20px' }}>
                      <div>📁 pages/</div>
                      <div style={{ marginLeft: '20px' }}>
                        <div>📄 Home.js</div>
                        <div>📄 Login.js</div>
                        <div>📄 Register.js</div>
                        <div>📄 PatientDashboard.js</div>
                        <div>📄 DoctorDashboard.js</div>
                        <div>📄 AdminDashboard.js</div>
                        <div>📄 Appointments.js</div>
                        <div>📄 PatientProfile.js</div>
                      </div>
                      <div>📁 components/</div>
                      <div style={{ marginLeft: '20px' }}>
                        <div>📄 Sidebar.js</div>
                        <div>📄 ProtectedRoute.js</div>
                      </div>
                      <div>📁 services/</div>
                      <div style={{ marginLeft: '20px' }}>📄 api.js</div>
                      <div>📄 App.js</div>
                      <div>📄 AppRouter.js</div>
                      <div>📄 index.js</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '30px',
          backgroundColor: '#f8fafc',
          borderTop: '2px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            type="button"
            onClick={() => {
              console.log('✅ Back button clicked');
              handleBackClick();
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#06b6d4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s',
              position: 'relative',
              zIndex: 1000
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0891b2';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#06b6d4';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ← Back to Home
          </button>
          <div style={{ color: '#64748b', fontSize: '14px' }}>
            ✅ Complete MERN Stack Implementation
          </div>
        </div>
      </div>
    </div>
  );
};

const TechCard = ({ name, desc, color, icon, details }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '16px',
    border: `2px solid ${color}`,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }}>
    <div style={{ fontSize: '40px', marginBottom: '15px' }}>{icon}</div>
    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: '#1e293b' }}>
      {name}
    </h3>
    <p style={{ color: '#64748b', marginBottom: '15px', fontSize: '14px' }}>{desc}</p>
    {details && (
      <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
        {details.map((item, idx) => (
          <div key={idx} style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>
            • {item}
          </div>
        ))}
      </div>
    )}
  </div>
);

const FeatureItem = ({ icon, text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '8px'
  }}>
    <span style={{ fontSize: '20px' }}>{icon}</span>
    <span style={{ fontWeight: '600', color: '#1e293b' }}>{text}</span>
  </div>
);

const CollectionCard = ({ name, fields, color }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    border: `2px solid ${color}`
  }}>
    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: '#1e293b' }}>
      {name}
    </h4>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {fields.map((field, idx) => (
        <span key={idx} style={{
          padding: '4px 10px',
          backgroundColor: '#f0fdf4',
          color: '#10b981',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {field}
        </span>
      ))}
    </div>
  </div>
);

const FileStructure = ({ name, desc, files }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  }}>
    <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '5px' }}>{name}</div>
    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>{desc}</div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {files.map((file, idx) => (
        <span key={idx} style={{
          padding: '4px 10px',
          backgroundColor: '#f8fafc',
          color: '#64748b',
          borderRadius: '6px',
          fontSize: '12px'
        }}>
          {file}
        </span>
      ))}
    </div>
  </div>
);

const EndpointCard = ({ method, path, desc }) => {
  const methodColor = {
    'GET': '#10b981',
    'POST': '#3b82f6',
    'PUT': '#f59e0b',
    'DELETE': '#ef4444'
  };
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    }}>
      <span style={{
        padding: '4px 12px',
        backgroundColor: methodColor[method] || '#64748b',
        color: 'white',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '700',
        minWidth: '60px',
        textAlign: 'center'
      }}>
        {method}
      </span>
      <code style={{
        flex: 1,
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#1e293b'
      }}>
        {path}
      </code>
      <span style={{ fontSize: '14px', color: '#64748b' }}>{desc}</span>
    </div>
  );
};

const FeatureBox = ({ icon, title, desc }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  }}>
    <div style={{ fontSize: '30px', marginBottom: '10px' }}>{icon}</div>
    <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '5px' }}>{title}</div>
    <div style={{ fontSize: '12px', color: '#64748b' }}>{desc}</div>
  </div>
);

const PackageCard = ({ name, version, desc }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <div style={{ fontWeight: '700', color: '#1e293b' }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#64748b' }}>{version}</div>
    </div>
    <div style={{ fontSize: '12px', color: '#64748b' }}>{desc}</div>
  </div>
);

export default MERNStackDetails;

