# 🌐 Offline Setup Guide - Internet Ke Bina Project Chalane Ke Liye

## 📋 Problem
MongoDB Atlas cloud database hai, isliye internet chahiye. Teacher ko dikhane ke liye internet nahi hoga to project nahi chalega.

## ✅ Solution
Local MongoDB install karein - **Internet ki zaroorat nahi hogi!**

---

## 🚀 Step 1: MongoDB Local Install Karein

### **macOS (Mac) Ke Liye:**

1. **Homebrew Install Karein (agar nahi hai):**
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **MongoDB Install Karein:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

3. **MongoDB Start Karein:**
   ```bash
   brew services start mongodb-community
   ```

### **Windows Ke Liye:**

1. **MongoDB Download Karein:**
   - https://www.mongodb.com/try/download/community
   - Windows x64 version download karein
   - Installer run karein
   - "Complete" installation choose karein
   - "Install MongoDB as a Service" check karein

2. **MongoDB Service Start:**
   - Windows Services se MongoDB start ho jayega automatically

### **Linux Ke Liye:**

```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

---

## 🔧 Step 2: Connection String Change Karein

### **server/.env File Mein:**

**Pehle (Internet Required - MongoDB Atlas):**
```
MONGO_URI=mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority
```

**Ab (Offline - Local MongoDB):**
```
MONGO_URI=mongodb://localhost:27017/hospital
```

---

## 📝 Step 3: .env File Update Karein

1. `server/.env` file open karein
2. `MONGO_URI` change karein:
   ```
   MONGO_URI=mongodb://localhost:27017/hospital
   ```
3. Save karein

---

## 🎯 Step 4: Test Accounts Create Karein

MongoDB local install hone ke baad, test accounts create karein:

```bash
cd server
node scripts/createAllTestAccounts.js
```

**Test Accounts:**
- **Patient:** `patient@test.com` / `patient123`
- **Doctor:** `doctor@test.com` / `doctor123`
- **Admin:** `superadmin@hospital.com` / `admin123`

---

## ✅ Step 5: Project Start Karein

### **Terminal 1 - Backend:**
```bash
cd server
npm start
```

### **Terminal 2 - Frontend:**
```bash
cd client
npm start
```

---

## 🔍 Verification

1. **MongoDB Running Check:**
   ```bash
   # macOS/Linux
   brew services list
   
   # Windows
   # Services app mein MongoDB check karein
   ```

2. **MongoDB Connection Test:**
   ```bash
   mongosh
   # Ya
   mongo
   ```
   Agar connection successful hai, to `> ` prompt dikhega.

3. **Database Check:**
   ```bash
   use hospital
   show collections
   ```

---

## 🎓 Teacher Demo Ke Liye

### **Setup Checklist:**

- [ ] MongoDB local install ho gaya
- [ ] `.env` file mein local connection string set hai
- [ ] Test accounts create ho gaye
- [ ] Backend server start ho gaya (port 5000)
- [ ] Frontend start ho gaya (port 3001)
- [ ] Internet disconnect karke test kiya - sab kaam kar raha hai

### **Demo Steps:**

1. **Internet disconnect karein** (WiFi off karein)
2. **Backend start karein:**
   ```bash
   cd server
   npm start
   ```
3. **Frontend start karein:**
   ```bash
   cd client
   npm start
   ```
4. **Browser mein open karein:**
   - `http://localhost:3001`
5. **Login karein:**
   - Patient: `patient@test.com` / `patient123`
   - Doctor: `doctor@test.com` / `doctor123`
   - Admin: `superadmin@hospital.com` / `admin123`

---

## ⚠️ Important Notes

1. **MongoDB Service:**
   - MongoDB service hamesha running honi chahiye
   - Agar band ho jaye, to start karein:
     ```bash
     # macOS
     brew services start mongodb-community
     
     # Windows
     # Services app se start karein
     ```

2. **Data Persistence:**
   - Local MongoDB data `/data/db` (macOS/Linux) ya `C:\data\db` (Windows) mein store hota hai
   - Agar MongoDB uninstall karein, to data delete ho jayega
   - Backup lena important hai

3. **Port:**
   - MongoDB default port: `27017`
   - Agar port already use ho raha hai, to change karein

---

## 🆘 Troubleshooting

### **Error: "MongoDB connection failed"**

**Solution:**
1. MongoDB service check karein:
   ```bash
   brew services list  # macOS
   ```
2. Agar stopped hai, to start karein:
   ```bash
   brew services start mongodb-community
   ```

### **Error: "Port 27017 already in use"**

**Solution:**
1. Check karein ke koi aur MongoDB instance running to nahi:
   ```bash
   lsof -i :27017
   ```
2. Agar hai, to stop karein ya port change karein

### **Error: "Database not found"**

**Solution:**
1. Test accounts create karein:
   ```bash
   cd server
   node scripts/createAllTestAccounts.js
   ```

---

## 📦 Quick Setup Script

Agar manually setup karna mushkil lag raha hai, to yeh script use karein:

```bash
# macOS
./setup-offline.sh

# Windows
setup-offline.bat
```

---

## ✅ Final Checklist

- [ ] MongoDB local install ho gaya
- [ ] `.env` file update ho gayi
- [ ] Test accounts create ho gaye
- [ ] Internet disconnect karke test kiya
- [ ] Sab kuch kaam kar raha hai
- [ ] Teacher ko demo dene ke liye ready hai!

---

## 🎉 Success!

Ab aapka project **completely offline** chalega - **Internet ki zaroorat nahi hogi!**

Teacher ko demo dene se pehle:
1. Internet disconnect karein
2. Backend start karein
3. Frontend start karein
4. Browser mein open karein
5. Login karein aur demo dikhayein!

**Good luck! 🚀**

