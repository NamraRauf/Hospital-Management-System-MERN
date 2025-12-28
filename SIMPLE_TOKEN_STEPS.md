# 🎯 Token Add Karne Ka Bahut Simple Tarika

## 📋 Step-by-Step (Copy-Paste):

---

## **STEP 1: Token Banayein** (Browser Mein)

1. **Browser kholen**
2. **Ye URL open karein:**
   ```
   https://github.com/settings/tokens
   ```
3. **"Generate new token" button click karein**
4. **"Generate new token (classic)" click karein**
5. **Form fill karein:**
   - **Note:** `Hospital-System` (kuch bhi likh sakte hain)
   - **Expiration:** 90 days select karein
   - **Scopes:** Neeche scroll karein, **"repo"** ke saamne ✅ check karein
6. **Neeche "Generate token" button click karein**
7. **Token dikhega** - **SABSE IMPORTANT:** Token copy kar lein! (Ctrl+C ya Cmd+C)
   - Token kuch aisa hoga: `ghp_1234567890abcdefghijklmnopqrstuvwxyz`

---

## **STEP 2: Token Terminal Mein Add Karein**

### **Method A: Token URL Mein Add (Easiest)**

Terminal mein ye command run karein:

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System
```

Phir ye command run karein (YOUR_TOKEN ki jagah apna copied token paste karein):

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/NamraRauf/Hospital-Management-System-MERN.git
```

**Example:**
Agar aapka token hai: `ghp_abc123xyz789`
To command ye hogi:
```bash
git remote set-url origin https://ghp_abc123xyz789@github.com/NamraRauf/Hospital-Management-System-MERN.git
```

**Kaise karein:**
1. Token copy karein (browser se)
2. Terminal mein command type karein: `git remote set-url origin https://`
3. Token paste karein: `ghp_abc123xyz789`
4. Phir type karein: `@github.com/NamraRauf/Hospital-Management-System-MERN.git`
5. Enter press karein

---

### **Method B: Password Prompt Mein Token (Agar Method A Se Problem Ho)**

**Step 1: Remote Normal URL Par Set Karein**

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System
git remote set-url origin https://github.com/NamraRauf/Hospital-Management-System-MERN.git
```

**Step 2: Push Karein**

```bash
git push -u origin master
```

**Step 3: Jab Password Puchhe:**

- **Username:** `NamraRauf` type karein, Enter
- **Password:** Apna **TOKEN** paste karein (GitHub password nahi!), Enter

---

## 🎯 Sabse Simple Method (Copy-Paste):

### **Option 1: Token URL Mein (Recommended)**

```bash
# Step 1: Project folder mein jayein
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System

# Step 2: Token URL mein add (YOUR_TOKEN replace karein apne token se)
git remote set-url origin https://YOUR_TOKEN@github.com/NamraRauf/Hospital-Management-System-MERN.git

# Step 3: Push
git push -u origin master
```

### **Option 2: Password Prompt (Easier)**

```bash
# Step 1: Project folder
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System

# Step 2: Normal URL
git remote set-url origin https://github.com/NamraRauf/Hospital-Management-System-MERN.git

# Step 3: Push (password prompt mein token paste karein)
git push -u origin master
```

---

## 💡 Visual Example:

**Token URL Method:**
```
git remote set-url origin https://[APNA_TOKEN_YAHAN_PASTE]@github.com/NamraRauf/Hospital-Management-System-MERN.git
```

**Real Example:**
```
git remote set-url origin https://ghp_1234567890abcdefghijklmnopqrstuvwxyz@github.com/NamraRauf/Hospital-Management-System-MERN.git
```

---

## ✅ Success:

Push successful hone par ye dikhega:
```
Enumerating objects: 125, done.
Writing objects: 100% (125/125), done.
To https://github.com/NamraRauf/Hospital-Management-System-MERN.git
 * [new branch]      master -> master
```

---

**🚀 Option 2 try karein - sabse simple hai!**

