# KJ & Associates CMS - Deployment Guide

## Overview

This guide covers deploying the CMS to `https://kjconsultancy.co.tz/demo` for staging, with instructions for moving to the main URL later.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Nginx                                │
│  (SSL termination, static files, API proxy)                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  /demo/*          → Static files from /var/www/.../demo/    │
│  /demo/api/*      → Proxy to Node.js backend :3001          │
│  /demo/health     → Backend health check                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Node.js API Backend (Port 3001)                │
│  Express + Supabase                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase (Coolify)                       │
│  PostgreSQL + Auth + Storage                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 1: Deploy Node.js Backend

### Option A: Deploy on Coolify

1. **Create a new service** in Coolify:
   - Type: Node.js
   - Repository: Your GitHub repo
   - Build Path: `server/`
   - Start Command: `npm start`
   - Port: 3001

2. **Set Environment Variables** in Coolify:
   ```env
   NODE_ENV=production
   PORT=3001
   SUPABASE_URL=http://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
   SUPABASE_ANON_KEY=<your-anon-key>
   DATABASE_URL=postgresql://postgres:<password>@<host>:5432/postgres
   ALLOWED_ORIGINS=https://kjconsultancy.co.tz,http://localhost:3000
   FRONTEND_URL=https://kjconsultancy.co.tz/demo
   ```

3. **Deploy** and note the internal URL (e.g., `http://backend-service:3001`)

### Option B: Deploy with Docker

```bash
cd server/
docker build -t kj-cms-api .
docker run -d \
  --name kj-cms-api \
  -p 3001:3001 \
  -e NODE_ENV=production \
  -e SUPABASE_URL=... \
  -e SUPABASE_SERVICE_ROLE_KEY=... \
  kj-cms-api
```

---

## Step 2: Set Up Database Tables

Run the SQL schema in your Supabase PostgreSQL:

```bash
# Option 1: Using psql
psql $DATABASE_URL -f server/database/schema.sql

# Option 2: In Coolify PostgreSQL terminal
# Copy contents of server/database/schema.sql and paste
```

---

## Step 3: Create Admin User

```bash
cd server/
npm install
node scripts/create-admin.js admin@kjconsultancy.co.tz YourSecurePassword123
```

---

## Step 4: Deploy Frontend (Static Files)

### Upload Files

Upload all frontend files (excluding `server/` and `node_modules/`) to:
```
/var/www/kjconsultancy.co.tz/demo/
```

Directory structure:
```
/var/www/kjconsultancy.co.tz/demo/
├── index.html
├── about.html
├── contact.html
├── ...
├── admin/
│   ├── index.html
│   ├── login.html
│   └── ...
├── css/
├── js/
├── images/
└── uploads/
```

### Using rsync (recommended)

```bash
rsync -avz --exclude='server/' --exclude='node_modules/' --exclude='.git/' \
  ./ user@server:/var/www/kjconsultancy.co.tz/demo/
```

### Using FTP/SFTP

Upload all files except:
- `server/`
- `node_modules/`
- `.git/`
- `.env`

---

## Step 5: Configure Nginx

1. **Copy the Nginx config**:
   ```bash
   sudo cp deploy/nginx-demo.conf /etc/nginx/sites-available/kjconsultancy-demo
   ```

2. **Edit the config** to match your server:
   - Update SSL certificate paths
   - Update backend upstream address if using Docker/Coolify internal networking

3. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/kjconsultancy-demo /etc/nginx/sites-enabled/
   ```

4. **Test and reload**:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## Step 6: Verify Deployment

### Test API Health
```bash
curl https://kjconsultancy.co.tz/demo/health
# Should return: {"status":"ok","timestamp":"...","environment":"production"}
```

### Test API Endpoints
```bash
curl https://kjconsultancy.co.tz/demo/api/
# Should return API info JSON
```

### Test Frontend
1. Visit `https://kjconsultancy.co.tz/demo/`
2. Check browser console for `[Config] API URL: /demo/api`

### Test Admin Login
1. Visit `https://kjconsultancy.co.tz/demo/admin/login.html`
2. Log in with the admin credentials you created
3. Verify you can access the CMS dashboard

---

## Troubleshooting

### API Returns 502 Bad Gateway
- Check if Node.js backend is running: `systemctl status kj-cms-api`
- Check backend logs: `journalctl -u kj-cms-api -f`
- Verify upstream address in Nginx config

### CORS Errors
- Ensure `ALLOWED_ORIGINS` includes your frontend domain
- Check Nginx is passing correct headers

### Database Connection Failed
- Verify `DATABASE_URL` is correct
- Check if PostgreSQL is accessible from backend
- Test connection: `psql $DATABASE_URL -c "SELECT 1"`

### Login Not Working
- Check if admin user was created: `node scripts/create-admin.js`
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check backend logs for auth errors

---

## Moving from /demo to Main URL

When ready to go live at `https://kjconsultancy.co.tz/`:

1. **Update Nginx config**:
   - Uncomment the main site location blocks
   - Comment out or remove `/demo` blocks

2. **Move files**:
   ```bash
   mv /var/www/kjconsultancy.co.tz/demo/* /var/www/kjconsultancy.co.tz/
   ```

3. **Update frontend config** (optional):
   - The `js/config.js` will automatically detect non-demo paths

4. **Update environment variables**:
   ```env
   FRONTEND_URL=https://kjconsultancy.co.tz
   ```

5. **Reload Nginx**:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

---

## Security Checklist

- [ ] SSL certificate is valid and auto-renews
- [ ] Admin password is strong (12+ characters)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is not exposed in frontend
- [ ] Rate limiting is enabled on API
- [ ] CORS is restricted to your domain
- [ ] Database credentials are in environment variables, not code
- [ ] Regular backups are configured

---

## Support

For issues, check:
1. Backend logs: `journalctl -u kj-cms-api -f`
2. Nginx logs: `/var/log/nginx/kjconsultancy-error.log`
3. Browser console for frontend errors

