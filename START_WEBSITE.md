# 🚀 Website Start Karne Ke Steps

## ❌ Error: "This site can't be reached - localhost refused to connect"

**Problem:** Frontend server nahi chal raha hai.

---

## ✅ Solution: Server Start Karein

### **Method 1: Two Terminals (Recommended)**

**Terminal 1 - Backend:**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/client
npm start
```

**Ya PORT specify karein:**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/client
PORT=3001 npm start
```

---

### **Method 2: Background Mein Start**

**Backend (background):**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start &
```

**Frontend (background):**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/client
PORT=3001 npm start &
```

---

### **Method 3: Script Use Karein**

**Start script banayein:**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System
./START_EVERYTHING.sh
```

---

## ✅ After Starting:

1. **Backend:** `http://localhost:5000` (API server)
2. **Frontend:** `http://localhost:3001` (Website)

---

## 🔍 Verify:

**Backend check:**
- Terminal mein: "Server running on port 5000"
- Browser: `http://localhost:5000` (API test)

**Frontend check:**
- Terminal mein: "Compiled successfully!"
- Browser: `http://localhost:3001` (Website)

---

## ⚠️ Common Issues:

### **Port Already in Use:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Then start again
cd client && npm start
```

### **Dependencies Missing:**
```bash
cd client
npm install

cd ../server
npm install
```

---

**🚀 Ab servers start karein aur website dekhein!**

