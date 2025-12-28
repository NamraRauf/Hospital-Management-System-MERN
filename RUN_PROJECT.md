# 🚀 Project Run Karne Ka Complete Guide

## ⚠️ Error: `ERR_CONNECTION_REFUSED` on localhost:3000

Yeh error tab aata hai jab **React frontend server start nahi hua** hai.

---

## ✅ Solution: Step-by-Step

### Step 1: Terminal Kholo (2 terminals chahiye)

**Terminal 1** - Backend ke liye
**Terminal 2** - Frontend ke liye

---

### Step 2: Backend Server Start Karo

**Terminal 1 mein:**

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm install
npm start
```

**Expected Output:**
```
✅ MongoDB Connected
🚀 Server running on port 6000
```

✅ Agar yeh dikhe to backend start ho gaya hai!

---

### Step 3: Frontend Server Start Karo

**Terminal 2 mein (Naya terminal kholo):**

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/client
npm install
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ Agar yeh dikhe to frontend start ho gaya hai!

---

### Step 4: Browser Mein Kholo

Browser mein jao:
```
http://localhost:3000
```

Ya directly:
```
http://localhost:3000/register
```

---

## 🔧 Agar Error Aaye To:

### Error 1: "npm: command not found"
**Solution:**
```bash
# Node.js install karo
brew install node
```

### Error 2: "Cannot find module"
**Solution:**
```bash
# Dependencies install karo
cd server
npm install

cd ../client
npm install
```

### Error 3: "Port 6000 already in use"
**Solution:**
```bash
# Port 6000 pe koi process chal rahi hai
# Ya .env file mein PORT change karo
```

### Error 4: "MongoDB connection error"
**Solution:**
- MongoDB local install karo ya
- MongoDB Atlas use karo
- `.env` file mein `MONGO_URI` set karo

---

## 📝 Quick Commands:

### Backend Start:
```bash
cd server
npm start
```

### Frontend Start:
```bash
cd client
npm start
```

### Dono Ek Sath (Agar concurrently install ho):
```bash
npm run dev
```

---

## ✅ Checklist:

- [ ] Backend server running on port 6000
- [ ] Frontend server running on port 3000
- [ ] MongoDB connected (ya local MongoDB running)
- [ ] Browser mein `localhost:3000` open kiya

---

## 🎯 Final Steps:

1. **Terminal 1:** Backend start karo
2. **Terminal 2:** Frontend start karo
3. **Browser:** `localhost:3000` kholo
4. **Test:** Register page dikhna chahiye

**Ab project chal jayega!** 🚀

