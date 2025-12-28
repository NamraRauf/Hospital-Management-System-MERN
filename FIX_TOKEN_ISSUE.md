# 🔧 Token Issue Fix

## ❌ Problem: Token Push Nahi Ho Raha

**Error:** `Permission denied` - Token kaam nahi kar raha.

---

## ✅ Solution: Token Scopes Check Karein

### **Step 1: Token Scopes Verify**

1. **GitHub par jao:**
   ```
   https://github.com/settings/tokens
   ```

2. **Apne token pe click karein:**
   - Token: `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`

3. **Scopes check karein:**
   - ✅ **repo** - Full control of private repositories (REQUIRED)
   - ✅ **workflow** - Update GitHub Action workflows (optional)

4. **Agar 'repo' scope nahi hai:**
   - Token delete karein
   - Naya token generate karein with **'repo'** scope

---

### **Step 2: Naya Token Generate (Agar Scopes Galat Hain)**

1. **GitHub Settings:**
   ```
   https://github.com/settings/tokens
   ```

2. **"Generate new token (classic)"** click karein

3. **Settings:**
   - **Note:** `HMS-Push-Token-v2`
   - **Expiration:** 90 days
   - **Scopes:**
     - ✅ **repo** (Full control of private repositories) - **REQUIRED**
     - ✅ **workflow** (optional)

4. **"Generate token"** click karein

5. **Token copy karein**

---

### **Step 3: Push Karein**

**Naya token milne ke baad:**

```bash
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System

# Remote update
git remote set-url origin https://YOUR_NEW_TOKEN@github.com/NamraRauf/Hospital-Management-System-MERN.git

# Push
git push origin master
```

---

## 🔍 Alternative: GitHub Desktop Use Karein

**Agar token se issue ho raha hai:**

1. **GitHub Desktop install karein:**
   ```
   https://desktop.github.com/
   ```

2. **Repository open karein:**
   - File → Add Local Repository
   - `/Users/zainrauf/hmsfypnr/Hospital-Management-System` select karein

3. **Push karein:**
   - "Push origin" button click karein

---

## 🆘 Debugging

### **Token Test:**
```bash
# API test
curl -H "Authorization: token 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" \
  https://api.github.com/repos/NamraRauf/Hospital-Management-System-MERN

# Agar 200 aaye, token sahi hai
# Agar 401/403 aaye, token issue hai
```

### **Git Credentials Clear:**
```bash
# macOS Keychain clear
git credential-osxkeychain erase <<EOF
host=github.com
protocol=https
EOF

# Git config clear
git config --global --unset credential.helper
```

---

**🎯 Token scopes check karein - 'repo' scope zaroori hai!**

