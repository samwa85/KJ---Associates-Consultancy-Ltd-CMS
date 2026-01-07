# 🚀 Deployment Guide - KJ & Associates CMS

## Overview

This guide will help you deploy the KJ & Associates CMS to production with a live API server.

---

## 📋 Prerequisites

- Node.js 18+ installed
- Supabase account and project
- Domain name (optional but recommended)
- Hosting service account (Railway, Render, Heroku, or DigitalOcean)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │   Frontend   │────────▶│  API Server  │             │
│  │  (Static)    │         │  (Node.js)   │             │
│  │              │         │  Railway/    │             │
│  │  - 20i       │         │  Render      │             │
│  │  - Netlify   │         │              │             │
│  │  - Vercel    │         └──────┬───────┘             │
│  └──────────────┘                │                      │
│                                   │                      │
│                                   ▼                      │
│                          ┌─────────────────┐            │
│                          │   Supabase DB   │            │
│                          │   (PostgreSQL)  │            │
│                          └─────────────────┘            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Step-by-Step Deployment

### **Step 1: Prepare Supabase Database**

1. **Login to Supabase Dashboard:**
   - Go to https://supabase.com
   - Select your project or create a new one

2. **Get Your Credentials:**
   ```
   Project Settings > API
   
   Copy these values:
   - Project URL (e.g., https://xxxxx.supabase.co)
   - anon/public key
   - service_role key (keep this SECRET!)
   ```

3. **Verify Database Schema:**
   - Go to SQL Editor
   - Run the schema from `database/schema.sql` if not already done
   - Ensure all tables exist: projects, team_members, clients, etc.

4. **Configure RLS Policies:**
   - For production, use secure policies from `database/secure-policies.sql`
   - Or keep permissive policies if you want public read access

---

### **Step 2: Deploy API Server**

We'll use **Railway** (free tier available) as an example, but you can use any Node.js hosting service.

#### **Option A: Deploy to Railway (Recommended)**

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize Project:**
   ```bash
   cd server
   railway init
   ```

4. **Set Environment Variables:**
   ```bash
   railway variables set SUPABASE_URL=https://your-project.supabase.co
   railway variables set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   railway variables set PORT=3001
   railway variables set NODE_ENV=production
   railway variables set ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   railway variables set JWT_SECRET=$(openssl rand -base64 32)
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Get Your API URL:**
   ```bash
   railway domain
   # Example output: https://your-app.up.railway.app
   ```

#### **Option B: Deploy to Render**

1. **Create Account:** https://render.com

2. **Create New Web Service:**
   - Connect your GitHub repository
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables:**
   - Go to Environment tab
   - Add all variables from `.env.example`

4. **Deploy:**
   - Click "Create Web Service"
   - Copy your service URL (e.g., https://your-app.onrender.com)

#### **Option C: Deploy to Heroku**

1. **Install Heroku CLI:**
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Login and Create App:**
   ```bash
   heroku login
   cd server
   heroku create kj-associates-api
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set SUPABASE_URL=https://your-project.supabase.co
   heroku config:set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git subtree push --prefix server heroku main
   ```

---

### **Step 3: Update Frontend Configuration**

1. **Update `js/config.js`:**
   
   Replace the production API URL with your deployed API:

   ```javascript
   apiBaseUrl: window.API_BASE_URL_OVERRIDE ||
     document.querySelector('meta[name="api-base-url"]')?.content ||
     (isLocalhost ? 'http://localhost:3001/api' : 'https://your-api-url.railway.app/api'),
   ```

2. **Or Use Meta Tags (Recommended):**
   
   Add to your HTML files (index.html, projects/index.html, etc.):

   ```html
   <head>
     <meta name="api-base-url" content="https://your-api-url.railway.app/api">
     <meta name="supabase-url" content="https://your-project.supabase.co">
     <meta name="supabase-anon-key" content="your-anon-key">
   </head>
   ```

---

### **Step 4: Deploy Frontend**

#### **Option A: Deploy to 20i (Your Current Host)**

1. **Build/Prepare Files:**
   ```bash
   # No build needed - static files
   # Just ensure all files are ready
   ```

2. **Upload via FTP/SFTP:**
   - Upload all files EXCEPT:
     - `node_modules/`
     - `server/` (already deployed separately)
     - `.env` files
     - `.git/`

3. **Update DNS:**
   - Point your domain to 20i servers
   - Enable SSL certificate

#### **Option B: Deploy to Netlify (Alternative)**

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

3. **Configure:**
   - Add environment variables in Netlify dashboard
   - Set up custom domain

#### **Option C: Deploy to Vercel**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

---

### **Step 5: Test Production Setup**

1. **Test API Health:**
   ```bash
   curl https://your-api-url.railway.app/health
   ```
   
   Should return:
   ```json
   {"status":"ok","timestamp":"..."}
   ```

2. **Test API Endpoints:**
   ```bash
   curl https://your-api-url.railway.app/api/projects
   ```

3. **Test Frontend:**
   - Open your website in browser
   - Open DevTools Console (F12)
   - Look for: `[Config] API: https://your-api-url...`
   - Check Projects page loads data
   - Verify no CORS errors

4. **Test CMS Admin:**
   - Open admin panel
   - Create a test project
   - Verify it appears on the website

