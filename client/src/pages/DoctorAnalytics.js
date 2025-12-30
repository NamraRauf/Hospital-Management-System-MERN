import React, { useState, useEffect } from 'react';
import { getDoctorAppointments, getAllPatients } from '../services/api';
import Sidebar from '../components/Sidebar';

const DoctorAnalytics = () => {
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

        {/* Performance Metrics - Enhanced */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '25px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📊</span>
            <span>Performance Metrics & KPIs</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '25px', 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>
                {stats.completionRate}%
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Completion Rate</div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>
                {stats.completed} of {stats.totalAppointments} completed
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '25px', 
              background: 'linear-gradient(135deg, #3498db 0%, #2563eb 100%)',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>📈</div>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>
                {stats.avgAppointmentsPerPatient}x
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Avg Visits/Patient</div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>
                Patient retention metric
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '25px', 
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>📅</div>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>
                {stats.thisWeek}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>This Week</div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>
                Last 7 days activity
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '25px', 
              background: 'linear-gradient(135deg, #9b59b6 0%, #7c3aed 100%)',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(155, 89, 182, 0.3)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>📊</div>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>
                {stats.thisMonth}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>This Month</div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>
                Last 30 days activity
              </div>
            </div>
          </div>
        </div>

        {/* Success Rate & Efficiency */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '25px', fontSize: '20px' }}>
            Success Rate & Efficiency Analysis
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '10px',
              border: '2px solid #22c55e'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#166534' }}>Success Rate</span>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>
                  {stats.totalAppointments > 0 ? ((stats.completed / (stats.totalAppointments - stats.cancelled)) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: '#dcfce7',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${stats.totalAppointments > 0 ? ((stats.completed / (stats.totalAppointments - stats.cancelled)) * 100) : 0}%`,
                  height: '100%',
                  backgroundColor: '#22c55e',
                  transition: 'width 0.3s'
                }}></div>
              </div>
              <div style={{ fontSize: '12px', color: '#166534', marginTop: '8px' }}>
                Completed appointments vs total (excluding cancelled)
              </div>
            </div>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#fef3c7', 
              borderRadius: '10px',
              border: '2px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>Pending Ratio</span>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
                  {stats.totalAppointments > 0 ? ((stats.pending / stats.totalAppointments) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: '#fef3c7',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${stats.totalAppointments > 0 ? ((stats.pending / stats.totalAppointments) * 100) : 0}%`,
                  height: '100%',
                  backgroundColor: '#f59e0b',
                  transition: 'width 0.3s'
                }}></div>
              </div>
              <div style={{ fontSize: '12px', color: '#92400e', marginTop: '8px' }}>
                Appointments awaiting confirmation
              </div>
            </div>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#eff6ff', 
              borderRadius: '10px',
              border: '2px solid #3b82f6'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>Patient Engagement</span>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
                  {stats.uniquePatients > 0 ? ((stats.totalAppointments / stats.uniquePatients) * 100 / 10).toFixed(1) : 0}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: '#dbeafe',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${stats.uniquePatients > 0 ? Math.min(((stats.totalAppointments / stats.uniquePatients) * 10), 100) : 0}%`,
                  height: '100%',
                  backgroundColor: '#3b82f6',
                  transition: 'width 0.3s'
                }}></div>
              </div>
              <div style={{ fontSize: '12px', color: '#1e40af', marginTop: '8px' }}>
                Average appointments per patient engagement score
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Performance Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '20px' }}>
            Weekly Performance (Last 7 Days)
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px' }}>
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayAppointments = appointments.filter(a => {
                const aptDate = new Date(a.date);
                return aptDate.toDateString() === date.toDateString();
              }).length;
              const maxDay = Math.max(...Array.from({ length: 7 }, (_, j) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - j));
                return appointments.filter(a => {
                  const aptDate = new Date(a.date);
                  return aptDate.toDateString() === d.toDateString();
                }).length;
              }), 1);
              
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${(dayAppointments / maxDay) * 180}px`,
                    backgroundColor: dayAppointments > 0 ? '#10b981' : '#e5e7eb',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: '5px',
                    color: dayAppointments > 0 ? 'white' : '#9ca3af',
                    fontWeight: '600',
                    fontSize: '12px',
                    minHeight: dayAppointments > 0 ? '30px' : '10px',
                    transition: 'all 0.3s'
                  }}>
                    {dayAppointments > 0 && dayAppointments}
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', fontWeight: '600', textAlign: 'center' }}>
                    {dayName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patient Demographics */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '20px' }}>
            Patient Demographics & Insights
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '2px solid #0ea5e9' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>👥</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#0ea5e9', marginBottom: '5px' }}>
                {stats.uniquePatients}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Total Patients</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '2px solid #22c55e' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔄</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#22c55e', marginBottom: '5px' }}>
                {stats.avgAppointmentsPerPatient}x
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Avg Visits/Patient</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '2px solid #f59e0b' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📈</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b', marginBottom: '5px' }}>
                {stats.thisWeek}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>This Week</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f3e8ff', borderRadius: '8px', border: '2px solid #a855f7' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#a855f7', marginBottom: '5px' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#2c3e50', margin: 0, fontSize: '20px' }}>
              Recent Appointments Summary
            </h3>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Showing {Math.min(6, appointments.length)} of {appointments.length} appointments
            </span>
          </div>
          {appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📅</div>
              <div style={{ fontSize: '18px' }}>No appointments yet</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
              {appointments.slice(0, 6).map(apt => (
                <div
                  key={apt._id}
                  style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '16px' }}>
                      {apt.patient?.name || 'Unknown Patient'}
                    </div>
                    <span style={{
                      padding: '4px 12px',
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
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📅</span>
                    <span>{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🕐</span>
                    <span>{apt.time}</span>
                  </div>
                  {apt.reason && (
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                      <strong>Reason:</strong> {apt.reason}
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

export default DoctorAnalytics;

