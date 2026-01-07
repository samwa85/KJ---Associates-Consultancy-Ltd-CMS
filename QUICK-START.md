# 🚀 Quick Start Guide - KJ & Associates CMS

## ⚡ TL;DR - Start Working in 30 Seconds

```bash
# 1. Start the API server (REQUIRED)
npm run dev

# 2. Open CMS Admin in browser
# File: admin/index.html
# Password: qwerty7890@

# 3. Make your changes (create/edit/delete projects)

# 4. View on website
# File: projects/index.html
# Click "Refresh ↻" to see new data
```

---

## 🎯 Common Tasks

### **Add a New Project**
1. ✅ Make sure API server is running (`npm run dev`)
2. Open `admin/index.html` in browser
3. Enter password: `qwerty7890@`
4. Click "Projects" tab
5. Click "Add New Project"
6. Fill in project details
7. Click "Save"
8. Open `projects/index.html` and click "Refresh ↻"

### **Edit Existing Project**
1. Open `admin/index.html`
2. Go to "Projects" tab
3. Click "Edit" on the project
4. Make changes
5. Click "Save"
6. Refresh website to see changes

### **Delete a Project**
1. Open `admin/index.html`
2. Go to "Projects" tab
3. Click "Delete" on the project
4. Confirm deletion
5. Refresh website

---

## ⚠️ Important Rules

### **ALWAYS Start the API Server First**
```bash
npm run dev
```

**Why?** The website needs the API server to fetch fresh data from the database.

**What happens if you don't?**
- Website shows old cached data (35 projects instead of current 50+)
- New projects won't appear
- Changes won't be visible

### **How to Know if API Server is Running**
Look for this in your terminal:
```
╔═══════════════════════════════════════════════════════╗
║   KJ & Associates CMS API Server                      ║
║   Running on: http://localhost:3001                   ║
║   Environment: development                            ║
╚═══════════════════════════════════════════════════════╝
```

---

## 🔄 Workflow

```
┌─────────────────────────────────────────────┐
│ 1. Start API Server (npm run dev)          │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 2. Open CMS Admin (admin/index.html)       │
│    Password: qwerty7890@                    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 3. Make Changes (Add/Edit/Delete)          │
│    Changes saved to Supabase Database      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 4. View on Website (projects/index.html)   │
│    Click "Refresh ↻" to reload data        │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Troubleshooting

### **Problem: Changes not showing on website**
**Solution:**
1. Check if API server is running
2. Click "Refresh ↻" button on website
3. Or clear cache: `localStorage.removeItem('kj_cms_data')` in console

### **Problem: "Connection Refused" error**
**Solution:**
```bash
npm run dev
```

### **Problem: API server won't start**
**Solution:**
```bash
cd server
npm install
cd ..
npm run dev
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| **CMS Admin** | `admin/index.html` |
| **Main Website** | `index.html` |
| **Projects Page** | `projects/index.html` |
| **API Server** | `server/src/index.js` |
| **Configuration** | `js/config.js` |
| **Database** | Supabase (cloud) |

---

## 🔐 Credentials

| System | Credential |
|--------|-----------|
| **CMS Admin Password** | `qwerty7890@` |
| **Supabase URL** | `https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io` |
| **API Server** | `http://localhost:3001` (local dev) |

---

## 💡 Pro Tips

1. **Keep Terminal Open:** Don't close the terminal running `npm run dev`
2. **Use Refresh Button:** Easier than clearing cache manually
3. **Check Console:** Press F12 to see what's happening
4. **Test Changes:** Always verify on website after editing in CMS
5. **Save Often:** CMS auto-saves, but click "Save" to be sure

---

## 📊 Current System Status

✅ **API Server:** Running on port 3001  
✅ **Database:** Connected to Supabase  
✅ **Projects:** 50 total (33 completed, 17 ongoing)  
✅ **CRUD Operations:** Fully functional  
✅ **Cache Fallback:** Working (shows old data if API down)  

---

## 🆘 Emergency Commands

```bash
# Kill process on port 3001
lsof -i :3001
kill -9 <PID>

# Restart API server
npm run dev

# Clear browser cache
# In browser console:
localStorage.clear()
location.reload()

# Check if server is responding
curl http://localhost:3001/health
```

---

**Last Updated:** January 7, 2026  
**Status:** ✅ Operational  
**Next Review:** Before production deployment
