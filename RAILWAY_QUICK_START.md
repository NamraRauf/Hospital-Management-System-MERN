# ⚡ Railway Quick Start - 3 Minutes Me Backend Live!

## 🚀 Railway Par Naya Project Deploy

### Step 1: Railway Dashboard (30 seconds)

1. [https://railway.app/dashboard](https://railway.app/dashboard) kholo
2. **"+ New"** (purple button) click karo
3. **"Deploy from GitHub repo"** select karo
4. **"Hospital-Management-System-MERN"** repository select karo
5. **"Deploy Now"** click karo

---

### Step 2: Settings (1 minute)

1. Project open hone ke baad, **Settings** tab kholo
2. **Root Directory:** `server` type karo
3. **Start Command:** `npm start` (already set hoga)

---

### Step 3: Environment Variables (1 minute)

**Variables** tab me jao aur yeh 4 variables add karo:

```
MONGO_URI = mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority
```

```
JWT_SECRET = hospital-secret-key-2024
```

```
NODE_ENV = production
```

```
PORT = 5000
```

**Kaise add:**
- **"+ New Variable"** click karo
- Name paste karo (jaise: `MONGO_URI`)
- Value paste karo
- **"Add"** click karo
- Har variable ke liye repeat karo

---

### Step 4: Wait & Get URL (30 seconds)

1. Railway automatically deploy kar dega
2. **Deployments** tab me progress dekho
3. Complete hone ke baad, **Settings** → **"Generate Domain"** click karo
4. **Backend URL copy karo** (jaise: `https://hospital-backend.up.railway.app`)

---

### Step 5: Test (10 seconds)

1. Backend URL browser me kholo
2. Agar yeh dikhe: `🏥 Hospital Management System API is Running`
3. To **SUCCESS! ✅**

---

## ✅ Checklist

- [ ] Railway par project create kiya
- [ ] Root Directory = `server` set kiya
- [ ] 4 environment variables add kiye
- [ ] Deploy complete ho gaya
- [ ] Backend URL copy kiya
- [ ] Test successful

---

## 🎯 Next: Frontend Deploy

Backend URL milne ke baad:

1. Netlify par jao: [https://netlify.com](https://netlify.com)
2. GitHub se connect karo
3. **Base directory:** `client`
4. **Environment variable:** `REACT_APP_API_URL` = `https://your-backend-url.railway.app/api`
5. Deploy!

---

## 🐛 Quick Fixes

**MongoDB connect nahi ho raha?**
- MongoDB Atlas → Network Access → `0.0.0.0/0` add karo

**Build fail?**
- Logs check karo
- Root Directory = `server` verify karo

---

**📖 Detailed guide: `RAILWAY_DEPLOY_NOW.md`**

