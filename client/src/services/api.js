import axios from "axios";

// Naya Vercel Backend URL
const API_BASE_URL = "https://hospital-management-system-mern-sable.vercel.app/api";

const API = axios.create({ 
  baseURL: API_BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please check your connection.';
    } else if (error.message === 'Network Error') {
      error.message = 'Cannot connect to server. Check if Vercel backend is up.';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const registerUser = (formData) => API.post("/patients/register", formData);
export const registerPatient = (formData) => API.post("/patients/register", formData);
export const registerDoctor = (formData) => API.post("/doctors/register", formData);
export const loginUser = ({ email, password, userType }) =>
  API.post("/auth/login", { email, password, userType });

// Patient APIs
export const getMyProfile = () => API.get("/patients/profile");
export const updateMyProfile = (data) => API.put("/patients/profile", data);
export const getAllPatients = () => API.get("/patients");
export const getPatientById = (id) => API.get(`/patients/${id}`);
export const updatePatient = (id, data) => API.put(`/patients/${id}`, data);
export const deletePatient = (id) => API.delete(`/patients/${id}`);

// Doctor APIs
export const getAllDoctors = () => API.get("/doctors");
export const getDoctorById = (id) => API.get(`/doctors/${id}`);

// Admin APIs
export const registerAdmin = (formData) => API.post("/admin/register", formData);
export const getAdminProfile = () => API.get("/admin/profile");
export const getAdminDashboardStats = () => API.get("/admin/dashboard/stats");
export const getAdminAllPatients = () => API.get("/admin/patients");
export const getAdminAllDoctors = () => API.get("/admin/doctors");
export const getAdminAllAdmins = () => API.get("/admin/admins");
export const deleteAdminPatient = (id) => API.delete(`/admin/patients/${id}`);
export const deleteAdminDoctor = (id) => API.delete(`/admin/doctors/${id}`);

// Appointment APIs
export const createAppointment = (data) => API.post("/appointments", data);
export const getMyAppointments = () => API.get("/appointments/my-appointments");
export const getDoctorAppointments = () => API.get("/appointments/doctor");
export const getAllAppointments = () => API.get("/appointments");
export const updateAppointmentStatus = (appointmentId, status) => API.put(`/appointments/${appointmentId}/status`, { status });
export const deleteAppointment = (appointmentId) => API.delete(`/appointments/${appointmentId}`);