# 🚀 Alternative Deployment Options - Free Tier Available

**Issue:** Railway requires account verification or paid plan  
**Solution:** Use alternative free hosting platforms

---

## ✅ Recommended Free Alternatives

### **Option 1: Render (Recommended - Truly Free)**

**Pros:**
- ✅ Generous free tier (750 hours/month)
- ✅ No credit card required
- ✅ Easy deployment from GitHub
- ✅ Automatic HTTPS
- ✅ Built-in monitoring

**Steps:**

1. **Go to Render:** https://render.com

2. **Sign Up:**
   - Click "Get Started"
   - Sign up with GitHub (recommended)

3. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `samwa85/KJ---Associates-Consultancy-Ltd-CMS`
   - Select the repository

4. **Configure Service:**
   ```
   Name: kj-associates-api
   Region: Choose closest to Tanzania (Europe/Frankfurt or Singapore)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

5. **Select Free Plan:**
   - Choose "Free" tier
   - Note: Service spins down after 15 min of inactivity (spins up automatically on request)

6. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   SUPABASE_URL=https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-from-env
   PORT=3001
   NODE_ENV=production
   ALLOWED_ORIGINS=https://kjconsultancy.co.tz,https://www.kjconsultancy.co.tz
   JWT_SECRET=generate-random-string-here
   ```

7. **Deploy:**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Copy your service URL (e.g., `https://kj-associates-api.onrender.com`)

---

### **Option 2: Fly.io (Good Free Tier)**

**Pros:**
- ✅ Free tier: 3 shared-cpu VMs
- ✅ Global deployment
- ✅ Fast cold starts
- ✅ Good for Node.js

**Steps:**

1. **Install Fly CLI:**
   ```bash
   brew install flyctl
   ```

2. **Login:**
   ```bash
   flyctl auth login
   ```

3. **Deploy:**
   ```bash
   cd server
   flyctl launch
   # Follow prompts, choose free tier
   ```

4. **Set Environment Variables:**
   ```bash
   flyctl secrets set SUPABASE_URL=https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io
   flyctl secrets set SUPABASE_SERVICE_ROLE_KEY=your-key
   flyctl secrets set NODE_ENV=production
   ```

---

### **Option 3: Vercel (Serverless)**

**Pros:**
- ✅ Completely free for hobby projects
- ✅ No credit card required
- ✅ Automatic deployments from GitHub
- ✅ Global CDN

**Note:** Requires converting to serverless functions

**Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd server
   vercel
   ```

4. **Configure:**
   - Follow prompts
   - Set environment variables in Vercel dashboard

---

### **Option 4: Coolify (Self-Hosted - Your Own Server)**

**Pros:**
- ✅ Completely free (you pay only for server)
- ✅ Full control
- ✅ No vendor lock-in
- ✅ You already have experience with this!

**Steps:**

1. **Access Your Coolify Instance**
2. **Create New Application**
3. **Connect GitHub Repository**
4. **Set Environment Variables**
5. **Deploy**

**Server Requirements:**
- 1GB RAM minimum
- Can use DigitalOcean ($4/month) or Hetzner (€3/month)

---

## 🎯 Recommended Approach: Render

I recommend **Render** because:
1. ✅ Truly free (no credit card needed)
2. ✅ Easy to set up (5 minutes)
3. ✅ Automatic deployments from GitHub
4. ✅ Good free tier limits
5. ✅ Professional and reliable

---

## 📋 Quick Render Deployment Guide

### **Step 1: Sign Up (2 minutes)**

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### **Step 2: Create Web Service (3 minutes)**

1. Click "New +" → "Web Service"
2. Find and select: `KJ---Associates-Consultancy-Ltd-CMS`
3. Click "Connect"

### **Step 3: Configure (2 minutes)**

```
Name: kj-associates-api
Region: Frankfurt (EU) or Singapore
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### **Step 4: Environment Variables**

Click "Advanced" and add:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | `https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io` |
| `SUPABASE_SERVICE_ROLE_KEY` | Get from your `server/.env` file |
| `PORT` | `3001` |
| `NODE_ENV` | `production` |
| `ALLOWED_ORIGINS` | `https://kjconsultancy.co.tz,https://www.kjconsultancy.co.tz` |
| `JWT_SECRET` | Generate random string: `openssl rand -base64 32` |

### **Step 5: Deploy**

1. Click "Create Web Service"
2. Wait 2-3 minutes
3. Your API will be live at: `https://kj-associates-api.onrender.com`

### **Step 6: Test**

```bash
curl https://kj-associates-api.onrender.com/health
```

---

## ⚡ Free Tier Comparison

| Platform | Free Tier | Cold Start | Ease of Use | Recommended |
|----------|-----------|------------|-------------|-------------|
| **Render** | 750 hrs/mo | ~30s | ⭐⭐⭐⭐⭐ | ✅ **YES** |
| **Fly.io** | 3 VMs | ~5s | ⭐⭐⭐⭐ | ✅ Good |
| **Railway** | Trial only | ~2s | ⭐⭐⭐⭐⭐ | ❌ Requires payment |
| **Vercel** | Unlimited | ~1s | ⭐⭐⭐ | ⚠️ Needs conversion |
| **Coolify** | Self-hosted | None | ⭐⭐⭐⭐ | ✅ If you have server |

---

## 🚀 Next Steps

**I recommend proceeding with Render:**

1. Open https://render.com in your browser
2. Sign up with GitHub
3. Follow the Quick Render Deployment Guide above
4. It will take about 5-7 minutes total

**Or, if you prefer:**
- Use Coolify (you already have it set up)
- Try Fly.io (good alternative)

**Let me know which option you'd like to proceed with!**

---

## 📞 Need Help?

**Render Documentation:**
- Getting Started: https://render.com/docs/deploy-node-express-app
- Environment Variables: https://render.com/docs/environment-variables

**Alternative Platforms:**
- Fly.io Docs: https://fly.io/docs/languages-and-frameworks/node/
- Vercel Docs: https://vercel.com/docs/functions/serverless-functions/runtimes/node-js

---

**Status:** Waiting for your choice of deployment platform  
**Recommended:** Render (free, easy, reliable)
