import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctorAppointments, getAllPatients } from '../services/api';
import Sidebar from '../components/Sidebar';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [appointmentsRes, patientsRes] = await Promise.all([
        getDoctorAppointments(),
        getAllPatients()
      ]);
      setAppointments(appointmentsRes.data || []);
      setPatients(patientsRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar userType="doctor" />

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
              Doctor Dashboard
            </h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '16px' }}>
              Manage your appointments, patients, and medical records
            </p>
          </div>
          <div style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            👨‍⚕️ Doctor Portal
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
            backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '30px',
            borderRadius: '16px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
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
              👨‍⚕️
            </div>
            <div>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: '700' }}>
                Hello, Doctor!
              </h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                Welcome to your dashboard. Manage appointments and patient records efficiently.
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

          {/* Registered Patients Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #ef4444',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px', fontWeight: '600' }}>
              Total Patients
            </div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#ef4444' }}>
              {patients.length}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          {/* Patient Management Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#3498db',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                👥
              </div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Patient Management</h3>
            </div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              View and manage patient records, medical history, and treatment plans
            </p>
            <button 
              onClick={() => navigate('/reports')}
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                width: '100%',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2980b9';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#3498db';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Patients
            </button>
          </div>

          {/* Appointment Management Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#e67e22',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                📅
              </div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Appointments</h3>
            </div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Manage your schedule, view upcoming appointments, and patient consultations
            </p>
            <button 
              onClick={() => navigate('/doctor-appointments')}
              style={{
                backgroundColor: '#e67e22',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                width: '100%',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d35400';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e67e22';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Appointments
            </button>
          </div>

          {/* Medical Records Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#27ae60',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                📋
              </div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Medical Records</h3>
            </div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Access and update patient medical records, prescriptions, and treatment notes
            </p>
            <button 
              onClick={() => navigate('/reports')}
              style={{
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                width: '100%',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#229954';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#27ae60';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Records
            </button>
          </div>

          {/* Analytics Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#9b59b6',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                📊
              </div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Analytics & Reports</h3>
            </div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Generate reports and analyze hospital performance metrics
            </p>
            <button 
              onClick={() => navigate('/reports')}
              style={{
                backgroundColor: '#9b59b6',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                width: '100%',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#8e44ad';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#9b59b6';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Doctor's Appointments Overview */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>My Appointments Overview</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{appointments.length}</h4>
              <p style={{ margin: 0, color: '#666' }}>Total Appointments</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#f59e0b' }}>
                {appointments.filter(a => a.status === 'pending').length}
              </h4>
              <p style={{ margin: 0, color: '#666' }}>Pending</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#d1fae5', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>
                {appointments.filter(a => a.status === 'confirmed').length}
              </h4>
              <p style={{ margin: 0, color: '#666' }}>Confirmed</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e0e7ff', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#6366f1' }}>
                {appointments.filter(a => a.status === 'completed').length}
              </h4>
              <p style={{ margin: 0, color: '#666' }}>Completed</p>
            </div>
          </div>
        </div>

        {/* Recent Appointments */}
        {!loading && appointments.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '20px'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Recent Appointments</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              {appointments.slice(0, 5).map(apt => (
                <div key={apt._id} style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: '#f9fafb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '5px' }}>
                        {apt.patient?.name || 'Unknown Patient'}
                      </div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>
                        📅 {new Date(apt.date).toLocaleDateString()} at {apt.time}
                      </div>
                      {apt.reason && (
                        <div style={{ fontSize: '14px', color: '#64748b', marginTop: '5px' }}>
                          Reason: {apt.reason}
                        </div>
                      )}
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
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
              ))}
            </div>
            {appointments.length > 5 && (
              <button
                onClick={() => navigate('/doctor-appointments')}
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                View All Appointments ({appointments.length})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
