import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors, createAppointment, getMyAppointments } from '../services/api';
import Sidebar from '../components/Sidebar';

const Appointments = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const userType = localStorage.getItem('userType')?.toLowerCase();
    // Redirect doctors to doctor appointments page
    if (userType === 'doctor') {
      navigate('/doctor-appointments', { replace: true });
      return;
    }
    
    // Only fetch for patients
    if (userType === 'patient') {
      fetchDoctors();
      fetchAppointments();
    }
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctors();
      console.log('Doctors fetched:', res.data);
      setDoctors(res.data || []);
      if (!res.data || res.data.length === 0) {
        console.warn('No doctors found in database');
        // Add demo doctors if none exist
        setDoctors([
          { _id: 'demo1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', email: 'sarah.johnson@hospital.com' },
          { _id: 'demo2', name: 'Dr. Michael Brown', specialization: 'Pediatrics', email: 'michael.brown@hospital.com' },
          { _id: 'demo3', name: 'Dr. Emily Davis', specialization: 'General Medicine', email: 'emily.davis@hospital.com' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to load doctors. Please try again.');
      // Add demo doctors on error
      setDoctors([
        { _id: 'demo1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', email: 'sarah.johnson@hospital.com' },
        { _id: 'demo2', name: 'Dr. Michael Brown', specialization: 'Pediatrics', email: 'michael.brown@hospital.com' },
        { _id: 'demo3', name: 'Dr. Emily Davis', specialization: 'General Medicine', email: 'emily.davis@hospital.com' }
      ]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // If doctor is selected, update selectedDoctor
    if (name === 'doctorId') {
      const doctor = doctors.find(d => d._id === value);
      setSelectedDoctor(doctor || null);
    }
    
    setError('');
    setSuccess('');
  };

  const handleDoctorSelect = (doctor) => {
    setFormData({ ...formData, doctorId: doctor._id });
    setSelectedDoctor(doctor);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.doctorId || !formData.date || !formData.time) {
        setError('Please fill all required fields');
        setSaving(false);
        return;
      }

      await createAppointment({
        doctorId: formData.doctorId,
        date: formData.date,
        time: formData.time,
        reason: formData.reason || ''
      });

      setSuccess('Appointment booked successfully!');
      setShowForm(false);
      setFormData({ doctorId: '', date: '', time: '', reason: '' });
      setSelectedDoctor(null);
      fetchAppointments(); // Refresh appointments list
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError(error.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      case 'completed': return '#6366f1';
      default: return '#64748b';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    navigate('/login');
  };

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
        {/* Header Section */}
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
              📅 My Appointments
            </h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '16px' }}>
              Book new appointments and manage your existing ones
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: showForm ? '#ef4444' : '#27ae60',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '700',
              boxShadow: showForm ? '0 4px 12px rgba(239, 68, 68, 0.3)' : '0 4px 12px rgba(39, 174, 96, 0.3)',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = showForm 
                ? '0 6px 16px rgba(239, 68, 68, 0.4)' 
                : '0 6px 16px rgba(39, 174, 96, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = showForm 
                ? '0 4px 12px rgba(239, 68, 68, 0.3)' 
                : '0 4px 12px rgba(39, 174, 96, 0.3)';
            }}
          >
            <span style={{ fontSize: '20px' }}>{showForm ? '❌' : '➕'}</span>
            <span>{showForm ? 'Cancel Booking' : 'Book New Appointment'}</span>
          </button>
        </div>

        {/* Book Appointment Form */}
        {showForm && (
          <div style={{
            backgroundColor: 'white',
            padding: '35px',
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            marginBottom: '30px',
            border: '2px solid #27ae60'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '25px',
              paddingBottom: '20px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#27ae60',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📅
              </div>
              <div>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '24px', fontWeight: '700' }}>
                  Book New Appointment
                </h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                  Fill the form below to schedule your appointment
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  color: '#dc2626',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid #fecaca'
                }}>
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  color: '#16a34a',
                  padding: '16px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  border: '2px solid #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '24px' }}>✅</span>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>
                      Appointment Booked Successfully!
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      Your appointment has been scheduled. The doctor will confirm it soon.
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor Selection Section */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '15px', fontWeight: '700', color: '#1e293b', fontSize: '18px' }}>
                  👨‍⚕️ Select Doctor *
                </label>
                
                {selectedDoctor ? (
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', color: '#1e293b', fontSize: '20px', fontWeight: '700' }}>
                          {selectedDoctor.name}
                        </h4>
                        <p style={{ margin: '5px 0', color: '#64748b', fontSize: '16px' }}>
                          <strong>Specialization:</strong> {selectedDoctor.specialization || 'General Medicine'}
                        </p>
                        {selectedDoctor.email && (
                          <p style={{ margin: '5px 0', color: '#64748b', fontSize: '14px' }}>
                            📧 {selectedDoctor.email}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDoctor(null);
                          setFormData({ ...formData, doctorId: '' });
                        }}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {doctors.length === 0 ? (
                      <div style={{
                        backgroundColor: '#fef3c7',
                        border: '2px solid #f59e0b',
                        borderRadius: '12px',
                        padding: '30px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚠️</div>
                        <h4 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>No Doctors Available</h4>
                        <p style={{ margin: 0, color: '#64748b' }}>
                          Please contact admin to register doctors first.
                        </p>
                      </div>
                    ) : (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '15px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        padding: '10px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '12px',
                        border: '2px solid #e5e7eb'
                      }}>
                        {doctors.map(doctor => (
                          <div
                            key={doctor._id}
                            onClick={() => {
                handleDoctorSelect(doctor);
                // Scroll to form
                setTimeout(() => {
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
                            style={{
                              backgroundColor: 'white',
                              border: '2px solid #e5e7eb',
                              borderRadius: '12px',
                              padding: '20px',
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#3b82f6';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                              e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#e5e7eb';
                              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                              e.currentTarget.style.transform = 'translateY(0)';
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
                                <p style={{ margin: '3px 0 0 0', color: '#64748b', fontSize: '12px' }}>
                                  Click to select
                                </p>
                              </div>
                            </div>
                            <div style={{
                              padding: '10px',
                              backgroundColor: '#f0f9ff',
                              borderRadius: '8px',
                              marginTop: '10px'
                            }}>
                              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '5px' }}>
                                <strong>Specialization:</strong>
                              </div>
                              <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                                {doctor.specialization || 'General Medicine'}
                              </div>
                            </div>
                            {doctor.email && (
                              <div style={{ marginTop: '10px', fontSize: '12px', color: '#64748b' }}>
                                📧 {doctor.email}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
                
                <input
                  type="hidden"
                  name="doctorId"
                  value={formData.doctorId}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '15px' }}>
                    📅 Date * <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '400' }}>(Select future date)</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: formData.date ? '2px solid #10b981' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '16px',
                      backgroundColor: formData.date ? '#f0fdf4' : 'white',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.backgroundColor = '#eff6ff';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = formData.date ? '#10b981' : '#e5e7eb';
                      e.target.style.backgroundColor = formData.date ? '#f0fdf4' : 'white';
                    }}
                  />
                  {formData.date && (
                    <div style={{ marginTop: '5px', fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
                      ✅ Selected: {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '15px' }}>
                    ⏰ Time * <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '400' }}>(Select time)</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: formData.time ? '2px solid #10b981' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '16px',
                      backgroundColor: formData.time ? '#f0fdf4' : 'white',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.backgroundColor = '#eff6ff';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = formData.time ? '#10b981' : '#e5e7eb';
                      e.target.style.backgroundColor = formData.time ? '#f0fdf4' : 'white';
                    }}
                  />
                  {formData.time && (
                    <div style={{ marginTop: '5px', fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
                      ✅ Selected: {formData.time}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '15px' }}>
                  📝 Reason for Visit <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '400' }}>(Optional but recommended)</span>
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Example: Regular checkup, Fever and cough, Follow-up appointment, etc."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: formData.reason ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '16px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#eff6ff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = formData.reason ? '#3b82f6' : '#e5e7eb';
                    e.target.style.backgroundColor = formData.reason ? '#eff6ff' : 'white';
                  }}
                />
                {formData.reason && (
                  <div style={{ marginTop: '5px', fontSize: '12px', color: '#64748b' }}>
                    {formData.reason.length} characters
                  </div>
                )}
              </div>

              {/* Form Validation Summary */}
              {!formData.doctorId && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  border: '2px solid #f59e0b',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '20px' }}>⚠️</span>
                  <span style={{ color: '#92400e', fontSize: '14px' }}>
                    Please select a doctor first
                  </span>
                </div>
              )}

              {formData.doctorId && !formData.date && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  border: '2px solid #f59e0b',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '20px' }}>⚠️</span>
                  <span style={{ color: '#92400e', fontSize: '14px' }}>
                    Please select appointment date
                  </span>
                </div>
              )}

              {formData.doctorId && formData.date && !formData.time && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  border: '2px solid #f59e0b',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '20px' }}>⚠️</span>
                  <span style={{ color: '#92400e', fontSize: '14px' }}>
                    Please select appointment time
                  </span>
                </div>
              )}

              {formData.doctorId && formData.date && formData.time && (
                <div style={{
                  backgroundColor: '#d1fae5',
                  border: '2px solid #10b981',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '20px' }}>✅</span>
                  <span style={{ color: '#065f46', fontSize: '14px', fontWeight: '600' }}>
                    All required fields filled! Ready to book appointment.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={saving || !formData.doctorId || !formData.date || !formData.time}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: (saving || !formData.doctorId || !formData.date || !formData.time) ? '#95a5a6' : '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: (saving || !formData.doctorId || !formData.date || !formData.time) ? 'not-allowed' : 'pointer',
                  boxShadow: (saving || !formData.doctorId || !formData.date || !formData.time) ? 'none' : '0 4px 12px rgba(39, 174, 96, 0.3)',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  if (!saving && formData.doctorId && formData.date && formData.time) {
                    e.target.style.backgroundColor = '#229954';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(39, 174, 96, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!saving && formData.doctorId && formData.date && formData.time) {
                    e.target.style.backgroundColor = '#27ae60';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
                  }
                }}
              >
                {saving ? (
                  <>
                    <span>⏳</span>
                    <span>Booking Appointment...</span>
                  </>
                ) : !formData.doctorId || !formData.date || !formData.time ? (
                  <>
                    <span>⚠️</span>
                    <span>Fill All Required Fields</span>
                  </>
                ) : (
                  <>
                    <span>📅</span>
                    <span>Book Appointment</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Available Doctors Section (Always Visible) */}
        {(doctors.length > 0 || loading) && (
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '22px', fontWeight: '700' }}>
                  👨‍⚕️ Available Doctors
                </h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                  {loading ? 'Loading doctors...' : `${doctors.length} doctor${doctors.length !== 1 ? 's' : ''} available - Click on a doctor card to book appointment`}
                </p>
              </div>
              {!loading && (
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  ➕ Book Appointment
                </button>
              )}
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏳</div>
                <p>Loading doctors...</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {doctors.length === 0 ? (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    border: '2px solid #f59e0b'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚠️</div>
                    <h4 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>No Doctors Available</h4>
                    <p style={{ margin: 0, color: '#64748b' }}>
                      Please contact admin to register doctors first.
                    </p>
                  </div>
                ) : (
                  doctors.map(doctor => (
                <div
                  key={doctor._id}
                  onClick={() => {
                handleDoctorSelect(doctor);
                // Scroll to form
                setTimeout(() => {
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.backgroundColor = '#f0f9ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      color: 'white',
                      marginRight: '15px'
                    }}>
                      👨‍⚕️
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#1e293b', fontSize: '18px', fontWeight: '700' }}>
                        {doctor.name}
                      </h4>
                      <p style={{ margin: '3px 0 0 0', color: '#64748b', fontSize: '12px' }}>
                        Click to book appointment
                      </p>
                    </div>
                  </div>
                  <div style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px', fontWeight: '600' }}>
                      SPECIALIZATION
                    </div>
                    <div style={{ fontSize: '16px', color: '#1e293b', fontWeight: '700' }}>
                      {doctor.specialization || 'General Medicine'}
                    </div>
                  </div>
                  {doctor.email && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#64748b',
                      marginTop: '10px'
                    }}>
                      <span>📧</span>
                      <span>{doctor.email}</span>
                    </div>
                  )}
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    ➕ Book Appointment
                  </div>
                </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Appointments List */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
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
                📋 My Appointments List
              </h3>
              <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                {appointments.length} appointment{appointments.length !== 1 ? 's' : ''} found
              </p>
            </div>
            {appointments.length > 0 && (
              <button
                onClick={() => {
                  setShowForm(true);
                  setSelectedDoctor(null);
                  setFormData({ doctorId: '', date: '', time: '', reason: '' });
                }}
                style={{
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>➕</span>
                <span>Book Another</span>
              </button>
            )}
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏳</div>
              <p style={{ fontSize: '18px', color: '#64748b' }}>Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 40px',
              backgroundColor: '#f0fdf4',
              borderRadius: '16px',
              border: '2px dashed #27ae60'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📅</div>
              <h3 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '10px', fontWeight: '700' }}>
                No Appointments Yet
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '30px' }}>
                Book your first appointment to get started!
              </p>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)',
                  transition: 'all 0.3s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(39, 174, 96, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
                }}
              >
                <span style={{ fontSize: '24px' }}>➕</span>
                <span>Book Your First Appointment</span>
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '15px'
            }}>
              {appointments.map(appointment => (
                <div key={appointment._id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '20px',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>
                        {appointment.doctorName || (appointment.doctor?.name || 'Unknown Doctor')}
                      </h4>
                      <p style={{ margin: '5px 0', color: '#64748b' }}>
                        {appointment.doctor?.specialization || 'General Medicine'}
                      </p>
                    </div>
                    <span style={{
                      backgroundColor: getStatusColor(appointment.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {appointment.status}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' }}>
                    <div>
                      <strong style={{ color: '#64748b' }}>Date:</strong>
                      <p style={{ margin: '5px 0', color: '#1e293b' }}>{formatDate(appointment.date)}</p>
                    </div>
                    <div>
                      <strong style={{ color: '#64748b' }}>Time:</strong>
                      <p style={{ margin: '5px 0', color: '#1e293b' }}>{appointment.time}</p>
                    </div>
                  </div>
                  {appointment.reason && (
                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
                      <strong style={{ color: '#64748b' }}>Reason:</strong>
                      <p style={{ margin: '5px 0', color: '#1e293b' }}>{appointment.reason}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;

