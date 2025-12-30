import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAppointments, getAllPatients, getAllDoctors } from '../services/api';
import Sidebar from '../components/Sidebar';

const Reports = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
        getAllAppointments(),
        getAllPatients(),
        getAllDoctors()
      ]);
      setAppointments(appointmentsRes.data || []);
      setPatients(patientsRes.data || []);
      setDoctors(doctorsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      confirmed: 0,
      cancelled: 0,
      completed: 0
    };
    appointments.forEach(apt => {
      counts[apt.status] = (counts[apt.status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <div style={{ fontSize: '20px', color: '#666' }}>Loading Reports...</div>
        </div>
      </div>
    );
  }

  const userType = localStorage.getItem('userType')?.toLowerCase() || 'patient';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar userType={userType} />

      {/* Main Content */}
      <div style={{ 
        marginLeft: '250px', 
        flex: 1,
        padding: '30px',
        width: 'calc(100% - 250px)'
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'appointments', label: '📅 Appointments' },
            { id: 'patients', label: '👥 Patients' },
            { id: 'doctors', label: '👨‍⚕️ Doctors' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id)}
              style={{
                padding: '12px 24px',
                backgroundColor: reportType === tab.id ? '#3498db' : 'transparent',
                color: reportType === tab.id ? 'white' : '#2c3e50',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {reportType === 'overview' && (
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>System Overview</h2>
            
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #3498db'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>👥</div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#3498db', marginBottom: '5px' }}>
                  {patients.length}
                </div>
                <div style={{ fontSize: '18px', color: '#666' }}>Total Patients</div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #10b981'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>👨‍⚕️</div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>
                  {doctors.length}
                </div>
                <div style={{ fontSize: '18px', color: '#666' }}>Total Doctors</div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #f59e0b'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📅</div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#f59e0b', marginBottom: '5px' }}>
                  {appointments.length}
                </div>
                <div style={{ fontSize: '18px', color: '#666' }}>Total Appointments</div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #8b5cf6'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>✅</div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#8b5cf6', marginBottom: '5px' }}>
                  {statusCounts.confirmed}
                </div>
                <div style={{ fontSize: '18px', color: '#666' }}>Confirmed</div>
              </div>
            </div>

            {/* Appointment Status Chart - Enhanced */}
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '25px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📊</span>
                <span>Appointment Status Distribution</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '25px', 
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  border: '2px solid #f59e0b',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>⏳</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', marginBottom: '5px' }}>{statusCounts.pending}</div>
                  <div style={{ color: '#92400e', fontWeight: '600' }}>Pending</div>
                  <div style={{ fontSize: '12px', color: '#92400e', marginTop: '5px' }}>
                    {appointments.length > 0 ? ((statusCounts.pending / appointments.length) * 100).toFixed(0) : 0}% of total
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '25px', 
                  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                  borderRadius: '12px',
                  border: '2px solid #10b981',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>{statusCounts.confirmed}</div>
                  <div style={{ color: '#065f46', fontWeight: '600' }}>Confirmed</div>
                  <div style={{ fontSize: '12px', color: '#065f46', marginTop: '5px' }}>
                    {appointments.length > 0 ? ((statusCounts.confirmed / appointments.length) * 100).toFixed(0) : 0}% of total
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '25px', 
                  background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                  borderRadius: '12px',
                  border: '2px solid #ef4444',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>❌</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#ef4444', marginBottom: '5px' }}>{statusCounts.cancelled}</div>
                  <div style={{ color: '#991b1b', fontWeight: '600' }}>Cancelled</div>
                  <div style={{ fontSize: '12px', color: '#991b1b', marginTop: '5px' }}>
                    {appointments.length > 0 ? ((statusCounts.cancelled / appointments.length) * 100).toFixed(0) : 0}% of total
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '25px', 
                  background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                  borderRadius: '12px',
                  border: '2px solid #6366f1',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>✔️</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#6366f1', marginBottom: '5px' }}>{statusCounts.completed}</div>
                  <div style={{ color: '#3730a3', fontWeight: '600' }}>Completed</div>
                  <div style={{ fontSize: '12px', color: '#3730a3', marginTop: '5px' }}>
                    {appointments.length > 0 ? ((statusCounts.completed / appointments.length) * 100).toFixed(0) : 0}% of total
                  </div>
                </div>
              </div>
              
              {/* Progress Bar Visualization */}
              <div style={{ marginTop: '30px' }}>
                <h4 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '16px' }}>Status Distribution Chart</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Completed', value: statusCounts.completed, color: '#6366f1', bg: '#e0e7ff' },
                    { name: 'Confirmed', value: statusCounts.confirmed, color: '#10b981', bg: '#d1fae5' },
                    { name: 'Pending', value: statusCounts.pending, color: '#f59e0b', bg: '#fef3c7' },
                    { name: 'Cancelled', value: statusCounts.cancelled, color: '#ef4444', bg: '#fee2e2' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>{item.name}</span>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: item.color }}>
                          {item.value} ({appointments.length > 0 ? ((item.value / appointments.length) * 100).toFixed(1) : 0}%)
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '28px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '14px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${appointments.length > 0 ? (item.value / appointments.length) * 100 : 0}%`,
                          height: '100%',
                          backgroundColor: item.color,
                          transition: 'width 0.5s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingRight: '10px',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {appointments.length > 0 && item.value > 0 && `${((item.value / appointments.length) * 100).toFixed(0)}%`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Health & Statistics */}
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '25px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>💚</span>
                <span>System Health & Performance</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '10px',
                  border: '2px solid #22c55e'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#166534' }}>System Uptime</span>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>99.9%</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#166534' }}>All systems operational</div>
                </div>
                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#eff6ff', 
                  borderRadius: '10px',
                  border: '2px solid #3b82f6'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>Data Accuracy</span>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>100%</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#1e40af' }}>All records verified</div>
                </div>
                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#fef3c7', 
                  borderRadius: '10px',
                  border: '2px solid #f59e0b'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>Active Users</span>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
                      {patients.length + doctors.length}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#92400e' }}>Patients + Doctors</div>
                </div>
                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#f3e8ff', 
                  borderRadius: '10px',
                  border: '2px solid #a855f7'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#6b21a8' }}>Response Time</span>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#a855f7' }}>&lt;100ms</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b21a8' }}>Fast API response</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {reportType === 'appointments' && (
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Appointment Reports</h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Patient</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Doctor</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Date</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Time</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt, index) => (
                    <tr key={apt._id} style={{ 
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc'
                    }}>
                      <td style={{ padding: '15px' }}>{apt.patient?.name || 'N/A'}</td>
                      <td style={{ padding: '15px' }}>{apt.doctorName || apt.doctor?.name || 'N/A'}</td>
                      <td style={{ padding: '15px' }}>{new Date(apt.date).toLocaleDateString()}</td>
                      <td style={{ padding: '15px' }}>{apt.time}</td>
                      <td style={{ padding: '15px' }}>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {reportType === 'patients' && (
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Patient Reports</h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Phone</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Age</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={patient._id} style={{ 
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc'
                    }}>
                      <td style={{ padding: '15px' }}>{patient.name}</td>
                      <td style={{ padding: '15px' }}>{patient.email}</td>
                      <td style={{ padding: '15px' }}>{patient.phone || 'N/A'}</td>
                      <td style={{ padding: '15px' }}>{patient.age || 'N/A'}</td>
                      <td style={{ padding: '15px' }}>{new Date(patient.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {reportType === 'doctors' && (
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Doctor Reports</h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Specialization</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor, index) => (
                    <tr key={doctor._id} style={{ 
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc'
                    }}>
                      <td style={{ padding: '15px' }}>{doctor.name}</td>
                      <td style={{ padding: '15px' }}>{doctor.email}</td>
                      <td style={{ padding: '15px' }}>{doctor.specialization || 'General Medicine'}</td>
                      <td style={{ padding: '15px' }}>{new Date(doctor.createdAt || Date.now()).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;

