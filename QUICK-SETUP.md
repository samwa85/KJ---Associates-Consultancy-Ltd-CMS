# 🚀 Quick Setup Guide

This guide helps you set up a new project using this CMS template in **15-20 minutes**.

## Your Infrastructure
- **Frontend**: 20i Hosting
- **Backend API**: Coolify Server
- **Database**: Supabase on Coolify

---

## Option A: Automated Setup (Recommended)

### 1. Create New Project from Template
```bash
# On GitHub: Click "Use this template" → Create new repo
# Then clone your new repo:
git clone https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
cd YOUR_NEW_REPO
```

### 2. Run Setup Script
```bash
chmod +x setup.sh
./setup.sh
```

The script will ask for:
- Supabase URL and keys
- Backend API URL
- Admin password
- Company name

It automatically updates all config files!

### 3. Setup Database
1. Open your Supabase SQL Editor
2. Copy contents of `database/supabase-schema.sql`
3. Run the SQL

### 4. Deploy Backend to Coolify
```bash
# On your Coolify server:
cd /var/www/your-project/server
npm install --production
pm2 start src/index.js --name your-api
pm2 save
```

### 5. Seed Initial Data (Optional)
```bash
cd server
node scripts/seed-from-cms-defaults.js
```

### 6. Deploy Frontend to 20i
- Upload all files (except `/server` folder) to 20i
- Or connect GitHub for auto-deploy

---

## Option B: Manual Setup

### Step 1: Supabase Setup (5 mins)

1. **Create Supabase instance in Coolify**
   - Coolify Dashboard → New Resource → Supabase

2. **Get your credentials:**
   - `SUPABASE_URL`: Your Supabase API URL
   - `SUPABASE_ANON_KEY`: Public anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key (keep secret!)

3. **Run database schema:**
   - Open Supabase SQL Editor
   - Paste contents of `database/supabase-schema.sql`
   - Click "Run"

### Step 2: Configure Frontend (3 mins)

**Edit `js/config.js`:**
```javascript
// Change line ~35:
apiUrl = 'http://YOUR_SERVER_IP:3001/api';
```

**Edit `js/supabase-config.js`:**
```javascript
window.SUPABASE_URL = 'YOUR_SUPABASE_URL';
window.SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

**Edit `admin/index.html` (line ~549):**
```javascript
const ADMIN_PASSWORD = 'YourSecurePassword123!';
```

### Step 3: Configure Backend (3 mins)

**Create `server/.env`:**
```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ALLOWED_ORIGINS=https://your-domain.com
FRONTEND_URL=https://your-domain.com
```

### Step 4: Deploy Backend (5 mins)

**On your Coolify/VPS server:**
```bash
# Create directory
mkdir -p /var/www/your-project
cd /var/www/your-project

# Clone repo (or upload server folder)
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git temp
mv temp/server .
rm -rf temp

# Install dependencies
cd server
npm install --production

# Create .env file (copy from above)
nano .env

# Start with PM2
pm2 start src/index.js --name your-api
pm2 save
pm2 startup
```

**Open firewall:**
```bash
ufw allow 3001/tcp
```

### Step 5: Deploy Frontend (2 mins)

Upload to 20i:
- All HTML files
- `/js` folder
- `/css` folder
- `/admin` folder
- `/uploads` folder
- Do NOT upload `/server` folder

---

## 📋 Quick Checklist

- [ ] Created new repo from template
- [ ] Supabase instance created in Coolify
- [ ] Database schema applied
- [ ] `js/config.js` updated with API URL
- [ ] `js/supabase-config.js` updated with Supabase credentials
- [ ] `admin/index.html` password changed
- [ ] `server/.env` created with all credentials
- [ ] Backend deployed and running (PM2)
- [ ] Firewall port 3001 open
- [ ] Frontend uploaded to 20i
- [ ] Tested: Website loads data
- [ ] Tested: Admin login works

---

## 🔧 Useful Commands

**Check if backend is running:**
```bash
pm2 status
curl http://localhost:3001/api/
```

**View backend logs:**
```bash
pm2 logs your-api
```

**Restart backend:**
```bash
pm2 restart your-api
```

**Seed database with sample data:**
```bash
cd server
node scripts/seed-from-cms-defaults.js
```

---

## 🆘 Troubleshooting

### API returns HTML instead of JSON
- Backend not running, or wrong port
- Check: `pm2 status` and `curl http://localhost:3001/api/`

### CORS errors in browser
- Update `ALLOWED_ORIGINS` in `server/.env`
- Restart: `pm2 restart your-api`

### Database errors
- Check Supabase credentials in `.env`
- Verify schema was applied in SQL Editor

### Admin password not working
- Clear browser localStorage
- Check password in `admin/index.html` line ~549

---

## 📁 Project Structure

```
├── admin/              # CMS Admin Panel
│   └── index.html      # Main admin page (password on line ~549)
├── js/
│   ├── config.js       # API URL configuration
│   ├── supabase-config.js  # Supabase credentials
│   └── main.js         # Frontend logic
├── server/             # Backend API (deploy to Coolify)
│   ├── src/
│   ├── scripts/
│   └── .env            # Server credentials (create this)
├── database/
│   └── supabase-schema.sql  # Run in Supabase SQL Editor
├── setup.sh            # Automated setup script
└── QUICK-SETUP.md      # This file
```

