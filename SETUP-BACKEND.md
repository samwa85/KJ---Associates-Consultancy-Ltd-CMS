# Backend Setup Guide (Simple Steps)

Your website needs a backend server to load data from the CMS. Follow these steps:

---

## What You Need

- SSH access to your server (`kjconsultancy.co.tz`)
- Your Supabase credentials (URL, anon key, service role key)

---

## Step 1: SSH into Your Server

```bash
ssh your-user@kjconsultancy.co.tz
```

---

## Step 2: Install Node.js (if not installed)

```bash
# Check if Node.js is installed
node --version

# If not installed, install it:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## Step 3: Upload the Backend Code

On your **local machine**, run:

```bash
cd "/Users/samwa/Desktop/CODE ZERO/CURSOR/KJ & Associates Consultancy Ltd-CMS"

# Upload server folder to your server
rsync -avz server/ your-user@kjconsultancy.co.tz:/var/www/kjconsultancy.co.tz/server/
```

---

## Step 4: Set Up the Backend on Server

SSH into your server and run:

```bash
cd /var/www/kjconsultancy.co.tz/server

# Install dependencies
npm install --production

# Create environment file
cat > .env << 'EOF'
NODE_ENV=production
PORT=3001
SUPABASE_URL=http://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io
SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
ALLOWED_ORIGINS=https://kjconsultancy.co.tz
FRONTEND_URL=https://kjconsultancy.co.tz/demo
EOF

# Edit the .env file with your actual keys
nano .env
```

**Replace** `YOUR_ANON_KEY_HERE` and `YOUR_SERVICE_ROLE_KEY_HERE` with your actual Supabase keys.

---

## Step 5: Test the Backend

```bash
# Start the server to test
node src/index.js

# You should see:
# Server running on port 3001
# Connected to Supabase
```

Press `Ctrl+C` to stop.

---

## Step 6: Run Backend as a Service (PM2)

```bash
# Install PM2 (process manager)
sudo npm install -g pm2

# Start the backend
cd /var/www/kjconsultancy.co.tz/server
pm2 start src/index.js --name "kj-cms-api"

# Make it start on boot
pm2 startup
pm2 save

# Check status
pm2 status
```

---

## Step 7: Update Nginx Config

```bash
# Copy the nginx config
sudo cp /var/www/kjconsultancy.co.tz/demo/deploy/nginx-demo.conf /etc/nginx/sites-available/kjconsultancy

# Enable it (if not already)
sudo ln -sf /etc/nginx/sites-available/kjconsultancy /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 8: Verify Everything Works

```bash
# Test API locally on server
curl http://localhost:3001/api/

# Test API through Nginx
curl https://kjconsultancy.co.tz/demo/api/

# Test slides endpoint
curl https://kjconsultancy.co.tz/demo/api/slides/active
```

All should return JSON (not HTML).

---

## Step 9: Set Up Database Tables

Run the SQL schema in your Supabase SQL Editor:

1. Go to your Supabase dashboard
2. Open **SQL Editor**
3. Copy contents of `database/supabase-schema.sql`
4. Paste and run

Then run the comprehensive fix:
1. Copy contents of `database/comprehensive-fix.sql`
2. Paste and run

---

## Troubleshooting

### Check if backend is running
```bash
pm2 status
pm2 logs kj-cms-api
```

### Restart backend
```bash
pm2 restart kj-cms-api
```

### Check Nginx errors
```bash
sudo tail -f /var/log/nginx/kjconsultancy-error.log
```

### API returns 502
- Backend is not running. Start it with `pm2 start`

### API returns HTML instead of JSON
- Nginx not configured. Check Step 7

---

## Quick Commands Reference

```bash
# Start backend
pm2 start kj-cms-api

# Stop backend
pm2 stop kj-cms-api

# Restart backend
pm2 restart kj-cms-api

# View logs
pm2 logs kj-cms-api

# Reload Nginx
sudo systemctl reload nginx
```

---

## Need Help?

If you're stuck, tell me:
1. What step you're on
2. What error you see

I'll help you fix it.

