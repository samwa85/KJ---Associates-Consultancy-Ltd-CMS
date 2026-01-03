# Kong Configuration for Supabase

## Problem: "No API key found in request"

Kong is blocking requests because it's not recognizing the Supabase anon key as a valid API key.

## Solution: Configure Kong to Accept Supabase Anon Key

### Option 1: Disable API Key Authentication for Supabase Routes (Recommended)

Kong should **NOT** require API key authentication for Supabase routes. The Supabase anon key should be passed through directly.

**In Coolify:**

1. **Go to your Kong service** in Coolify
2. **Check Plugins/Configuration**
3. **Disable API Key Authentication plugin** for routes matching `/auth/v1/*` and `/rest/v1/*`
4. **Or configure Kong** to allow requests with the `apikey` header containing the Supabase anon key

### Option 2: Configure Kong to Accept Supabase Anon Key

If you must use API key authentication, configure Kong to accept your Supabase anon key:

1. **In Kong Admin API** (usually at `http://kong:8001`):
   ```bash
   # Create a consumer
   curl -X POST http://kong:8001/consumers \
     --data "username=supabase-anon"
   
   # Create API key for the consumer using your Supabase anon key
   curl -X POST http://kong:8001/consumers/supabase-anon/key-auth \
     --data "key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NzQyNjU0MCwiZXhwIjo0OTIzMTAwMTQwLCJyb2xlIjoiYW5vbiJ9.SjKT3nG6cTid7fSuOvdy5Mxy8SsGsYPUW1XVZCNR7WY"
   ```

### Option 3: Use Kong Without API Key Auth (Best for Supabase)

Supabase's Kong should be configured to:
- **Accept** requests with `apikey` header (Supabase anon key)
- **Pass through** to backend services (GoTrue, PostgREST, etc.)
- **NOT require** separate API key authentication

**Check your Kong configuration:**
- Routes should be public (no API key auth plugin)
- Or API key auth should accept the Supabase anon key format

## Verify Configuration

Test if Kong accepts the anon key:

```bash
curl -X GET "https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io/auth/v1/health" \
  -H "apikey: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NzQyNjU0MCwiZXhwIjo0OTIzMTAwMTQwLCJyb2xlIjoiYW5vbiJ9.SjKT3nG6cTid7fSuOvdy5Mxy8SsGsYPUW1XVZCNR7WY"
```

Should return: `{"status":"ok"}` or similar

## For Self-Hosted Supabase

If you're using the official Supabase Docker setup, Kong should already be configured correctly. If you're setting up Kong manually:

1. **Don't enable API key authentication plugin** on Supabase routes
2. **Allow** the `apikey` header to pass through
3. **Route** requests to appropriate services (GoTrue for `/auth/v1/*`, PostgREST for `/rest/v1/*`)

## Quick Fix in Coolify

1. **Go to Kong service** → **Plugins** or **Configuration**
2. **Find API Key Authentication plugin**
3. **Disable it** or **configure it** to accept your Supabase anon key
4. **Save** and restart Kong

The Supabase JS client automatically sends the anon key as the `apikey` header - Kong just needs to accept it, not require a separate API key consumer.

