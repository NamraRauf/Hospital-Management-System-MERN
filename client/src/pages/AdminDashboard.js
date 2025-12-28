import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAdminDashboardStats, 
  getAdminAllPatients, 
  getAdminAllDoctors,
  getAdminAllAdmins,
  deleteAdminPatient,
  deleteAdminDoctor,
  getAllAppointments,
  getAdminProfile
} from '../services/api';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, patientsRes, doctorsRes, adminsRes, appointmentsRes, adminRes] = await Promise.all([
        getAdminDashboardStats(),
        getAdminAllPatients(),
        getAdminAllDoctors(),
        getAdminAllAdmins().catch((err) => {
          console.error('❌ Error fetching admins:', err);
          console.error('Error response:', err.response);
          console.error('Error status:', err.response?.status);
          console.error('Error data:', err.response?.data);
          console.error('Error message:', err.message);
          console.error('Full error object:', JSON.stringify(err, null, 2));
          
          // Show error in UI if it's an auth error
          if (err.response?.status === 401 || err.response?.status === 403) {
            console.warn('⚠️ Authentication error - token might be invalid or userType mismatch');
            console.warn('Current userType:', localStorage.getItem('userType'));
          }
          
          // Return empty array but log the error
          return { data: [] };
        }),
        getAllAppointments().catch(() => ({ data: [] })),
        getAdminProfile().catch(() => ({ data: null }))
      ]);
      
      setStats(statsRes.data.stats);
      setPatients(patientsRes.data || []);
      setDoctors(doctorsRes.data || []);
      
      // Debug admins response
      console.log('📊 Admins API Response (Full):', adminsRes);
      console.log('📊 Admins Response Type:', typeof adminsRes);
      console.log('📊 Admins Response Data:', adminsRes.data);
      console.log('📊 Admins Data Type:', typeof adminsRes.data);
      console.log('📊 Admins Array Length:', adminsRes.data?.length || 0);
      console.log('📊 Is Array?', Array.isArray(adminsRes.data));
      
      // Backend returns array directly: res.json(admins) = [admin1, admin2]
      // Axios wraps it: response.data = [admin1, admin2]
      let adminsArray = [];
      if (Array.isArray(adminsRes.data)) {
        adminsArray = adminsRes.data;
      } else if (adminsRes.data && Array.isArray(adminsRes.data.data)) {
        adminsArray = adminsRes.data.data;
      } else if (adminsRes && Array.isArray(adminsRes)) {
        adminsArray = adminsRes;
      }
      
      console.log('📊 Final Admins Array:', adminsArray);
      console.log('📊 Final Admins Count:', adminsArray.length);
      setAdmins(adminsArray);
      setAppointments(appointmentsRes.data || []);
      setAdminInfo(adminRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      alert('Error loading dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deleteAdminPatient(id);
        setPatients(patients.filter(p => p._id !== id));
        alert('Patient deleted successfully');
      } catch (error) {
        alert('Error deleting patient');
      }
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteAdminDoctor(id);
        setDoctors(doctors.filter(d => d._id !== id));
        alert('Doctor deleted successfully');
      } catch (error) {
        alert('Error deleting doctor');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  // Filter functions
  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdmins = admins.filter(admin =>
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = searchTerm === '' ||
                          apt.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <div style={{ fontSize: '20px', color: '#666' }}>Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar userType="admin" />

      {/* Main Content */}
      <div style={{ 
        marginLeft: '250px', 
        flex: 1,
        width: 'calc(100% - 250px)',
        backgroundColor: '#f5f5f5'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px 40px',
          borderBottom: '2px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{ 
              color: '#1e293b', 
              margin: '0 0 5px 0', 
              fontSize: '28px', 
              fontWeight: '700' 
            }}>
              {adminInfo ? `Welcome, ${adminInfo.name}!` : 'Admin Dashboard'}
            </h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '16px' }}>
              Manage your hospital system efficiently
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Search Bar */}
            {(activeTab === 'patients' || activeTab === 'doctors' || activeTab === 'appointments') && (
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  placeholder={`🔍 Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '10px 40px 10px 15px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    width: '250px',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
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
            )}
            <div style={{
              padding: '12px 24px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              👑 Admin Panel
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '2px solid #e2e8f0',
          padding: '0 40px'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'patients', label: '👥 Patients', icon: '👥' },
              { id: 'doctors', label: '👨‍⚕️ Doctors', icon: '👨‍⚕️' },
              { id: 'admins', label: '👑 Admins', icon: '👑' },
              { id: 'appointments', label: '📅 Appointments', icon: '📅' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '15px 30px',
                  backgroundColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#64748b',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid #2563eb' : '3px solid transparent',
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
        </div>

        {/* Content */}
        <div style={{ padding: '40px' }}>
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <StatCard
                title="Total Patients"
                value={stats?.totalPatients || patients.length || 0}
                icon="👥"
                color="#3b82f6"
                change={`+${stats?.recentPatients || 0} this week`}
              />
              <StatCard
                title="Total Doctors"
                value={stats?.totalDoctors || doctors.length || 0}
                icon="👨‍⚕️"
                color="#10b981"
                change={`+${stats?.recentDoctors || 0} this week`}
              />
              <StatCard
                title="Total Appointments"
                value={appointments.length}
                icon="📅"
                color="#f59e0b"
                change={`${appointments.filter(a => a.status === 'pending').length} pending`}
              />
              <StatCard
                title="Total Admins"
                value={stats?.totalAdmins || 1}
                icon="👑"
                color="#8b5cf6"
                change="System Administrators"
              />
            </div>

            {/* Admin Profile Card */}
            {adminInfo && (
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '30px',
                borderLeft: '4px solid #8b5cf6'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  👑 Your Admin Profile
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Name</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{adminInfo.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Email</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{adminInfo.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Role</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#8b5cf6' }}>
                      {adminInfo.role || 'Admin'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Registered</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                      {new Date(adminInfo.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <QuickActionCard
                title="Manage Patients"
                description="View, edit, and delete patient records"
                icon="👥"
                color="#3b82f6"
                onClick={() => setActiveTab('patients')}
              />
              <QuickActionCard
                title="Manage Doctors"
                description="View, edit, and delete doctor profiles"
                icon="👨‍⚕️"
                color="#10b981"
                onClick={() => setActiveTab('doctors')}
              />
              <QuickActionCard
                title="Manage Admins"
                description="View all system administrators"
                icon="👑"
                color="#8b5cf6"
                onClick={() => setActiveTab('admins')}
              />
              <QuickActionCard
                title="View Appointments"
                description="Monitor all appointments and their status"
                icon="📅"
                color="#f59e0b"
                onClick={() => setActiveTab('appointments')}
              />
              <QuickActionCard
                title="View Reports"
                description="Access comprehensive system reports"
                icon="📊"
                color="#ef4444"
                onClick={() => navigate('/reports')}
              />
            </div>

            {/* Statistics Charts */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {/* Appointment Status Chart */}
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  📊 Appointment Status
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Pending', count: appointments.filter(a => a.status === 'pending').length, color: '#f59e0b' },
                    { label: 'Confirmed', count: appointments.filter(a => a.status === 'confirmed').length, color: '#10b981' },
                    { label: 'Completed', count: appointments.filter(a => a.status === 'completed').length, color: '#6366f1' },
                    { label: 'Cancelled', count: appointments.filter(a => a.status === 'cancelled').length, color: '#ef4444' }
                  ].map((item, index) => {
                    const total = appointments.length || 1;
                    const percentage = (item.count / total) * 100;
                    return (
                      <div key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{item.label}</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: item.color }}>{item.count}</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: item.color,
                            borderRadius: '4px',
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Health */}
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                  🏥 System Health
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{
                    padding: '15px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '10px',
                    borderLeft: '4px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>Database</span>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>✅ Connected</span>
                    </div>
                  </div>
                  <div style={{
                    padding: '15px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '10px',
                    borderLeft: '4px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>API Server</span>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>✅ Running</span>
                    </div>
                  </div>
                  <div style={{
                    padding: '15px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '10px',
                    borderLeft: '4px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>Frontend</span>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>✅ Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                📈 Recent Activity
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e293b' }}>
                    Recent Patients ({patients.slice(0, 5).length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {patients.slice(0, 5).map((patient, index) => (
                      <div key={patient._id} style={{
                        padding: '12px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        borderLeft: '3px solid #3b82f6',
                        transition: 'all 0.3s',
                        cursor: 'pointer'
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: '#3b82f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>
                            {index + 1}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1e293b' }}>{patient.name}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{patient.email}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e293b' }}>
                    Recent Doctors ({doctors.slice(0, 5).length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {doctors.slice(0, 5).map((doctor, index) => (
                      <div key={doctor._id} style={{
                        padding: '12px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        borderLeft: '3px solid #10b981',
                        transition: 'all 0.3s',
                        cursor: 'pointer'
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: '#10b981',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>
                            {index + 1}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1e293b' }}>{doctor.name}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>
                              {doctor.specialization || 'General Medicine'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MERN Stack Info */}
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                🚀 MERN Stack Architecture
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                <TechCard name="MongoDB" desc="NoSQL Database" color="#10b981" />
                <TechCard name="Express.js" desc="Backend Framework" color="#000000" />
                <TechCard name="React.js" desc="Frontend Library" color="#61dafb" />
                <TechCard name="Node.js" desc="Runtime Environment" color="#339933" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                👥 Patient Management
              </h2>
              <div style={{ 
                fontSize: '16px', 
                color: '#64748b',
                padding: '10px 20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Total: <strong style={{ color: '#3b82f6' }}>{patients.length}</strong> patients
              </div>
            </div>
            
            {patients.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                padding: '60px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>👥</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>
                  No Patients Yet
                </h3>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Patients will appear here once they register.
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Email</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Phone</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Age</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Gender</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Registered</th>
                      <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients
                      .filter(p => {
                        if (!searchTerm) return true;
                        const search = searchTerm.toLowerCase();
                        return (
                          p.name?.toLowerCase().includes(search) ||
                          p.email?.toLowerCase().includes(search) ||
                          p.phone?.toLowerCase().includes(search)
                        );
                      })
                      .map((patient, index) => (
                      <tr key={patient._id} style={{ 
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8fafc';
                      }}
                      >
                        <td style={{ padding: '15px', color: '#1e293b', fontWeight: '600' }}>{patient.name}</td>
                        <td style={{ padding: '15px', color: '#64748b' }}>{patient.email}</td>
                        <td style={{ padding: '15px', color: '#64748b' }}>{patient.phone || 'N/A'}</td>
                        <td style={{ padding: '15px', color: '#64748b' }}>{patient.age || 'N/A'}</td>
                        <td style={{ padding: '15px', color: '#64748b' }}>{patient.gender || 'N/A'}</td>
                        <td style={{ padding: '15px', color: '#64748b' }}>
                          {new Date(patient.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleDeletePatient(patient._id)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '600',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#dc2626';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#ef4444';
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'doctors' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                👨‍⚕️ Doctor Management
              </h2>
              <div style={{ 
                fontSize: '16px', 
                color: '#64748b',
                padding: '10px 20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Total: <strong style={{ color: '#10b981' }}>{doctors.length}</strong> doctors
              </div>
            </div>
            
            {doctors.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                padding: '60px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>👨‍⚕️</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>
                  No Doctors Yet
                </h3>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Doctors will appear here once they register.
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Email</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Specialization</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Phone</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Registered</th>
                      <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors
                      .filter(d => {
                        if (!searchTerm) return true;
                        const search = searchTerm.toLowerCase();
                        return (
                          d.name?.toLowerCase().includes(search) ||
                          d.email?.toLowerCase().includes(search) ||
                          d.specialization?.toLowerCase().includes(search)
                        );
                      })
                      .map((doctor, index) => (
                      <tr key={doctor._id} style={{ 
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8fafc';
                      }}
                      >
                        <td style={{ padding: '15px', color: '#1e293b', fontWeight: '600' }}>{doctor.name}</td>
                        <td style={{ padding: '15px', color: '#64748b' }}>{doctor.email}</td>
                        <td style={{ padding: '15px', color: '#64748b' }}>
                          {doctor.specialization || 'General Medicine'}
                        </td>
                        <td style={{ padding: '15px', color: '#64748b' }}>{doctor.phone || 'N/A'}</td>
                        <td style={{ padding: '15px', color: '#64748b' }}>
                          {new Date(doctor.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleDeleteDoctor(doctor._id)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '600',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#dc2626';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#ef4444';
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admins' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                👑 Admin Management
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '10px 20px'
              }}>
                <button
                  onClick={fetchDashboardData}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                  title="Refresh admins list"
                >
                  🔄 Refresh
                </button>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '8px 30px 8px 10px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8'
                  }}>🔍</span>
                </div>
                <div style={{ fontSize: '16px', color: '#64748b' }}>
                  Total: <strong style={{ color: '#8b5cf6' }}>{filteredAdmins.length}</strong> admins
                  {admins.length !== filteredAdmins.length && (
                    <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '5px' }}>
                      (of {admins.length} total)
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {filteredAdmins.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                padding: '60px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>👑</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>
                  {admins.length === 0 ? 'No Admins Found' : 'No Admins Match Search'}
                </h3>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  {admins.length === 0 
                    ? 'Admin accounts will appear here once they are registered.' 
                    : 'Try a different search term.'}
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>#</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Email</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Role</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Registered</th>
                      <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((admin, index) => (
                      <tr key={admin._id} style={{ 
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8fafc';
                      }}
                      >
                        <td style={{ padding: '15px', color: '#64748b', fontWeight: '600' }}>
                          {index + 1}
                        </td>
                        <td style={{ padding: '15px', color: '#1e293b', fontWeight: '600' }}>
                          {admin._id === adminInfo?._id || admin.email === adminInfo?.email ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '18px' }}>👑</span>
                              {admin.name} <span style={{ 
                                fontSize: '12px', 
                                color: '#8b5cf6',
                                backgroundColor: '#f3e8ff',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontWeight: '700'
                              }}>(You)</span>
                            </span>
                          ) : (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '16px' }}>👤</span>
                              {admin.name}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '15px', color: '#64748b' }}>{admin.email}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: '#f3e8ff',
                            color: '#8b5cf6'
                          }}>
                            {admin.role || 'Admin'}
                          </span>
                        </td>
                        <td style={{ padding: '15px', color: '#64748b' }}>
                          {new Date(admin.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: '#d1fae5',
                            color: '#10b981'
                          }}>
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                📅 Appointment Management
              </h2>
              <div style={{ 
                fontSize: '16px', 
                color: '#64748b',
                padding: '10px 20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Total: <strong style={{ color: '#f59e0b' }}>{appointments.length}</strong> appointments
              </div>
            </div>
            
            {appointments.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                padding: '60px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📅</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>
                  No Appointments Yet
                </h3>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Appointments will appear here once patients book them.
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Patient</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Doctor</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Date</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Time</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Status</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments
                      .filter(a => {
                        if (!searchTerm) return true;
                        const search = searchTerm.toLowerCase();
                        return (
                          a.patient?.name?.toLowerCase().includes(search) ||
                          a.doctorName?.toLowerCase().includes(search) ||
                          a.doctor?.name?.toLowerCase().includes(search) ||
                          a.reason?.toLowerCase().includes(search)
                        );
                      })
                      .map((appointment, index) => (
                      <tr key={appointment._id} style={{ 
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8fafc';
                      }}
                      >
                        <td style={{ padding: '15px', color: '#1e293b', fontWeight: '600' }}>
                          {appointment.patient?.name || 'N/A'}
                        </td>
                        <td style={{ padding: '15px', color: '#64748b' }}>
                          {appointment.doctorName || appointment.doctor?.name || 'N/A'}
                        </td>
                        <td style={{ padding: '15px', color: '#64748b' }}>
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '15px', color: '#64748b' }}>{appointment.time}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                            backgroundColor:
                              appointment.status === 'confirmed' ? '#d1fae5' :
                              appointment.status === 'pending' ? '#fef3c7' :
                              appointment.status === 'cancelled' ? '#fee2e2' : '#e0e7ff',
                            color:
                              appointment.status === 'confirmed' ? '#10b981' :
                              appointment.status === 'pending' ? '#f59e0b' :
                              appointment.status === 'cancelled' ? '#ef4444' : '#6366f1'
                          }}>
                            {appointment.status}
                          </span>
                        </td>
                        <td style={{ padding: '15px', color: '#64748b' }}>
                          {appointment.reason || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, change }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderLeft: `4px solid ${color}`
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
      <div style={{ fontSize: '36px' }}>{icon}</div>
      <div style={{ fontSize: '32px', fontWeight: '700', color }}>{value}</div>
    </div>
    <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
      {title}
    </div>
    <div style={{ fontSize: '14px', color: '#64748b' }}>{change}</div>
  </div>
);

const TechCard = ({ name, desc, color }) => (
  <div style={{
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    border: `2px solid ${color}`,
    textAlign: 'center',
    transition: 'all 0.3s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = `0 8px 16px ${color}33`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}
  >
    <div style={{ fontSize: '24px', fontWeight: '700', color, marginBottom: '8px' }}>
      {name}
    </div>
    <div style={{ fontSize: '14px', color: '#64748b' }}>{desc}</div>
  </div>
);

const QuickActionCard = ({ title, description, icon, color, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      borderLeft: `4px solid ${color}`
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = `0 8px 16px ${color}33`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }}
  >
    <div style={{ fontSize: '36px', marginBottom: '15px' }}>{icon}</div>
    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
      {title}
    </h3>
    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
      {description}
    </p>
  </div>
);

export default AdminDashboard;

