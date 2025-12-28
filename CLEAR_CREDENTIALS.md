# 🔧 Clear Git Credentials - Exact Steps

## ❌ Problem:
```
remote: Permission to NamraRauf/Hospital-Management-System-MERN.git denied to zainpratice.
```

Git mein **wrong user** (`zainpratice`) cached hai.

---

## ✅ Solution: Credentials Clear Karein

### **Method 1: Terminal Se (Recommended)**

**Step 1: Credentials Clear Karein**

Terminal mein ye command run karein:

```bash
printf "host=github.com\nprotocol=https\n\n" | git credential-osxkeychain erase
```

**Ya manually:**

```bash
git credential-osxkeychain erase
```

Phir ye type karein (line by line, har line ke baad Enter):
```
host=github.com
protocol=https

```
(Last line blank chhod dein - Enter press karein)

**Step 2: Verify Clear Ho Gaya**

```bash
git credential-osxkeychain get
```

Agar kuch nahi dikhe, to clear ho gaya ✅

---

### **Method 2: Mac Keychain Se (Visual)**

1. **Spotlight** (Cmd + Space) → "Keychain Access" type karein
2. **Search bar** mein `github.com` type karein
3. **Sab entries** select karein (Cmd + Click)
4. **Right-click** → "Delete" (ya Delete key press karein)
5. **Confirm** karein

---

### **Method 3: Git Config Check Karein**

```bash
# Check current config
git config --global user.name
git config --global user.email

# Update if needed
git config --global user.name "NamraRauf"
git config --global user.email "namrarauf19@gmail.com"
```

---

## 🚀 After Clearing Credentials:

### **Step 1: Personal Access Token Banayein**

1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Fill:**
   - Note: `Hospital-Management-System`
   - Expiration: 90 days (ya unlimited)
   - Scopes: ✅ **repo** (sab check karein)
4. **Click:** "Generate token"
5. **Copy token** (sirf ek baar dikhega!)

### **Step 2: Push Karein**

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System
git push -u origin master
```

**Jab prompt kare:**
- Username: `NamraRauf`
- Password: `[apna token paste karein]` (GitHub password nahi!)

---

## 🎯 Complete Command Sequence:

```bash
# 1. Credentials clear
printf "host=github.com\nprotocol=https\n\n" | git credential-osxkeychain erase

# 2. Verify
git credential-osxkeychain get

# 3. Push (token use karein)
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System
git push -u origin master
# Username: NamraRauf
# Password: [Your Token]
```

---

## ✅ Alternative: URL Mein Token Add Karein

**Temporary fix (testing ke liye):**

```bash
# Token URL mein add karein (replace YOUR_TOKEN)
git remote set-url origin https://YOUR_TOKEN@github.com/NamraRauf/Hospital-Management-System-MERN.git

# Push karein (ab password nahi puchhega)
git push -u origin master
```

**Note:** Token URL mein directly add karna secure nahi hai, lekin quick fix ke liye kaam karega.

---

## 🔒 Security Note:

Token URL mein add karne ke baad, history clear karein:

```bash
# Remove token from URL
git remote set-url origin https://github.com/NamraRauf/Hospital-Management-System-MERN.git
```

---

**🚀 Pehle credentials clear karein, phir push karein!**

