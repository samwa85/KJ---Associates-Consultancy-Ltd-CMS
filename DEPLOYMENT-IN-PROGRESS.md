# 🚀 Live API Deployment - Step-by-Step Guide

**Status:** In Progress  
**Platform:** Railway  
**Date:** January 7, 2026

---

## 📋 Deployment Progress

### ✅ Completed Steps:

1. **Railway CLI Installed** ✅
   - Installed globally via npm
   - Version: Latest

2. **Login Initiated** ⏳
   - Browser should be open for authentication
   - Waiting for you to complete login

---

## 🔐 Step 1: Complete Railway Authentication

**What's Happening:**
- Railway CLI has opened your browser
- You need to authenticate with Railway

**Actions Required:**

1. **If you have a Railway account:**
   - Click "Login" in the browser
   - Choose your authentication method (GitHub, Google, or Email)
   - Authorize the Railway CLI

2. **If you DON'T have a Railway account:**
   - Click "Sign Up"
   - Create account with GitHub, Google, or Email
   - Verify your email if required
   - Authorize the Railway CLI

3. **After Authentication:**
   - You should see "Successfully logged in!" in the browser
   - Return to the terminal
   - The CLI will confirm login

---

## 📦 Step 2: Initialize Railway Project (Next)

Once logged in, we'll run:

```bash
cd server
railway init
```

**This will:**
- Create a new Railway project
- Link your local code to Railway
- Prepare for deployment

**You'll be asked:**
- Project name (suggestion: `kj-associates-api`)
- Whether to create a new project or link existing

**Choose:** Create new project

---

## 🔧 Step 3: Configure Environment Variables (Next)

We'll set these variables on Railway:

```bash
# Required Variables
SUPABASE_URL=https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://kjconsultancy.co.tz,https://www.kjconsultancy.co.tz
JWT_SECRET=randomly-generated-secret
```

**Note:** We'll read these from your `server/.env` file automatically.

---

## 🚀 Step 4: Deploy (Next)

```bash
railway up
```

**This will:**
- Upload your server code to Railway
- Install dependencies
- Start your API server
- Make it publicly accessible

**Deployment time:** ~2-3 minutes

---

## 🌐 Step 5: Get Your API URL (Next)

```bash
railway domain
```

**This will:**
- Generate a public URL for your API
- Format: `https://your-project.up.railway.app`
- This is your live API URL

---

## 🧪 Step 6: Test Your Live API (Next)

```bash
# Test health endpoint
curl https://your-domain.railway.app/health

# Test projects endpoint
curl https://your-domain.railway.app/api/projects
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-07T..."
}
```

---

## 🔄 Step 7: Update Frontend Configuration (Next)

**Option A: Using Meta Tags (Recommended)**

Add to all HTML files (index.html, projects/index.html, admin/index.html):

```html
<head>
  <!-- Add before other scripts -->
  <meta name="api-base-url" content="https://your-domain.railway.app/api">
  <meta name="supabase-url" content="https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io">
  <meta name="supabase-anon-key" content="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NzQyNjU0MCwiZXhwIjo0OTIzMTAwMTQwLCJyb2xlIjoiYW5vbiJ9.SjKT3nG6cTid7fSuOvdy5Mxy8SsGsYPUW1XVZCNR7WY">
</head>
```

**Option B: Update js/config.js**

```javascript
// Line 22 in js/config.js
apiBaseUrl: window.API_BASE_URL_OVERRIDE ||
  document.querySelector('meta[name="api-base-url"]')?.content ||
  (isLocalhost ? 'http://localhost:3001/api' : 'https://your-domain.railway.app/api'),
```

---

## 📊 Deployment Checklist

### Backend Deployment:
- [x] Railway CLI installed
- [ ] Logged in to Railway
- [ ] Project initialized
- [ ] Environment variables set
- [ ] Code deployed
- [ ] Domain generated
- [ ] Health check passed
- [ ] API endpoints tested

### Frontend Configuration:
- [ ] Meta tags added OR config.js updated
- [ ] Changes committed to Git
- [ ] Frontend deployed to production
- [ ] Website tested with live API

### Verification:
- [ ] Open website in browser
- [ ] Check console for API connection
- [ ] Verify projects load from live API
- [ ] Test admin panel CRUD operations
- [ ] Check for CORS errors
- [ ] Test on mobile device

---

## 🔍 Troubleshooting

### Issue: Railway login not working

**Solution:**
- Make sure browser opened successfully
- Try manual login: https://railway.app/login
- Check terminal for error messages

### Issue: Deployment fails

**Solution:**
- Check `server/package.json` has correct start script
- Verify all dependencies are in package.json
- Check Railway logs: `railway logs`

### Issue: API returns 500 errors

**Solution:**
- Check environment variables are set correctly
- Verify Supabase credentials
- Check Railway logs: `railway logs`

### Issue: CORS errors in browser

**Solution:**
- Update ALLOWED_ORIGINS in Railway
- Include your domain: `railway variables set ALLOWED_ORIGINS=https://yourdomain.com`
- Restart deployment: `railway up`

---

## 💡 Useful Railway Commands

```bash
# View logs
railway logs

# View environment variables
railway variables

# Set a variable
railway variables set KEY=value

# Open Railway dashboard
railway open

# Redeploy
railway up

# Check status
railway status

# Link to different project
railway link
```

---

## 📞 Need Help?

**Railway Documentation:**
- Getting Started: https://docs.railway.app/getting-started
- Environment Variables: https://docs.railway.app/develop/variables
- Deployments: https://docs.railway.app/deploy/deployments

**Project Documentation:**
- Deployment Guide: [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
- Troubleshooting: [CRUD-ISSUE-RESOLUTION.md](CRUD-ISSUE-RESOLUTION.md)
- Quick Start: [QUICK-START.md](QUICK-START.md)

**Railway Support:**
- Discord: https://discord.gg/railway
- Help Center: https://help.railway.app

---

## 🎯 Current Status

**Step:** Waiting for Railway authentication  
**Next:** Initialize project and deploy  
**ETA:** ~5-10 minutes total

---

## 📝 Notes

- Railway free tier includes 500 hours/month
- After free trial, costs ~$5/month
- Automatic deployments from GitHub available
- Built-in monitoring and logs
- Easy to scale if needed

---

**Last Updated:** January 7, 2026  
**Status:** ⏳ In Progress - Waiting for login
