# 🔗 Connection String Setup (User Already Created!)

## ✅ Good News:
**Database user `hospitaluser` already created hai!** 
- Username: `hospitaluser`
- Role: `atlasAdmin@admin` ✅

---

## 🎯 Ab Connection String Lo:

### Step 1: Database Page Pe Jao

1. **Left sidebar** mein **"Database"** click karo
2. Apne **cluster** ko dekho (cluster0.xxxxx)
3. Cluster ke saamne **"Connect"** button click karo

### Step 2: Connection Method Select Karo

1. Popup mein **"Connect your application"** option select karo
2. **Driver:** Node.js (already selected hoga)
3. **Version:** Latest (4.1 or later)

### Step 3: Connection String Copy Karo

**Example connection string:**
```
mongodb+srv://hospitaluser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Important:** 
- `<password>` ko apne password se replace karna hoga
- Password: `namra1234` (jo aapne set kiya tha)

---

## 🔧 .env File Update Karo:

### Terminal Mein:

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
nano .env
```

### File Mein Yeh Add/Update Karo:

j```
MONGO_URI=mongodb+srv://hospitaluser:namra1234@cluster0.xxxxx.mongodb.net/hospital-management?retryWrites=true&w=majority
PORT=6000
JWT_SECRET=hospital-management-secret-key-2024
```

**Replace:**
- `cluster0.xxxxx.mongodb.net` → Apna actual cluster URL
- `namra1234` → Apna actual password (agar different hai)

**Save:**
- `Ctrl+X`
- `Y` (yes)
- `Enter`

---

## 🚀 Server Restart Karo:

```bash
lsof -ti:6000 | xargs kill -9
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
🚀 Server running on port 6000
```

---

## ✅ Next Steps:

1. ✅ Database user created (done!)
2. ⏳ Connection string lo
3. ⏳ .env file update karo
4. ⏳ Server restart karo
5. ⏳ Test karo

---

## 🎯 Quick Checklist:

- [x] Database user created (`hospitaluser`)
- [ ] Connection string copied
- [ ] .env file updated
- [ ] Server restarted
- [ ] "MongoDB Connected Successfully" dikha

**Connection string lo aur .env update karo, phir server restart karo!** 🚀

