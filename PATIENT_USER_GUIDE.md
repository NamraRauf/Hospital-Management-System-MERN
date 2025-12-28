# 📱 Patient User Guide - Website Kaise Use Karein

## 🎯 Patient Ke Liye Complete Guide

### **1. Registration (Pehli Baar Use Karne Ke Liye)**

#### **Step 1: Home Page Se Register**
- Website kholo: `http://localhost:3000`
- Top right corner mein **"Get Started"** ya **"Register"** button click karo
- Ya directly: `http://localhost:3000/register`

#### **Step 2: Registration Form Fill Karein**
- **Register As:** "Patient" select karo
- **Full Name:** Apna naam likho
- **Email:** Apna email address
- **Password:** Minimum 6 characters
- **Confirm Password:** Same password dobara
- **Optional Fields (Agar chahe to):**
  - Phone Number
  - Age
  - Gender
  - Address
  - Medical History
  - Blood Group

#### **Step 3: Submit**
- **"Create Account"** button click karo
- Success message aayega
- Automatically login page par redirect ho jayega

---

### **2. Login (Baar Baar Use Karne Ke Liye)**

#### **Step 1: Login Page**
- `http://localhost:3000/login` par jao
- Ya home page se **"Login"** button click karo

#### **Step 2: Credentials Enter Karein**
- **Email:** Apna email address
- **Password:** Apna password
- **Login As:** "Patient" select karo

#### **Step 3: Login**
- **"Login"** button click karo
- Automatically Patient Dashboard par redirect ho jayega

---

### **3. Patient Dashboard (Main Page)**

#### **Kya Dikhega:**
- **Left Sidebar:** Navigation menu
  - 🏠 Dashboard
  - 👤 My Profile
  - 📅 Appointments
  - 📋 Medical Records

- **Welcome Card:** Apna naam aur welcome message
- **Stats Cards:**
  - Total Appointments count
  - Upcoming Appointments count

- **Your Information Card:**
  - Name, Email, Phone, Age, Gender, Blood Group
  - Medical History

- **Upcoming Appointments:**
  - Next 4 appointments ki list
  - Doctor name, date, time, status

- **Quick Action Cards:**
  - Book Appointment
  - My Appointments
  - Medical Records
  - Emergency Contact

---

### **4. Book Appointment (Naya Appointment Book Karne Ke Liye)**

#### **Method 1: Dashboard Se**
1. Dashboard par **"Book Appointment"** card par click karo
2. Ya sidebar se **"Appointments"** select karo
3. Ya directly: `http://localhost:3000/appointments`

#### **Method 2: Direct URL**
- `http://localhost:3000/appointments` par jao

#### **Step 1: Appointment Form**
- **"+ Book Appointment"** button click karo (top right)

#### **Step 2: Form Fill Karein**
- **Select Doctor:** Dropdown se doctor select karo
  - Doctor ka naam aur specialization dikhega
  - Example: "Dr. Sarah Johnson - Cardiology"
  
- **Date:** Calendar se date select karo
  - Aaj se aage ki date hi select kar sakte ho
  
- **Time:** Time select karo
  - Example: 10:00, 14:30, etc.
  
- **Reason for Visit (Optional):**
  - Symptoms ya reason likho
  - Example: "Regular checkup", "Fever", etc.

#### **Step 3: Submit**
- **"Book Appointment"** button click karo
- Success message aayega: "Appointment booked successfully!"
- Form automatically close ho jayega
- Appointments list update ho jayega

---

### **5. View My Appointments (Apne Appointments Dekhne Ke Liye)**

#### **Method 1: Dashboard Se**
- Dashboard par **"My Appointments"** card par click karo
- Ya **"View Appointments"** button click karo

#### **Method 2: Sidebar Se**
- Left sidebar se **"Appointments"** select karo

#### **Method 3: Direct URL**
- `http://localhost:3000/appointments` par jao

#### **Kya Dikhega:**
- **All Appointments Table:**
  - Patient name
  - Doctor name
  - Date (formatted)
  - Time
  - Status (Pending/Confirmed/Completed/Cancelled)
  - Color-coded status badges

