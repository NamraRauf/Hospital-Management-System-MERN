# 🔧 Fix IP Address - MongoDB Atlas

## ❌ Error:
**"Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted."**

---

## ✅ Solution: IP Address Add Karo

### Step 1: Network Access Page Pe Jao

1. **MongoDB Atlas** page pe ho
2. **Left sidebar** mein **"Network Access"** click karo
3. (Ya directly: https://cloud.mongodb.com/v2/6857040e8c15.../security/network/whitelist)

---

### Step 2: Add IP Address

1. **"Add IP Address"** button click karo (green button)
2. Popup open hoga

---

### Step 3: Allow Access from Anywhere (Recommended)

**Option 1 (Easiest - Development):**
- **"Allow Access from Anywhere"** select karo
- IP Address: `0.0.0.0/0` (automatically fill hoga)
- **"Confirm"** button click karo

**Option 2 (More Secure - Production):**
- **"Add Current IP Address"** click karo
- Your current IP automatically add ho jayega
- **"Confirm"** button click karo

---

### Step 4: Wait

- Wait: **1-2 minutes** (IP whitelist activate hone mein)
- Status: "Active" dikhega

---

## 🚀 Phir Server Restart Karo:

```bash
lsof -ti:6000 | xargs kill -9
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start
```

**Expected:**
```
✅ MongoDB Connected Successfully
🚀 Server running on port 6000
```

---

## ✅ Checklist:

- [ ] Network Access page pe gaya
- [ ] "Add IP Address" click kiya
- [ ] "Allow Access from Anywhere" (0.0.0.0/0) select kiya
- [ ] "Confirm" click kiya
- [ ] Wait: 1-2 minutes
- [ ] Server restart kiya
- [ ] "MongoDB Connected Successfully" dikha

---

## 💡 Quick Steps:

1. **Left sidebar** → **"Network Access"**
2. **"Add IP Address"** → **"Allow Access from Anywhere"**
3. **"Confirm"** → Wait 1-2 minutes
4. **Server restart** → Done! ✅

**Ab Network Access page pe jao aur IP add karo!** 🚀

