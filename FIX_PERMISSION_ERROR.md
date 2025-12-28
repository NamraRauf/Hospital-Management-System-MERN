# 🔧 Fix: Permission Denied Error (403)

## ❌ Error:
```
remote: Permission to NamraRauf/Hospital-Management-System-MERN.git denied to zainpratice.
fatal: unable to access 'https://github.com/NamraRauf/Hospital-Management-System-MERN.git/': The requested URL returned error: 403
```

## 🔍 Problem:
- Git mein **wrong user** configured hai (`zainpratice`)
- Repository **NamraRauf** ka hai
- Authentication fail ho rahi hai

---

## ✅ Solutions:

### **Solution 1: Git Credentials Clear Karein (Recommended)**

**Step 1: Credentials Clear Karein**
```bash
git credential-osxkeychain erase
host=github.com
protocol=https
```

**Ya Mac Keychain se:**
1. **Spotlight** (Cmd + Space) → "Keychain Access"
2. Search: `github.com`
3. Sab entries delete karein

**Step 2: Personal Access Token Banayein**
1. https://github.com/settings/tokens
2. "Generate new token" → "Generate new token (classic)"
3. Name: `Hospital-Management-System`
4. Expiration: 90 days (ya unlimited)
5. Scopes: ✅ **repo** (sab check karein)
6. "Generate token"
7. **Token copy karein** (sirf ek baar dikhega!)

**Step 3: Push Karein**
```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System
git push -u origin master
```

**Jab prompt kare:**
- Username: `NamraRauf`
- Password: `[apna token paste karein]` (GitHub password nahi!)

---

### **Solution 2: Git Config Update Karein**

```bash
# Git user name update
git config --global user.name "NamraRauf"

# Git email check (optional)
git config --global user.email "namrarauf19@gmail.com"

# Credential helper set
git config --global credential.helper osxkeychain
```

---

### **Solution 3: URL Mein Token Include Karein**

**Temporary fix (testing ke liye):**

```bash
# Token URL mein add karein
git remote set-url origin https://[YOUR-TOKEN]@github.com/NamraRauf/Hospital-Management-System-MERN.git

# Push karein
git push -u origin master
```

**Note:** Token URL mein directly add karna secure nahi hai, lekin quick fix ke liye kaam karega.

---

### **Solution 4: SSH Use Karein (Best for Long-term)**

**Step 1: SSH Key Check Karein**
```bash
ls -la ~/.ssh
```

**Step 2: Agar SSH key nahi hai, to banayein**
```bash
ssh-keygen -t ed25519 -C "namrarauf19@gmail.com"
# Enter press karein (default location)
# Passphrase optional hai
```

**Step 3: SSH Key GitHub Par Add Karein**
```bash
# Key copy karein
cat ~/.ssh/id_ed25519.pub
# Output copy karein
```

1. https://github.com/settings/keys
2. "New SSH key" click karein
3. Title: "MacBook Pro"
4. Key: Paste karein (jo copy kiya)
5. "Add SSH key"

**Step 4: Remote URL SSH Mein Change Karein**
```bash
git remote set-url origin git@github.com:NamraRauf/Hospital-Management-System-MERN.git
git push -u origin master
```

---

### **Solution 5: GitHub Desktop (Easiest)**

1. **Download:** https://desktop.github.com
2. **Install aur login karein** (NamraRauf account se)
3. **File → Add Local Repository**
   - Select: `/Users/zainrauf/hmsfypnr/Hospital-Management-System`
4. **"Publish repository"**
   - Name: `Hospital-Management-System-MERN`
   - "Publish repository"

---

## 🎯 Quick Fix Commands:

```bash
# Step 1: Credentials clear
git credential-osxkeychain erase <<EOF
host=github.com
protocol=https
EOF

# Step 2: Push (token use karein)
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System
git push -u origin master
# Username: NamraRauf
# Password: [Personal Access Token]
```

---

## 📋 Personal Access Token Steps:

1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Fill:**
   - Note: `Hospital-Management-System`
   - Expiration: 90 days (ya unlimited)
   - Scopes: ✅ **repo** (sab check karein)
4. **Click:** "Generate token"
5. **Copy token** (sirf ek baar dikhega!)

---

## ✅ After Fix:

Success message dikhna chahiye:
```
Enumerating objects: 125, done.
Counting objects: 100% (125/125), done.
Writing objects: 100% (125/125), done.
To https://github.com/NamraRauf/Hospital-Management-System-MERN.git
 * [new branch]      master -> master
```

---

**🚀 Try Solution 1 pehle - sabse easy hai!**

