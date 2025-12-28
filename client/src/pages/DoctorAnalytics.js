import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctorAppointments, getAllPatients } from '../services/api';
import Sidebar from '../components/Sidebar';

const DoctorAnalytics = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all'); // all, week, month, year

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appointmentsRes, patientsRes] = await Promise.all([
        getDoctorAppointments(),
        getAllPatients()
      ]);
      setAppointments(appointmentsRes.data || []);
      setPatients(patientsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load analytics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const getStats = () => {
    const totalAppointments = appointments.length;
    const pending = appointments.filter(a => a.status === 'pending').length;
    const confirmed = appointments.filter(a => a.status === 'confirmed').length;
    const completed = appointments.filter(a => a.status === 'completed').length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;

    // Unique patients
    const uniquePatientIds = new Set(appointments.map(a => a.patient?._id || a.patient));
    const uniquePatients = uniquePatientIds.size;

    // Completion rate
    const completionRate = totalAppointments > 0 
      ? ((completed / totalAppointments) * 100).toFixed(1) 
      : 0;

    // Average appointments per patient
    const avgAppointmentsPerPatient = uniquePatients > 0 
      ? (totalAppointments / uniquePatients).toFixed(1) 
      : 0;

    // This week's appointments
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = appointments.filter(a => new Date(a.date) >= weekAgo).length;

    // This month's appointments
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const thisMonth = appointments.filter(a => new Date(a.date) >= monthAgo).length;

    return {
      totalAppointments,
      pending,
      confirmed,
      completed,
      cancelled,
      uniquePatients,
      completionRate,
      avgAppointmentsPerPatient,
      thisWeek,
      thisMonth
    };
  };

  const stats = getStats();

  // Get appointments by status for chart
  const getStatusData = () => {
    return [
      { name: 'Completed', value: stats.completed, color: '#10b981' },
      { name: 'Confirmed', value: stats.confirmed, color: '#3498db' },
      { name: 'Pending', value: stats.pending, color: '#f59e0b' },
      { name: 'Cancelled', value: stats.cancelled, color: '#ef4444' }
    ];
  };

  // Get monthly appointment trend (last 6 months)
  const getMonthlyTrend = () => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const count = appointments.filter(a => {
        const aptDate = new Date(a.date);
        return aptDate >= monthStart && aptDate <= monthEnd;
      }).length;

      months.push({ name: monthName, count });
    }
    return months;
  };

  const monthlyTrend = getMonthlyTrend();
  const maxCount = Math.max(...monthlyTrend.map(m => m.count), 1);

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
          <div style={{ fontSize: '20px', color: '#666' }}>Loading Analytics...</div>
        </div>
      </div>
    );
  }

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
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ color: '#2c3e50', margin: 0, fontSize: '32px', fontWeight: '700' }}>
              Analytics & Reports
            </h1>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>
              Performance metrics and appointment analytics
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Key Metrics Cards */}
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
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>📅</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#3498db', marginBottom: '5px' }}>
              {stats.totalAppointments}
            </div>
            <div style={{ fontSize: '18px', color: '#666' }}>Total Appointments</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
              {stats.thisWeek} this week • {stats.thisMonth} this month
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #10b981'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>✅</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>
              {stats.completed}
            </div>
            <div style={{ fontSize: '18px', color: '#666' }}>Completed</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
              {stats.completionRate}% completion rate
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #9b59b6'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>👥</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#9b59b6', marginBottom: '5px' }}>
              {stats.uniquePatients}
            </div>
            <div style={{ fontSize: '18px', color: '#666' }}>Unique Patients</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
              {stats.avgAppointmentsPerPatient} avg per patient
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #f59e0b'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#f59e0b', marginBottom: '5px' }}>
              {stats.pending}
            </div>
            <div style={{ fontSize: '18px', color: '#666' }}>Pending</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
              {stats.confirmed} confirmed
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Appointment Status Chart */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '20px' }}>
              Appointment Status Distribution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {getStatusData().map((item, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>
                      {item.name}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: item.color }}>
                      {item.value}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '24px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${stats.totalAppointments > 0 ? (item.value / stats.totalAppointments) * 100 : 0}%`,
                      height: '100%',
                      backgroundColor: item.color,
                      transition: 'width 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '8px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {stats.totalAppointments > 0 ? ((item.value / stats.totalAppointments) * 100).toFixed(0) : 0}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend Chart */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '20px' }}>
              Monthly Appointment Trend
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', height: '200px' }}>
              {monthlyTrend.map((month, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${(month.count / maxCount) * 180}px`,
                    backgroundColor: '#3498db',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: '5px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '12px',
                    minHeight: month.count > 0 ? '30px' : '0'
                  }}>
                    {month.count > 0 && month.count}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>
                    {month.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '25px', fontSize: '20px' }}>
            Performance Metrics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>
                {stats.completionRate}%
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Completion Rate</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#3498db', marginBottom: '5px' }}>
                {stats.avgAppointmentsPerPatient}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Avg Appointments/Patient</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', marginBottom: '5px' }}>
                {stats.thisWeek}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>This Week</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#9b59b6', marginBottom: '5px' }}>
                {stats.thisMonth}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>This Month</div>
            </div>
          </div>
        </div>

        {/* Recent Appointments Summary */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '20px' }}>
            Recent Appointments Summary
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {appointments.slice(0, 6).map(apt => (
              <div
                key={apt._id}
                style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '5px' }}>
                  {apt.patient?.name || 'Unknown Patient'}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                  {new Date(apt.date).toLocaleDateString()} at {apt.time}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Reason: {apt.reason || 'No reason provided'}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAnalytics;

