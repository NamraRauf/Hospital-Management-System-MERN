import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctorAppointments, getAllPatients } from '../services/api';
import Sidebar from '../components/Sidebar';

const DoctorMedicalRecords = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    diagnosis: '',
    prescription: '',
    notes: '',
    labTests: '',
    followUpDate: '',
    vitalSigns: {
      bloodPressure: '',
      temperature: '',
      heartRate: '',
      weight: ''
    }
  });

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
      alert('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setShowAddRecord(false);
  };

  const handleAddRecord = () => {
    if (!selectedPatient) {
      alert('Please select a patient first');
      return;
    }
    setShowAddRecord(true);
  };

  const handleSaveRecord = () => {
    // In a real app, this would save to backend
    alert('Medical record saved successfully! (This is a demo - backend integration needed)');
    setShowAddRecord(false);
    setNewRecord({
      diagnosis: '',
      prescription: '',
      notes: '',
      labTests: '',
      followUpDate: '',
      vitalSigns: {
        bloodPressure: '',
        temperature: '',
        heartRate: '',
        weight: ''
      }
    });
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const patientAppointments = selectedPatient 
    ? appointments.filter(apt => apt.patient?._id === selectedPatient._id || apt.patient === selectedPatient._id)
    : [];

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
          <div style={{ fontSize: '20px', color: '#666' }}>Loading Medical Records...</div>
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
              Medical Records
            </h1>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>
              Manage patient medical records, prescriptions, and treatment notes
            </p>
          </div>
          {selectedPatient && (
            <button
              onClick={handleAddRecord}
              style={{
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ➕ Add New Record
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          {/* Patient List */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxHeight: 'calc(100vh - 200px)',
            overflow: 'auto'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Patients</h3>
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '15px',
                fontSize: '14px'
              }}
            />

            {/* Patient List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredPatients.map(patient => (
                <div
                  key={patient._id}
                  onClick={() => handlePatientSelect(patient)}
                  style={{
                    padding: '15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedPatient?._id === patient._id ? '#e3f2fd' : '#f8f9fa',
                    border: selectedPatient?._id === patient._id ? '2px solid #3498db' : '1px solid #e0e0e0',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPatient?._id !== patient._id) {
                      e.currentTarget.style.backgroundColor = '#f0f0f0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPatient?._id !== patient._id) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '5px' }}>
                    {patient.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {patient.email}
                  </div>
                  {patient.phone && (
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '3px' }}>
                      📞 {patient.phone}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Medical Records */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxHeight: 'calc(100vh - 200px)',
            overflow: 'auto'
          }}>
            {!selectedPatient ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📋</div>
                <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>
                  Select a Patient
                </div>
                <div style={{ fontSize: '14px' }}>
                  Choose a patient from the list to view their medical records
                </div>
              </div>
            ) : showAddRecord ? (
              /* Add New Record Form */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <h2 style={{ color: '#2c3e50', margin: 0 }}>Add Medical Record</h2>
                  <button
                    onClick={() => setShowAddRecord(false)}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Patient Info */}
                  <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '600', color: '#2c3e50' }}>Patient: {selectedPatient.name}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Email: {selectedPatient.email}</div>
                  </div>

                  {/* Diagnosis */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>
                      Diagnosis *
                    </label>
                    <textarea
                      value={newRecord.diagnosis}
                      onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                      placeholder="Enter diagnosis..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Prescription */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>
                      Prescription
                    </label>
                    <textarea
                      value={newRecord.prescription}
                      onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
                      placeholder="Enter medications and dosages..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '100px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Vital Signs */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#2c3e50' }}>
                      Vital Signs
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div>
                        <label style={{ fontSize: '12px', color: '#666' }}>Blood Pressure</label>
                        <input
                          type="text"
                          value={newRecord.vitalSigns.bloodPressure}
                          onChange={(e) => setNewRecord({
                            ...newRecord,
                            vitalSigns: { ...newRecord.vitalSigns, bloodPressure: e.target.value }
                          })}
                          placeholder="e.g., 120/80"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: '#666' }}>Temperature (°F)</label>
                        <input
                          type="text"
                          value={newRecord.vitalSigns.temperature}
                          onChange={(e) => setNewRecord({
                            ...newRecord,
                            vitalSigns: { ...newRecord.vitalSigns, temperature: e.target.value }
                          })}
                          placeholder="e.g., 98.6"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: '#666' }}>Heart Rate (bpm)</label>
                        <input
                          type="text"
                          value={newRecord.vitalSigns.heartRate}
                          onChange={(e) => setNewRecord({
                            ...newRecord,
                            vitalSigns: { ...newRecord.vitalSigns, heartRate: e.target.value }
                          })}
                          placeholder="e.g., 72"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: '#666' }}>Weight (kg)</label>
                        <input
                          type="text"
                          value={newRecord.vitalSigns.weight}
                          onChange={(e) => setNewRecord({
                            ...newRecord,
                            vitalSigns: { ...newRecord.vitalSigns, weight: e.target.value }
                          })}
                          placeholder="e.g., 70"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lab Tests */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>
                      Lab Tests / Reports
                    </label>
                    <textarea
                      value={newRecord.labTests}
                      onChange={(e) => setNewRecord({ ...newRecord, labTests: e.target.value })}
                      placeholder="Enter lab test results or reports..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Treatment Notes */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>
                      Treatment Notes
                    </label>
                    <textarea
                      value={newRecord.notes}
                      onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                      placeholder="Enter treatment notes and observations..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '100px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Follow-up Date */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      value={newRecord.followUpDate}
                      onChange={(e) => setNewRecord({ ...newRecord, followUpDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSaveRecord}
                    style={{
                      backgroundColor: '#27ae60',
                      color: 'white',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      width: '100%'
                    }}
                  >
                    💾 Save Medical Record
                  </button>
                </div>
              </div>
            ) : (
              /* View Records */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <div>
                    <h2 style={{ color: '#2c3e50', margin: 0 }}>{selectedPatient.name}'s Medical Records</h2>
                    <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '14px' }}>
                      {selectedPatient.email} • {selectedPatient.phone || 'No phone'}
                    </p>
                  </div>
                  <button
                    onClick={handleAddRecord}
                    style={{
                      backgroundColor: '#27ae60',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    ➕ Add Record
                  </button>
                </div>

                {/* Patient Medical History */}
                {selectedPatient.medicalHistory && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    <h3 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '18px' }}>
                      Medical History
                    </h3>
                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                      {selectedPatient.medicalHistory || 'No medical history recorded'}
                    </p>
                  </div>
                )}

                {/* Appointments History */}
                {patientAppointments.length > 0 && (
                  <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '18px' }}>
                      Appointment History
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {patientAppointments.map(apt => (
                        <div
                          key={apt._id}
                          style={{
                            padding: '15px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontWeight: '600', color: '#2c3e50' }}>
                                {new Date(apt.date).toLocaleDateString()} at {apt.time}
                              </div>
                              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                Reason: {apt.reason || 'No reason provided'}
                              </div>
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
                  </div>
                )}

                {/* Sample Medical Records (Demo) */}
                <div>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '18px' }}>
                    Medical Records
                  </h3>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff3cd',
                    borderRadius: '8px',
                    border: '1px solid #ffc107',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>📋</div>
                    <div style={{ color: '#856404', fontWeight: '600', marginBottom: '5px' }}>
                      No Medical Records Yet
                    </div>
                    <div style={{ color: '#856404', fontSize: '14px' }}>
                      Click "Add Record" to create the first medical record for this patient
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorMedicalRecords;

