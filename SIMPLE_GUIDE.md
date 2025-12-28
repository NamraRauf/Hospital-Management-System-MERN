# 🎯 Simple Guide - VS Code Ke Bina

## ✅ Sab Kuch Terminal Se Karo

### Step 1: Project Folder Mein Jao

Terminal kholo aur ye command run karo:

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System
```

---

### Step 2: Files Dekho

```bash
# Sab files dekho
ls -la

# Frontend files dekho
ls -la client/src/pages/

# Backend files dekho
ls -la server/
```

---

### Step 3: Project Run Karo

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

---

### Step 4: Browser Mein Kholo

Browser kholo aur jao:
```
http://localhost:3000
```

**Beautiful landing page dikhega!** ✨

---

## 📁 Important Files

### Landing Page:
```
client/src/pages/Home.js
```

### Login Page:
```
client/src/pages/Login.js
```

### Register Page:
```
client/src/pages/Register.js
```

---

## 🔍 Files Check Karne Ke Commands

### Home Page Dekho:
```bash
cat client/src/pages/Home.js | head -50
```

### Sab Pages List:
```bash
ls client/src/pages/
```

---

## ✅ Quick Test

### 1. Backend Check:
```bash
curl http://localhost:6000/
```

**Expected:** "🏥 Hospital Management System API is Running"

### 2. Frontend Check:
Browser mein: `http://localhost:3000`

**Expected:** Beautiful landing page

---

## 🎯 Simple Steps

1. **Terminal kholo**
2. **Backend start karo** (Terminal 1)
3. **Frontend start karo** (Terminal 2)
4. **Browser kholo** - `localhost:3000`
5. **Dekho magic!** ✨

---

## 💡 Tips

- **VS Code nahi chahiye** - Terminal se sab kuch ho sakta hai
- **Browser se dekho** - Website browser mein dikhegi
- **Terminal se run karo** - Commands se sab kuch

**Sab kuch terminal se ho sakta hai!** 🚀

