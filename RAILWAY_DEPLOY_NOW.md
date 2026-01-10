# 🚂 Railway Par Naya Project Deploy - Step by Step

## 🎯 Naya Backend Project Deploy Karein

### Step 1: Railway Dashboard Par Jao

1. Railway dashboard kholo: [https://railway.app/dashboard](https://railway.app/dashboard)
2. **"+ New"** button (purple) click karo
3. **"Deploy from GitHub repo"** select karo

---

### Step 2: GitHub Repository Select Karein

1. GitHub account se connect karo (agar pehle se nahi hai)
2. Repository list me se **"Hospital-Management-System-MERN"** select karo
3. **"Deploy Now"** click karo

---

### Step 3: Project Settings Configure Karein

Railway automatically detect karega, lekin verify karo:

1. **Settings** tab kholo
2. **Root Directory** check karo:
   - Agar empty hai, to type karo: `server`
   - Ya dropdown se `server` select karo

3. **Start Command** check karo:
   - Should be: `npm start`
   - Agar nahi hai, to manually add karo

---

### Step 4: Environment Variables Add Karein

**Variables** tab me jao aur yeh add karo:

```
MONGO_URI = mongodb+srv://hospitaluser:namra1234@clusterfyphmsnr.ij1w3r9.mongodb.net/hospital?retryWrites=true&w=majority
```

```
JWT_SECRET = hospital-secret-key-2024-production
```

```
NODE_ENV = production
```

```
PORT = 5000
```

**Kaise add karein:**
1. **Variables** tab click karo
2. **"+ New Variable"** click karo
3. Name aur value paste karo
4. **"Add"** click karo
5. Har variable ke liye repeat karo

---

### Step 5: Deploy Karein

1. Railway automatically deploy start kar dega
2. **Deployments** tab me progress dekho
3. Wait karo (2-3 minutes)
4. Build complete hone ke baad, **"View Logs"** se logs check karo

---

### Step 6: Backend URL Copy Karein

1. Deploy complete hone ke baad
2. **Settings** tab me jao
3. **"Generate Domain"** button click karo (agar automatically nahi aaya)
4. **Backend URL copy karo** (jaise: `https://hospital-backend-production.up.railway.app`)
5. **Important:** URL me `/api` add mat karo, bas base URL copy karo

---

### Step 7: Test Karein

1. Backend URL kholo browser me
2. Agar yeh dikhe: `🏥 Hospital Management System API is Running`
3. To **SUCCESS! ✅**

---

## 🔧 Important Notes

### MongoDB Atlas IP Whitelist

1. MongoDB Atlas dashboard kholo
2. **Network Access** → **IP Access List**
3. **"Add IP Address"** click karo
4. **"Allow Access from Anywhere"** select karo (ya `0.0.0.0/0` add karo)
5. **"Confirm"** click karo

### Railway Free Trial

- Trial 1 day ya $4.11 credits tak hai
- Demo ke liye sufficient hai
- Agar long-term chahiye, to plan upgrade karo

---

## 🐛 Troubleshooting

### Build Fail Ho Raha Hai?

1. **Logs** check karo
2. Verify `Root Directory` = `server`
3. Verify `Start Command` = `npm start`
4. Check Node.js version (should be 14+)

### MongoDB Connect Nahi Ho Raha?

1. **MONGO_URI** check karo (sahi hai?)
2. MongoDB Atlas me IP whitelist check karo
3. Database user password correct hai?
4. Connection string me special characters properly encoded hain?

### Port Error?

- Railway automatically PORT assign karta hai
- `process.env.PORT` use karo (already code me hai ✅)
- Environment variable me PORT add karo (optional)

---

## 📋 Checklist

- [ ] Railway par naya project create kiya
- [ ] GitHub repository connect kiya
- [ ] Root Directory = `server` set kiya
- [ ] Environment variables add kiye (MONGO_URI, JWT_SECRET, NODE_ENV, PORT)
- [ ] Deploy complete ho gaya
- [ ] Backend URL copy kiya
- [ ] Test kiya (API running hai)
- [ ] MongoDB Atlas IP whitelist update kiya

---

## 🎉 Next Step: Frontend Deploy

Backend URL milne ke baad, frontend deploy karo Netlify par:

1. `REACT_APP_API_URL` = `https://your-backend-url.railway.app/api`
2. Frontend deploy karo (see `QUICK_DEPLOY.md`)

---

**✅ Backend deploy ho gaya? Ab frontend deploy karo!**

