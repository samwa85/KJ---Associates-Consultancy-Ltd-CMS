# Commands to Run on the Server (srv1243351)

You're now connected to the server. Run these commands in order:

## Step 1: Find the PostgreSQL/Supabase container

```bash
docker ps
```

Look for a container with "postgres" or "supabase" in the name.

## Step 2: Connect to the database

Replace `CONTAINER_NAME` with the actual container name from Step 1:

```bash
docker exec -it CONTAINER_NAME psql -U postgres -d postgres
```

Common container names to try:
- `supabase-db`
- `supabase_db_1`
- `postgres`
- `supabase-kong_db_1`

## Step 3: Run this SQL (paste all at once)

Once you're in the PostgreSQL prompt (`postgres=#`), paste this:

```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS content TEXT;

UPDATE projects SET category = sector WHERE category IS NULL;
UPDATE team_members SET position = role WHERE position IS NULL;
UPDATE clients SET logo_url = logo WHERE logo_url IS NULL;
UPDATE testimonials SET client_name = name WHERE client_name IS NULL;
UPDATE testimonials SET content = text WHERE content IS NULL;

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

## Step 4: Verify the changes

```sql
\d projects
```

You should see `category` and `slug` in the column list.

## Step 5: Exit

```sql
\q
```

```bash
exit
```

## Step 6: Test on your Mac

Open: `file:///Users/samwa/Desktop/CODE ZERO/CURSOR/KJ & Associates Consultancy Ltd-CMS/test-crud.html`

Click "Run All Tests" - all 5 should pass! ✅

---

## Quick Copy-Paste Version

If you want to do it all in one command (after finding the container name):

```bash
# Replace CONTAINER_NAME with actual name
docker exec -i CONTAINER_NAME psql -U postgres -d postgres << 'EOF'
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS content TEXT;
UPDATE projects SET category = sector WHERE category IS NULL;
UPDATE team_members SET position = role WHERE position IS NULL;
UPDATE clients SET logo_url = logo WHERE logo_url IS NULL;
UPDATE testimonials SET client_name = name WHERE client_name IS NULL;
UPDATE testimonials SET content = text WHERE content IS NULL;
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
EOF
```
