# 🔧 Fix: "You must choose at least one role or privilege"

## ❌ Error:
**"▲ You must choose at least one role or privilege."**

## ✅ Solution:

### Step 1: Database User Privileges Section Mein Jao

1. Page scroll karo **"Database User Privileges"** section tak
2. **"Built-in Role"** section dekho
3. **"0 SELECTED"** button click karo (ya dropdown open karo)

### Step 2: Role Select Karo

**Option 1 (Recommended - Full Access):**
- Dropdown se **"Atlas admin"** select karo
- Yeh sab permissions dega

**Option 2 (Minimum Required):**
- **"readWrite"** select karo
- Yeh read aur write permissions dega

### Step 3: Add User Click Karo

1. Role select karne ke baad
2. Page ke bottom pe **"Add User"** button click karo
3. Wait: 1-2 minutes

---

## ✅ Current Status:

- ✅ Username: `hospitaluser` (theek hai)
- ✅ Password: `namra1234` (theek hai)
- ❌ Role: **NOT SELECTED** (yeh fix karna hai)

---

## 🎯 Quick Fix:

1. **"Database User Privileges"** section scroll karo
2. **"Built-in Role"** → **"Atlas admin"** select karo
3. **"Add User"** click karo

**Done!** ✅

---

## 📝 Next Steps (User Create Ke Baad):

1. **Network Access** allow karo (0.0.0.0/0)
2. **Connection string** copy karo
3. **.env file** update karo
4. **Server restart** karo

**Ab role select karo, error fix ho jayega!** 🚀

