import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, getMyAppointments, getAllDoctors } from '../services/api';
import Sidebar from '../components/Sidebar';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchPatientData();
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctors();
      console.log('Doctors fetched for dashboard:', res.data);
      setDoctors(res.data || []);
      if (!res.data || res.data.length === 0) {
        // Add demo doctors if none exist
        setDoctors([
          { _id: 'demo1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', email: 'sarah.johnson@hospital.com' },
          { _id: 'demo2', name: 'Dr. Michael Brown', specialization: 'Pediatrics', email: 'michael.brown@hospital.com' },
          { _id: 'demo3', name: 'Dr. Emily Davis', specialization: 'General Medicine', email: 'emily.davis@hospital.com' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // Add demo doctors on error
      setDoctors([
        { _id: 'demo1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', email: 'sarah.johnson@hospital.com' },
        { _id: 'demo2', name: 'Dr. Michael Brown', specialization: 'Pediatrics', email: 'michael.brown@hospital.com' },
        { _id: 'demo3', name: 'Dr. Emily Davis', specialization: 'General Medicine', email: 'emily.davis@hospital.com' }
      ]);
    }
  };

  const fetchPatientData = async () => {
    try {
      const res = await getMyProfile();
      setPatient(res.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await getMyAppointments();
      setAppointments(res.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar userType="patient" />

      {/* Main Content */}
      <div style={{ 
        marginLeft: '250px', 
        flex: 1,
        padding: '30px',
        width: 'calc(100% - 250px)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <div>
            <h1 style={{ color: '#1e293b', margin: '0 0 5px 0', fontSize: '28px', fontWeight: '700' }}>
              {loading ? 'Patient Dashboard' : `Hello, ${patient?.name || 'Patient'}!`}
            </h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '16px' }}>
              Manage your appointments, profile, and medical records
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input
                type="text"
                placeholder="🔍 Search appointments, doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px 40px 10px 15px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  width: '300px',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#64748b'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            <div style={{
              padding: '12px 24px',
              backgroundColor: '#10b981',
              color: 'white',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              👤 Patient Portal
            </div>
          </div>
        </div>

        {/* Welcome & Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Welcome Card */}
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            padding: '30px',
            borderRadius: '16px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px'
            }}>
              👤
            </div>
            <div>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: '700' }}>
                {loading ? 'Welcome!' : `Hello, ${patient?.name || 'Patient'}!`}
              </h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                Manage your health records, appointments, and medical history in one place.
              </p>
            </div>
          </div>

          {/* Total Appointments Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #3b82f6',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px', fontWeight: '600' }}>
              Total Appointments
            </div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#3b82f6' }}>
              {appointments.length}
            </div>
          </div>

          {/* Upcoming Appointments Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #f59e0b',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px', fontWeight: '600' }}>
              Upcoming
            </div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#f59e0b' }}>
              {appointments.filter(a => new Date(a.date) >= new Date() && a.status !== 'cancelled' && a.status !== 'completed').length}
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderTop: '3px solid #10b981'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>✅</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>
              {appointments.filter(a => a.status === 'confirmed').length}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Confirmed</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderTop: '3px solid #f59e0b'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '5px' }}>
              {appointments.filter(a => a.status === 'pending').length}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Pending</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderTop: '3px solid #6366f1'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>✔️</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#6366f1', marginBottom: '5px' }}>
              {appointments.filter(a => a.status === 'completed').length}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Completed</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderTop: '3px solid #8b5cf6'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📊</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6', marginBottom: '5px' }}>
              {appointments.filter(a => new Date(a.date) < new Date()).length}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Past Visits</div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏳</div>
            <h3>Loading dashboard...</h3>
          </div>
        ) : (
          <>
            {/* Patient Info Card */}
            {patient && (
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '30px'
              }}>
                <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '20px', fontSize: '20px', fontWeight: '700' }}>Your Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Name</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{patient.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Email</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{patient.email}</div>
                  </div>
                  {patient.phone && (
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Phone</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{patient.phone}</div>
                    </div>
                  )}
                  {patient.age && (
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Age</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{patient.age} years</div>
                    </div>
                  )}
                  {patient.gender && (
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Gender</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{patient.gender}</div>
                    </div>
                  )}
                  {patient.bloodGroup && (
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Blood Group</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{patient.bloodGroup}</div>
                    </div>
                  )}
                </div>
                {patient.medicalHistory && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Medical History</div>
                    <p style={{ margin: '5px 0', color: '#1e293b', fontSize: '14px' }}>{patient.medicalHistory}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Quick Actions Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '25px', fontSize: '22px', fontWeight: '700' }}>
            ⚡ Quick Actions
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {/* Book Appointment Card */}
            <div 
              onClick={() => navigate('/appointments')}
              style={{
                backgroundColor: '#f0f9ff',
                padding: '25px',
                borderRadius: '12px',
                border: '2px solid #3498db',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(52, 152, 219, 0.2)';
                e.currentTarget.style.backgroundColor = '#e0f2fe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f0f9ff';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginRight: '15px'
                }}>
                  📅
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px', fontWeight: '700' }}>Book Appointment</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '12px' }}>Schedule now</p>
                </div>
              </div>
              <p style={{ color: '#64748b', marginBottom: '15px', fontSize: '14px' }}>
                Schedule an appointment with your preferred doctor
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#3498db',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                <span>Book Now</span>
                <span>→</span>
              </div>
            </div>

            {/* My Appointments Card */}
            <div 
              onClick={() => navigate('/appointments')}
              style={{
                backgroundColor: '#fff7ed',
                padding: '25px',
                borderRadius: '12px',
                border: '2px solid #e67e22',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(230, 126, 34, 0.2)';
                e.currentTarget.style.backgroundColor = '#ffedd5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#fff7ed';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{
                  backgroundColor: '#e67e22',
                  color: 'white',
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginRight: '15px'
                }}>
                  📋
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px', fontWeight: '700' }}>My Appointments</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '12px' }}>{appointments.length} total</p>
                </div>
              </div>
              <p style={{ color: '#64748b', marginBottom: '15px', fontSize: '14px' }}>
                View your upcoming and past appointments
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#e67e22',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                <span>View All</span>
                <span>→</span>
              </div>
            </div>

            {/* My Profile Card */}
            <div 
              onClick={() => navigate('/patient-profile')}
              style={{
                backgroundColor: '#f0fdf4',
                padding: '25px',
                borderRadius: '12px',
                border: '2px solid #27ae60',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(39, 174, 96, 0.2)';
                e.currentTarget.style.backgroundColor = '#dcfce7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f0fdf4';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{
                  backgroundColor: '#27ae60',
                  color: 'white',
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginRight: '15px'
                }}>
                  👤
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px', fontWeight: '700' }}>My Profile</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '12px' }}>Edit info</p>
                </div>
              </div>
              <p style={{ color: '#64748b', marginBottom: '15px', fontSize: '14px' }}>
                Update your personal information and medical history
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#27ae60',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                <span>Edit Profile</span>
                <span>→</span>
              </div>
            </div>

            {/* Medical Records Card */}
            <div 
              onClick={() => navigate('/reports')}
              style={{
                backgroundColor: '#fef3c7',
                padding: '25px',
                borderRadius: '12px',
                border: '2px solid #f59e0b',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(245, 158, 11, 0.2)';
                e.currentTarget.style.backgroundColor = '#fde68a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#fef3c7';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginRight: '15px'
                }}>
                  🏥
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px', fontWeight: '700' }}>Medical Records</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '12px' }}>View history</p>
                </div>
              </div>
              <p style={{ color: '#64748b', marginBottom: '15px', fontSize: '14px' }}>
                Access your medical history, prescriptions, and test results
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#f59e0b',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                <span>View Records</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>

            {/* Statistics Chart */}
            {!loading && appointments.length > 0 && (
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '30px'
              }}>
                <h3 style={{ margin: '0 0 25px 0', color: '#1e293b', fontSize: '22px', fontWeight: '700' }}>
                  📊 Appointment Statistics
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px'
                }}>
                  {[
                    { label: 'Total', count: appointments.length, color: '#3b82f6', icon: '📅' },
                    { label: 'Pending', count: appointments.filter(a => a.status === 'pending').length, color: '#f59e0b', icon: '⏳' },
                    { label: 'Confirmed', count: appointments.filter(a => a.status === 'confirmed').length, color: '#10b981', icon: '✅' },
                    { label: 'Completed', count: appointments.filter(a => a.status === 'completed').length, color: '#6366f1', icon: '🎉' }
                  ].map((stat, index) => {
                    const percentage = appointments.length > 0 ? (stat.count / appointments.length) * 100 : 0;
                    return (
                      <div key={index} style={{
                        padding: '20px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        borderLeft: `4px solid ${stat.color}`
                      }}>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>{stat.icon}</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: stat.color, marginBottom: '5px' }}>
                          {stat.count}
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px' }}>{stat.label}</div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: stat.color,
                            borderRadius: '3px',
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Available Doctors Section */}
            {!loading && doctors.length > 0 && (
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '25px',
                  paddingBottom: '20px',
                  borderBottom: '2px solid #e5e7eb'
                }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#1e293b', fontSize: '22px', fontWeight: '700' }}>
                      👨‍⚕️ Available Doctors
                    </h3>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                      {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} available for appointments
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/appointments')}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#2563eb';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#3b82f6';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    View All & Book
                  </button>
                </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {doctors.slice(0, 6).map(doctor => (
                <div
                  key={doctor._id}
                  onClick={() => navigate('/appointments')}
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.backgroundColor = '#f0f9ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: 'white',
                      marginRight: '12px'
                    }}>
                      👨‍⚕️
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#1e293b', fontSize: '16px', fontWeight: '700' }}>
                        {doctor.name}
                      </h4>
                    </div>
                  </div>
                  <div style={{
                    padding: '10px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px', fontWeight: '600' }}>
                      SPECIALIZATION
                    </div>
                    <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                      {doctor.specialization || 'General Medicine'}
                    </div>
                  </div>
                  <div style={{
                    marginTop: '12px',
                    padding: '8px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Click to Book Appointment →
                  </div>
                </div>
              ))}
            </div>
            {doctors.length > 6 && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => navigate('/appointments')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  View All {doctors.length} Doctors →
                </button>
              </div>
            )}
          </div>
        )}

            {/* Activity Timeline */}
            {!loading && (
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '30px'
              }}>
                <h3 style={{ color: '#1e293b', margin: '0 0 25px 0', fontSize: '22px', fontWeight: '700' }}>
                  📈 Recent Activity
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {appointments.slice(0, 5).map((apt, index) => (
                    <div key={apt._id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '15px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      borderLeft: '4px solid #3b82f6',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        {index + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '5px' }}>
                          Appointment with {apt.doctorName || apt.doctor?.name || 'Doctor'}
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>
                          📅 {new Date(apt.date).toLocaleDateString()} at {apt.time} • Status: 
                          <span style={{
                            marginLeft: '5px',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                            backgroundColor:
                              apt.status === 'confirmed' ? '#d1fae5' :
                              apt.status === 'pending' ? '#fef3c7' :
                              apt.status === 'cancelled' ? '#fee2e2' : '#e0e7ff',
                            color:
                              apt.status === 'confirmed' ? '#10b981' :
                              apt.status === 'pending' ? '#f59e0b' :
                              apt.status === 'cancelled' ? '#ef4444' : '#6366f1'
                          }}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {appointments.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      <div style={{ fontSize: '48px', marginBottom: '10px' }}>📋</div>
                      <p>No appointments yet. Book your first appointment!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upcoming Appointments */}
            {!loading && appointments.length > 0 && (
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: '#1e293b', margin: 0, fontSize: '20px', fontWeight: '700' }}>Upcoming Appointments</h3>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* Filter Buttons */}
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => navigate('/appointments')}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '15px'
                }}>
                  {appointments
                    .filter(apt => {
                      const matchesDate = new Date(apt.date) >= new Date();
                      const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
                      const matchesSearch = !searchTerm || 
                        (apt.doctorName || apt.doctor?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (apt.doctor?.specialization || '').toLowerCase().includes(searchTerm.toLowerCase());
                      return matchesDate && apt.status !== 'cancelled' && apt.status !== 'completed' && matchesStatus && matchesSearch;
                    })
                    .slice(0, 4)
                    .map(apt => (
                  <div key={apt._id} style={{
                    border: '1px solid #e0e0e0',
                    padding: '15px',
                    borderRadius: '12px',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <h4 style={{ margin: '0 0 10px 0', color: '#1e293b', fontSize: '16px', fontWeight: '600' }}>
                      {apt.doctorName || apt.doctor?.name || 'Unknown Doctor'}
                    </h4>
                    <p style={{ margin: '5px 0', color: '#64748b', fontSize: '14px' }}>
                      {apt.doctor?.specialization || 'General Medicine'}
                    </p>
                    <p style={{ margin: '5px 0', color: '#64748b', fontSize: '14px' }}>
                      📅 {new Date(apt.date).toLocaleDateString()} at {apt.time}
                    </p>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '10px',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      backgroundColor: 
                        apt.status === 'confirmed' ? '#d1fae5' :
                        apt.status === 'pending' ? '#fef3c7' : '#e0e7ff',
                      color:
                        apt.status === 'confirmed' ? '#10b981' :
                        apt.status === 'pending' ? '#f59e0b' : '#6366f1'
                    }}>
                      {apt.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PatientDashboard;