---

## 🔒 Security Checklist

Before going live, ensure:

- [ ] `.env` files are in `.gitignore` (already done ✅)
- [ ] Service role key is NEVER exposed in frontend code
- [ ] Only anon key is used in frontend
- [ ] CORS is configured with your actual domains
- [ ] SSL/HTTPS is enabled on all services
- [ ] Admin password is strong (change from default)
- [ ] RLS policies are properly configured
- [ ] API rate limiting is enabled
- [ ] Environment variables are set on hosting platform
- [ ] Backup strategy is in place for database

---

## 🌐 Environment Variables Reference

### **Backend (API Server)**

Create these on your hosting platform:

```bash
# Required
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # Keep SECRET!
PORT=3001
NODE_ENV=production

# CORS (comma-separated)
ALLOWED_ORIGINS=https://kjconsultancy.co.tz,https://www.kjconsultancy.co.tz

# Optional
JWT_SECRET=your-random-secret-here
MAX_FILE_SIZE=10485760
```

### **Frontend (Meta Tags or Config)**

Add to HTML files or update `js/config.js`:

```html
<meta name="api-base-url" content="https://your-api.railway.app/api">
<meta name="supabase-url" content="https://xxxxx.supabase.co">
<meta name="supabase-anon-key" content="eyJhbGc...">
```

---

## 🔄 Deployment Workflow

### **For Updates:**

1. **Update Code Locally:**
   ```bash
   # Make your changes
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Deploy API (if changed):**
   ```bash
   cd server
   railway up  # or your deployment command
   ```

3. **Deploy Frontend (if changed):**
   ```bash
   # Upload via FTP or
   netlify deploy --prod
   ```

### **For Database Changes:**

1. **Update Schema:**
   - Make changes in Supabase SQL Editor
   - Or run migration scripts

2. **Test Locally:**
   ```bash
   npm run dev
   # Test all CRUD operations
   ```

3. **Deploy:**
   - API will automatically use new schema
   - No frontend changes needed (usually)

---

## 🐛 Troubleshooting Production Issues

### **CORS Errors**

**Symptom:** Browser shows "CORS policy" error

**Solution:**
```bash
# Update ALLOWED_ORIGINS on API server
railway variables set ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### **API Connection Failed**

**Symptom:** Website shows cached data, console shows connection errors

**Solution:**
1. Check API server is running: `curl https://your-api.railway.app/health`
2. Verify API URL in `js/config.js` or meta tags
3. Check browser console for exact error

### **Database Connection Failed**

**Symptom:** API returns 500 errors

**Solution:**
1. Verify Supabase credentials on hosting platform
2. Check Supabase project is active
3. Review API server logs

### **Changes Not Showing**

**Symptom:** Updates in CMS don't appear on website

**Solution:**
1. Clear browser cache: `localStorage.clear()`
2. Click "Refresh ↻" button on website
3. Verify API is returning fresh data: `curl https://your-api.../api/projects`

---

## 📊 Monitoring & Maintenance

### **Monitor API Health:**

Set up monitoring with:
- **UptimeRobot** (free): https://uptimerobot.com
- **Pingdom**
- Railway/Render built-in monitoring

### **Check Logs:**

```bash
# Railway
railway logs

# Render
# View in dashboard

# Heroku
heroku logs --tail
```

### **Database Backups:**

Supabase automatically backs up your database, but you can also:
```bash
# Manual backup
pg_dump -h your-db-host -U postgres -d postgres > backup.sql
```

---

## 💰 Cost Estimates

### **Free Tier (Recommended for Start):**

- **Supabase:** Free (500MB database, 50,000 monthly active users)
- **Railway:** $5/month after free trial (500 hours free)
- **Render:** Free tier available (spins down after inactivity)
- **Netlify/Vercel:** Free for static sites
- **20i:** Your existing hosting

**Total:** ~$5-10/month

### **Production Tier:**

- **Supabase Pro:** $25/month
- **Railway Pro:** $20/month
- **Custom Domain:** $10-15/year
- **SSL Certificate:** Free (Let's Encrypt)

**Total:** ~$45-50/month

---

## 🎯 Quick Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database schema deployed
- [ ] RLS policies configured
- [ ] API server deployed to Railway/Render/Heroku
- [ ] Environment variables set on API server
- [ ] API health endpoint responding
- [ ] Frontend configuration updated with API URL
- [ ] Frontend deployed to hosting
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate enabled
- [ ] CORS configured correctly
- [ ] Test CMS admin panel
- [ ] Test website data loading
- [ ] Test CRUD operations end-to-end
- [ ] Monitoring set up
- [ ] Backup strategy in place

---

## 📞 Support Resources

**Documentation:**
- Supabase: https://supabase.com/docs
- Railway: https://docs.railway.app
- Render: https://render.com/docs

**Community:**
- Supabase Discord: https://discord.supabase.com
- Railway Discord: https://discord.gg/railway

**Project Files:**
- `QUICK-START.md` - Local development guide
- `CRUD-ISSUE-RESOLUTION.md` - Troubleshooting guide
- `server/README.md` - API server documentation

---

**Last Updated:** January 7, 2026  
**Version:** 1.0.0  
**Status:** Ready for Production Deployment 🚀
