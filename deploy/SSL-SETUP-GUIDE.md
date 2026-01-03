# SSL Certificate Setup for Supabase on Coolify

## Problem

When accessing your site over HTTPS (`https://kjconsultancy.co.tz`), the browser blocks requests to Supabase if it doesn't have a valid SSL certificate, showing:
- `ERR_CERT_AUTHORITY_INVALID`
- `Failed to fetch`

## Solution: Configure SSL on Supabase Kong Gateway

### Option 1: Use Coolify's Built-in SSL (Recommended)

1. **Go to your Coolify dashboard**
2. **Find your Supabase Kong service**
3. **Click on the Kong service** to open its settings
4. **Go to "Domains" or "SSL" section**
5. **Add a domain** for your Supabase instance (e.g., `supabase.yourdomain.com`)
6. **Enable SSL/TLS** - Coolify will automatically provision a Let's Encrypt certificate
7. **Update the Supabase URL** in `js/supabase-config.js` to use the new domain

### Option 2: Use sslip.io with Valid Certificate

If you're using `sslip.io`, it provides automatic HTTPS but with self-signed certificates. To fix:

1. **Set up a reverse proxy** (like Traefik or Nginx) in front of Supabase
2. **Configure the proxy** to use Let's Encrypt certificates
3. **Point your Supabase URL** to the proxy instead

### Option 3: Use HTTP (Not Recommended for Production)

If you're testing locally or on HTTP, you can temporarily use HTTP:

```javascript
// In js/supabase-config.js, change:
url: 'http://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io'
```

**Warning:** This will cause Mixed Content errors on HTTPS sites.

## Quick Fix: Configure Kong with SSL in Coolify

1. **In Coolify**, go to your Supabase stack
2. **Click on Kong service**
3. **Add a domain** (or use the existing one)
4. **Enable SSL/TLS** - Coolify will handle certificate provisioning
5. **Update `js/supabase-config.js`** with the new HTTPS URL

## Testing

After configuring SSL:

1. Visit: `https://your-supabase-domain.com/auth/v1/health`
2. Should return: `{"status":"ok"}` without certificate warnings
3. Test the setup page: `https://kjconsultancy.co.tz/demo/admin/setup.html`

## Troubleshooting

- **Certificate still invalid**: Clear browser cache and try again
- **Mixed Content errors**: Ensure both site and Supabase use HTTPS
- **Connection refused**: Check if Kong service is running in Coolify

