# 🔒 Security Checklist - Before Pushing to Public Git

## ⚠️ CRITICAL - Review Before Pushing

This checklist ensures no sensitive data is exposed in your public repository.

---

## ✅ Pre-Commit Security Checklist

### **1. Environment Variables**
- [ ] `.env` files are in `.gitignore` ✅
- [ ] No hardcoded API keys in JavaScript files
- [ ] No database passwords in code
- [ ] No service role keys in frontend code
- [ ] All secrets use environment variables

### **2. Credentials & Keys**
- [ ] Supabase service role key is NOT in frontend
- [ ] Only anon/public key is used in frontend (safe to expose)
- [ ] Admin password is documented but not hardcoded (or use strong default)
- [ ] JWT secrets are in `.env` only
- [ ] No AWS/cloud provider keys in code

### **3. Configuration Files**
- [ ] `.env.example` has placeholder values only
- [ ] No real URLs or keys in example files
- [ ] `config.js` uses environment detection
- [ ] Database connection strings use env vars

### **4. Git History**
- [ ] No previous commits contain secrets
- [ ] If secrets were committed, history is cleaned
- [ ] `.DS_Store` and OS files are ignored

### **5. Documentation**
- [ ] README doesn't contain real credentials
- [ ] Deployment guide uses placeholders
- [ ] Setup instructions reference `.env.example`

---

## 🔍 Files to Review

### **Check These Files:**

```bash
# Search for potential secrets
grep -r "supabase.*key" --exclude-dir=node_modules --exclude-dir=.git .
grep -r "password.*=" --exclude-dir=node_modules --exclude-dir=.git .
grep -r "secret.*=" --exclude-dir=node_modules --exclude-dir=.git .
```

### **Safe to Commit:**
✅ `js/config.js` - Uses environment detection, no hardcoded production secrets
✅ `js/supabase-client.js` - Uses config, no direct credentials
✅ `server/.env.example` - Placeholder values only
✅ `.gitignore` - Properly configured
✅ All `.md` documentation files

### **NEVER Commit:**
❌ `server/.env` - Contains real secrets
❌ `.env.local` - Local environment overrides
❌ Any file with real API keys
❌ Database backup files with data
❌ `node_modules/` - Dependencies

---

## 🛡️ Current Configuration Status

### **Frontend (js/config.js)**

**Current Setup:**
```javascript
// Supabase Anon Key (SAFE to expose - public key)
supabaseKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'

// Supabase URL (SAFE to expose - public endpoint)
supabaseUrl: 'https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io'
```

**Status:** ✅ **SAFE** - These are public credentials meant for frontend use.

**Note:** The anon key has Row Level Security (RLS) policies that restrict access. It's designed to be public.

### **Backend (server/.env)**

**Status:** ✅ **PROTECTED** - File is in `.gitignore`

**Contains:**
- `SUPABASE_SERVICE_ROLE_KEY` - ⚠️ MUST stay private
- `POSTGRES_PASSWORD` - ⚠️ MUST stay private
- Other sensitive configuration

---

## 🔐 What's Safe to Expose?

### **✅ Safe (Public Information):**

1. **Supabase Anon Key**
   - Purpose: Client-side database access
   - Protection: RLS policies limit what it can do
   - Used in: Frontend JavaScript

2. **Supabase URL**
   - Purpose: Database endpoint
   - Protection: RLS + authentication required for writes
   - Used in: Frontend JavaScript

3. **API Base URL**
   - Purpose: Backend API endpoint
   - Protection: CORS + rate limiting
   - Used in: Frontend configuration

### **❌ NEVER Expose:**

1. **Supabase Service Role Key**
   - Bypasses RLS policies
   - Full database access
   - Used in: Backend only

2. **Database Password**
   - Direct PostgreSQL access
   - Full admin rights
   - Used in: Backend only

3. **JWT Secrets**
   - Can forge authentication tokens
   - Used in: Backend only

4. **Admin Panel Password**
   - Access to CMS
   - Should be changed from default
   - Used in: Frontend (but should be hashed)

---

## 🚨 If You Accidentally Committed Secrets

### **Option 1: Remove from Last Commit**
```bash
# If you just committed
git reset HEAD~1
# Remove the sensitive file
# Add it to .gitignore
# Commit again
```

### **Option 2: Remove from Git History**
```bash
# Use git filter-branch or BFG Repo-Cleaner
# WARNING: This rewrites history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch server/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (dangerous if others have cloned)
git push origin --force --all
```

### **Option 3: Rotate Credentials**
1. Generate new API keys in Supabase
2. Update `.env` with new keys
3. Update production environment variables
4. Old keys become invalid

---

## 📋 Pre-Push Command

Run this before pushing to GitHub:

```bash
# Check for potential secrets
echo "🔍 Scanning for secrets..."
grep -r "service_role" --exclude-dir=node_modules --exclude-dir=.git . && echo "⚠️  WARNING: Found service_role reference!" || echo "✅ No service_role found"

# Check .gitignore is working
echo "🔍 Checking .gitignore..."
git status --ignored | grep ".env" && echo "✅ .env files are ignored" || echo "⚠️  WARNING: .env might not be ignored!"

# List what will be committed
echo "📦 Files to be committed:"
git status --short

# Confirm
echo ""
echo "✅ Ready to push? Review the files above."
```

---

## 🔄 Recommended: Use Environment Variables

### **For Production:**

Instead of hardcoding in `config.js`, use meta tags:

```html
<!-- In your HTML files -->
<head>
  <meta name="api-base-url" content="https://your-api.railway.app/api">
  <meta name="supabase-url" content="https://xxxxx.supabase.co">
  <meta name="supabase-anon-key" content="your-anon-key">
</head>
```

This way:
- ✅ Different environments can have different configs
- ✅ No need to rebuild for config changes
- ✅ Easier to manage in CI/CD

---

## 🎯 Final Checklist Before Push

```bash
# 1. Verify .gitignore
cat .gitignore | grep ".env"

# 2. Check no .env files are staged
git status | grep ".env"

# 3. Review what will be committed
git diff --cached

# 4. Scan for secrets (optional but recommended)
# Install: npm install -g @secretlint/secretlint
# secretlint "**/*"

# 5. Commit and push
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 📞 Emergency Contacts

If you accidentally exposed secrets:

1. **Immediately rotate credentials:**
   - Supabase: Project Settings > API > Reset keys
   - Railway/Render: Update environment variables

2. **Check GitHub:**
   - GitHub scans for secrets automatically
   - You may receive a security alert

3. **Update production:**
   - Deploy with new credentials
   - Test all functionality

---

## ✅ Current Status

**Last Security Audit:** January 7, 2026

- [x] `.gitignore` properly configured
- [x] `.env` files excluded
- [x] No secrets in frontend code
- [x] Anon key usage is safe
- [x] Service role key is protected
- [x] Documentation reviewed
- [x] Example files use placeholders

**Status:** ✅ **SAFE TO PUSH TO PUBLIC REPOSITORY**

---

## 📚 Additional Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Remember:** When in doubt, DON'T commit. Review first! 🔒
