# ✅ Connection String Mil Gaya! Ab Update Karo

## 🎯 Connection String:

**Current:**
```
mongodb+srv://<db_username>:<db_password>@clusterfyphmsnr.ij1w3r9.mongodb.net/?appName=ClusterfypHMSNR
```

**Copy karo:** Copy icon click karo (connection string ke saamne)

---

## 🔧 Ab Ye Replace Karo:

### Step 1: Password Replace Karo

- `<db_username>` → `hospitaluser` (already theek hai)
- `<db_password>` → `namra1234` (ya jo bhi password aapne set kiya)

### Step 2: Database Name Add Karo

- `/?appName=ClusterfypHMSNR` ko replace karo
- `/hospital-management?retryWrites=true&w=majority` add karo

---

## ✅ Final Connection String:

```
mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital-management?retryWrites=true&w=majority
```

---

## 🔧 .env File Update Karo:

### Terminal Mein:

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
nano .env
```

### File Mein Yeh Add Karo:

```
MONGO_URI=mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital-management?retryWrites=true&w=majority
PORT=6000
JWT_SECRET=hospital-management-secret-key-2024
```

**Save:** `Ctrl+X`, phir `Y`, phir `Enter`

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

## ✅ Checklist:

- [x] Connection string dikh raha hai
- [ ] Connection string copy kiya
- [ ] Password replace kiya (namra1234)
- [ ] Database name add kiya (/hospital-management)
- [ ] .env file update kiya
- [ ] Server restart kiya
- [ ] "MongoDB Connected Successfully" dikha

**Ab connection string copy karo aur .env update karo!** 🚀

