# ⚡ Quick MongoDB Atlas Setup (5 Minutes)

## 🎯 Aap Abhi MongoDB Atlas Page Pe Ho - Follow These Steps:

### 1️⃣ Get Started Click Karo
- Page pe **"Get Started"** green button click karo
- Ya: https://www.mongodb.com/cloud/atlas/register

### 2️⃣ Sign Up (1 min)
- Email enter
- Password set
- Sign up

### 3️⃣ Create Cluster (2 min)
- "Build a Database" → **FREE** tier
- AWS → Mumbai region → Create

### 4️⃣ Create User (1 min)
- "Database Access" → Add User
- Username: `hospitaluser`
- Password: (save karo!)
- Add User

### 5️⃣ Network Access (30 sec)
- "Network Access" → Add IP
- "Allow from anywhere" (0.0.0.0/0)
- Confirm

### 6️⃣ Connection String (1 min)
- "Database" → Connect
- "Connect your application"
- Connection string copy

**Example:**
```
mongodb+srv://hospitaluser:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 7️⃣ .env File Update

**Terminal:**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
nano .env
```

**Add:**
```
MONGO_URI=mongodb+srv://hospitaluser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hospital-management?retryWrites=true&w=majority
PORT=6000
JWT_SECRET=secret-key-12345
```

**Save:** `Ctrl+X`, `Y`, `Enter`

### 8️⃣ Server Restart

```bash
lsof -ti:6000 | xargs kill -9
cd server && npm start
```

**Wait for:**
```
✅ MongoDB Connected Successfully
```

### 9️⃣ Test

Browser: `http://localhost:3000/register`
- Form fill → Register
- **Success!** ✅

---

## ✅ Done!

**Ab sab kaam karega!** 🚀

