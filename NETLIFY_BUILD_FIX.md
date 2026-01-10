# 🔧 Netlify Build Failed - Fix Steps

## ❌ Problem: Build Failed

Error: "Failed during stage 'building site': Build script returned non-zero exit..."

---

## ✅ Solution: Build Settings Fix

### STEP 1: Project Configuration Check Karo

1. Left sidebar me **"Project configuration"** click karo
2. **"Build settings"** section me jao
3. Verify karo ke yeh settings hain:

```
Base directory: client
Build command: npm install && npm run build
Publish directory: client/build
```

---

### STEP 2: Agar Settings Galat Hain, To Fix Karo

1. **Base directory:** `client` set karo
2. **Build command:** `npm install && npm run build` set karo
3. **Publish directory:** `client/build` set karo
4. **"Save"** button click karo

---

### STEP 3: Build Logs Check Karo

1. **"Deploys"** tab click karo
2. Failed deployment par click karo
3. **"Deploy log"** me scroll karo
4. Error message dekho (kya exact error hai?)

---

## 🔍 Common Issues & Fixes

### Issue 1: Base Directory Galat

**Error:** "Cannot find package.json"
**Fix:** Base directory = `client` set karo

### Issue 2: Build Command Galat

**Error:** "npm: command not found"
**Fix:** Build command = `npm install && npm run build` set karo

### Issue 3: Publish Directory Galat

**Error:** "Directory not found"
**Fix:** Publish directory = `client/build` set karo

### Issue 4: Dependencies Install Nahi Ho Rahi

**Error:** "Module not found"
**Fix:** Base directory = `client` verify karo

---

## 🚀 Quick Fix Steps

1. **Project configuration** → **Build settings**
2. Verify:
   - Base directory: `client`
   - Build command: `npm install && npm run build`
   - Publish directory: `client/build`
3. **Save** karo
4. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
5. Wait karo (3-5 minutes)

---

## 📋 Exact Settings (Copy-Paste)

```
Base directory: client
Build command: npm install && npm run build
Publish directory: client/build
```

---

**📞 Logs me exact error batao, main specific fix bataunga!**

