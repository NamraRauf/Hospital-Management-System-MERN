import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctorAppointments, updateAppointmentStatus } from '../services/api';
import Sidebar from '../components/Sidebar';

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await getDoctorAppointments();
      setAppointments(res.data || []);
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      alert('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      alert('Appointment status updated successfully!');
      fetchAppointments(); // Refresh
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
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
      case 'confirmed': return { bg: '#d1fae5', color: '#10b981' };
      case 'pending': return { bg: '#fef3c7', color: '#f59e0b' };
      case 'cancelled': return { bg: '#fee2e2', color: '#ef4444' };
      case 'completed': return { bg: '#e0e7ff', color: '#6366f1' };
      default: return { bg: '#f3f4f6', color: '#64748b' };
    }
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter);

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length
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
        {/* Stats Cards */}
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
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderLeft: '4px solid #3498db'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#3498db', marginBottom: '5px' }}>
              {stats.total}
            </div>
            <div style={{ color: '#666' }}>Total Appointments</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderLeft: '4px solid #f59e0b'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', marginBottom: '5px' }}>
              {stats.pending}
            </div>
            <div style={{ color: '#666' }}>Pending</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderLeft: '4px solid #10b981'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>
              {stats.confirmed}
            </div>
            <div style={{ color: '#666' }}>Confirmed</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderLeft: '4px solid #6366f1'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#6366f1', marginBottom: '5px' }}>
              {stats.completed}
            </div>
            <div style={{ color: '#666' }}>Completed</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {['all', 'pending', 'confirmed', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '10px 20px',
                backgroundColor: filter === status ? '#3498db' : 'transparent',
                color: filter === status ? 'white' : '#2c3e50',
                border: `2px solid ${filter === status ? '#3498db' : '#e0e0e0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'capitalize',
                transition: 'all 0.3s'
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏳</div>
              <div>Loading appointments...</div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📅</div>
              <div style={{ fontSize: '18px' }}>No appointments found</div>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Patient</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Time</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Reason</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt, index) => {
                  const statusStyle = getStatusColor(apt.status);
                  return (
                    <tr key={apt._id} style={{ 
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc'
                    }}>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontWeight: '600', color: '#1e293b' }}>
                          {apt.patient?.name || 'Unknown Patient'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          {apt.patient?.email || 'N/A'}
                        </div>
                        {apt.patient?.phone && (
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            📞 {apt.patient.phone}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '15px', color: '#1e293b' }}>
                        {formatDate(apt.date)}
                      </td>
                      <td style={{ padding: '15px', color: '#1e293b' }}>
                        {apt.time}
                      </td>
                      <td style={{ padding: '15px', color: '#64748b' }}>
                        {apt.reason || 'No reason provided'}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'capitalize',
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color
                        }}>
                          {apt.status}
                        </span>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          {apt.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(apt._id, 'confirmed')}
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#10b981',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: '600'
                                }}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: '600'
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {apt.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusUpdate(apt._id, 'completed')}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;

