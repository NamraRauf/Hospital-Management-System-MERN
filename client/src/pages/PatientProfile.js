import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, updateMyProfile } from '../services/api';
import Sidebar from '../components/Sidebar';

const PatientProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    medicalHistory: '',
    bloodGroup: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getMyProfile();
      const patient = res.data;
      setFormData({
        name: patient.name || '',
        email: patient.email || '',
        phone: patient.phone || '',
        age: patient.age || '',
        gender: patient.gender || '',
        address: patient.address || '',
        medicalHistory: patient.medicalHistory || '',
        bloodGroup: patient.bloodGroup || '',
        emergencyContact: patient.emergencyContact || {
          name: '',
          phone: '',
          relation: ''
        }
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        emergencyContact: {
          ...formData.emergencyContact,
          [field]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateMyProfile(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile(); // Refresh data
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <h3>Loading profile...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar userType="patient" />

      {/* Main Content */}
      <div style={{ 
        marginLeft: '250px', 
        flex: 1,
        padding: '30px',
        width: 'calc(100% - 250px)',
        maxWidth: '1200px'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, color: '#2c3e50' }}>My Profile</h2>
          <div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile();
                }}
                style={{
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Cancel
              </button>
            )}
            <button
              onClick={() => navigate('/patient-dashboard')}
              style={{
                backgroundColor: '#7f8c8d',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#efe',
            color: '#3c3',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
            border: '1px solid #cfc'
          }}>
            {success}
          </div>
        )}

        {/* Profile Form */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: isEditing ? 'white' : '#f5f5f5'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: isEditing ? 'white' : '#f5f5f5'
                  }}
                />
                {isEditing && (
                  <small style={{ color: '#3498db' }}>💡 You can update your email address</small>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: isEditing ? 'white' : '#f5f5f5'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="150"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: isEditing ? 'white' : '#f5f5f5'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: isEditing ? 'white' : '#f5f5f5'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: isEditing ? 'white' : '#f5f5f5'
                  }}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: isEditing ? 'white' : '#f5f5f5',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                disabled={!isEditing}
                rows="4"
                placeholder="Enter your medical history, allergies, chronic conditions, etc."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: isEditing ? 'white' : '#f5f5f5',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Emergency Contact */}
            <div style={{
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '5px',
              marginBottom: '20px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Emergency Contact</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: isEditing ? 'white' : '#f5f5f5'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: isEditing ? 'white' : '#f5f5f5'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
                    Relation
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.relation"
                    value={formData.emergencyContact.relation}
                    onChange={handleChange}
                    placeholder="e.g., Spouse, Parent, Sibling"
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: isEditing ? 'white' : '#f5f5f5'
                    }}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    backgroundColor: saving ? '#95a5a6' : '#27ae60',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '5px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    flex: 1,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (!saving) {
                      e.target.style.backgroundColor = '#229954';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!saving) {
                      e.target.style.backgroundColor = '#27ae60';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {saving ? 'Saving...' : '✅ Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile();
                  }}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    flex: 1,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#c0392b';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#e74c3c';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

