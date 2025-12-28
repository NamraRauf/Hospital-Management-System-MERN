# 🔧 FINAL FIX - Registration & Connection Issues

## ⚠️ Problem: "Cannot connect to server"

**Error:** Backend server se connection nahi ho raha.

---

## ✅ SOLUTION: Backend Server Restart Karo

### Step 1: Old Server Stop Karo

**Terminal mein:**
```bash
# Port 6000 pe running process kill karo
lsof -ti:6000 | xargs kill -9
```

Ya manually:
- Terminal mein `Ctrl+C` press karo (jahan server chal raha hai)

### Step 2: Backend Server Start Karo

**Terminal 1 (Backend):**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start
```

**Expected Output:**
```
✅ Starting server.js...
🚀 Server running on port 6000
✅ MongoDB Connected (ya warning)
```

**Important:** Is terminal ko **BAND MAT KARO**, chalta rehne do.

### Step 3: Frontend Already Running Hai

Frontend already `localhost:3000` pe chal raha hai.

### Step 4: Test Karo

Browser mein:
1. `http://localhost:3000/register` pe jao
2. Form fill karo
3. Register try karo

**Ab kaam karega!** ✅

---

## 🔍 Agar Phir Bhi Error Aaye:

### Check 1: Backend Running Hai?
```bash
curl http://localhost:6000/
```

**Expected:** "🏥 Hospital Management System API is Running"

### Check 2: Port 6000 Free Hai?
```bash
lsof -ti:6000
```

**Expected:** Process ID dikhega (matlab server running hai)

### Check 3: API Endpoint Test
```bash
curl http://localhost:6000/api/patients/register -X POST -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

**Expected:** Success message ya error (but connection hona chahiye)

---

## 🚀 Quick Fix Commands:

### Backend Restart:
```bash
# Kill old process
lsof -ti:6000 | xargs kill -9

# Start server
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start
```

### Check Server:
```bash
curl http://localhost:6000/
```

---

## ⚠️ MongoDB Issue:

Agar "MongoDB connection timeout" error aaye:

**Quick Fix:** MongoDB Atlas setup karo (5 minutes)
1. https://www.mongodb.com/cloud/atlas/register
2. Free cluster create
3. Connection string copy
4. `.env` file mein add karo

**Details:** `MONGODB_FIX.md`

---

## ✅ Final Checklist:

- [ ] Old backend process kill kiya
- [ ] Backend server start kiya (port 6000)
- [ ] Frontend running hai (port 3000)
- [ ] `curl http://localhost:6000/` se test kiya
- [ ] Browser mein registration try kiya

**Ab sab theek ho jayega!** 🚀