- **Appointment Details:**
  - Doctor ka naam aur specialization
  - Appointment date aur time
  - Reason for visit (agar diya ho)
  - Current status

---

### **6. My Profile (Profile Edit Karne Ke Liye)**

#### **Method 1: Dashboard Se**
- Dashboard par **"My Profile"** card par click karo
- Ya sidebar se **"My Profile"** select karo

#### **Method 2: Direct URL**
- `http://localhost:3000/patient-profile` par jao

#### **Kya Kar Sakte Ho:**
- **View Profile:**
  - Apna complete information dekho
  - Name, Email, Phone, Age, Gender, Address
  - Medical History
  - Blood Group
  - Emergency Contact details

- **Edit Profile:**
  - **"Edit Profile"** button click karo
  - Fields editable ho jayenge
  - Changes karo
  - **"Save Changes"** button click karo
  - Success message aayega

- **Note:** Email change nahi kar sakte (security ke liye)

---

### **7. Medical Records (Medical History Dekhne Ke Liye)**

#### **Method 1: Dashboard Se**
- Dashboard par **"Medical Records"** card par click karo
- Ya sidebar se **"Medical Records"** select karo

#### **Method 2: Direct URL**
- `http://localhost:3000/reports` par jao

#### **Kya Dikhega:**
- Medical history
- Reports
- Prescriptions (future feature)

---

### **8. Logout (Website Se Bahar Jane Ke Liye)**

#### **Method 1: Sidebar Se**
- Left sidebar ke bottom par **"Logout"** button click karo

#### **Method 2: Home Page Se**
- Home page par jao
- Top right corner se **"Logout"** button click karo

#### **Kya Hoga:**
- Automatically login page par redirect ho jayega
- Session clear ho jayega
- Next time login karna padega

---

## 📋 Complete Patient Flow

### **First Time User:**
1. **Home Page** → Register → **Registration Form** → Submit
2. **Login Page** → Login → **Patient Dashboard**
3. **Dashboard** → Book Appointment → **Appointments Page**
4. **Appointments** → Fill Form → Submit → **Appointment Booked!**

### **Returning User:**
1. **Home Page** → Login → **Patient Dashboard**
2. **Dashboard** → View Appointments / Book New / Edit Profile

---

## 🎯 Quick Actions

### **Book Appointment:**
```
Dashboard → Book Appointment Card → Appointments Page → + Book Appointment → Fill Form → Submit
```

### **View Appointments:**
```
Dashboard → My Appointments Card → Appointments Page → See All Appointments
```

### **Edit Profile:**
```
Dashboard → My Profile Card → Patient Profile → Edit Profile → Save Changes
```

### **Logout:**
```
Sidebar → Logout Button → Login Page
```

---

## ✅ Features Available for Patients

1. ✅ **Registration** - Account banao
2. ✅ **Login** - Website use karo
3. ✅ **Dashboard** - Overview dekho
4. ✅ **Book Appointment** - Doctor se appointment book karo
5. ✅ **View Appointments** - Apne appointments dekho
6. ✅ **Edit Profile** - Profile update karo
7. ✅ **Medical Records** - Medical history dekho
8. ✅ **Logout** - Safely logout karo

---

## 🔐 Test Patient Credentials

**Email:** `testpatient123@gmail.com`  
**Password:** `namra123`  
**Login As:** Patient

---

## 📞 Help

Agar koi problem ho to:
1. Check karo ki backend server chal raha hai (port 5000)
2. Check karo ki MongoDB connected hai
3. Browser console mein errors check karo
4. Network connection check karo

---

## 🎉 Summary

**Patient ke liye website use karna bahut simple hai:**

1. **Register** → Account banao
2. **Login** → Dashboard par jao
3. **Book Appointment** → Doctor select karo, date/time choose karo
4. **View Appointments** → Apne appointments dekho
5. **Edit Profile** → Information update karo
6. **Logout** → Safely bahar jao

**Sab kuch sidebar se easily accessible hai!** ✅

