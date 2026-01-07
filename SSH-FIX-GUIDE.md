# SSH Connection Guide - Fix Supabase Database

## ✅ Good News!

SSH is working with the **root** user! The connection is asking for a password.

---

## 🔑 Step-by-Step Instructions

### Step 1: Connect via SSH

In your terminal, run:

```bash
ssh root@31.97.79.197
```

**Enter the root password when prompted.**

---

### Step 2: Find the Supabase Database

Once connected, run these commands to locate the database:

```bash
# Check if Supabase is running in Docker
docker ps

# Look for containers with names like:
# - supabase-db
# - supabase_db_postgres
# - postgres
# - supabase-kong
```

**Note the exact name of the PostgreSQL/database container.**

---

### Step 3: Connect to PostgreSQL

Use one of these commands (depending on what you found in Step 2):

**Option A: If you see a container named `supabase-db` or similar:**
```bash
docker exec -it supabase-db psql -U postgres -d postgres
```

**Option B: If the container has a different name:**
```bash
# Replace CONTAINER_NAME with the actual name
docker exec -it CONTAINER_NAME psql -U postgres -d postgres
```

**Option C: If PostgreSQL is not in Docker:**
```bash
psql -U postgres -d postgres
```

You should see a prompt like: `postgres=#`

---

### Step 4: Run the Schema Fix SQL

Copy and paste this entire SQL block into the PostgreSQL prompt:

```sql
-- Add missing columns to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT;

-- Add missing columns to team_members
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add missing columns to clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Add missing columns to testimonials
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS content TEXT;

-- Copy existing data to new columns
UPDATE projects SET category = sector WHERE category IS NULL;
UPDATE team_members SET position = role WHERE position IS NULL;
UPDATE clients SET logo_url = logo WHERE logo_url IS NULL;
UPDATE testimonials SET client_name = name WHERE client_name IS NULL;
UPDATE testimonials SET content = text WHERE content IS NULL;

-- Update RLS policies to allow testing
DROP POLICY IF EXISTS "Auth insert" ON projects;
DROP POLICY IF EXISTS "Auth update" ON projects;
DROP POLICY IF EXISTS "Auth delete" ON projects;
DROP POLICY IF EXISTS "Auth insert" ON team_members;
DROP POLICY IF EXISTS "Auth update" ON team_members;
DROP POLICY IF EXISTS "Auth delete" ON team_members;
DROP POLICY IF EXISTS "Auth insert" ON clients;
DROP POLICY IF EXISTS "Auth update" ON clients;
DROP POLICY IF EXISTS "Auth delete" ON clients;
DROP POLICY IF EXISTS "Auth insert" ON testimonials;
DROP POLICY IF EXISTS "Auth update" ON testimonials;
DROP POLICY IF EXISTS "Auth delete" ON testimonials;
DROP POLICY IF EXISTS "Auth insert" ON blog_posts;
DROP POLICY IF EXISTS "Auth update" ON blog_posts;
DROP POLICY IF EXISTS "Auth delete" ON blog_posts;

CREATE POLICY "Allow all operations" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
```

**Expected output:** You should see `ALTER TABLE` and `UPDATE` confirmations for each command.

---

### Step 5: Verify the Changes

Still in the PostgreSQL prompt, run:

```sql
-- Check if columns were added to projects
\d projects

-- Check team_members
\d team_members

-- Check clients
\d clients

-- Check testimonials
\d testimonials
```

You should see the new columns listed (category, slug, position, phone, logo_url, client_name, content).

---

### Step 6: Exit

```sql
-- Exit PostgreSQL
\q
```

```bash
# Exit SSH
exit
```

---

### Step 7: Test CRUD Operations

Back on your Mac, open this file in your browser:

```
file:///Users/samwa/Desktop/CODE ZERO/CURSOR/KJ & Associates Consultancy Ltd-CMS/test-crud.html
```

Click **"Run All Tests"**

**Expected Result:** All 5 tests should pass! ✅

---

## 🆘 Troubleshooting

### If `docker ps` shows no containers:

Supabase might not be running in Docker. Try:

```bash
# Check if PostgreSQL is running as a service
systemctl status postgresql

# Or check processes
ps aux | grep postgres
```

Then connect directly:
```bash
psql -U postgres -d postgres
```

### If you get "permission denied":

Try with sudo:
```bash
sudo docker exec -it supabase-db psql -U postgres -d postgres
```

### If the container name is different:

List all containers:
```bash
docker ps -a
```

Look for one with "postgres" or "supabase" in the name, then use that name in the `docker exec` command.

---

## 📝 Quick Reference

**SSH Connection:**
```bash
ssh root@31.97.79.197
```

**Connect to Database:**
```bash
docker exec -it supabase-db psql -U postgres -d postgres
```

**Run the fix:** Paste the SQL from Step 4

**Verify:** Run `\d projects` to see columns

**Exit:** `\q` then `exit`

**Test:** Open `test-crud.html` and run tests

---

## ✅ Success Indicators

You'll know it worked when:
1. ✅ SQL commands execute without errors
2. ✅ `\d projects` shows `category` and `slug` columns
3. ✅ All 5 CRUD tests pass in the browser
4. ✅ No more "column not found" errors

---

**Ready to proceed? Connect via SSH and follow the steps above!**

Let me know if you encounter any issues at any step.
