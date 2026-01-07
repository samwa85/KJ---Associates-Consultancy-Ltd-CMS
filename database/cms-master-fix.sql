-- =====================================================
-- MASTER CMS CONFIGURATION & FIX (V2)
-- =====================================================

-- Step 1: Ensure Tables & Columns Exist (Idempotent)
-- =====================================================

-- PROJECTS
CREATE TABLE IF NOT EXISTS projects (id UUID DEFAULT gen_random_uuid() PRIMARY KEY);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sector TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS images TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS year TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS value TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS services TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

UPDATE projects SET category = sector WHERE category IS NULL;
UPDATE projects SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL;

-- TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (id UUID DEFAULT gen_random_uuid() PRIMARY KEY);
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS linkedin TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS qualifications TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS experience TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

UPDATE team_members SET position = role WHERE position IS NULL;

-- CLIENTS
CREATE TABLE IF NOT EXISTS clients (id UUID DEFAULT gen_random_uuid() PRIMARY KEY);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE clients ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

UPDATE clients SET logo_url = logo WHERE logo_url IS NULL;

-- TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (id UUID DEFAULT gen_random_uuid() PRIMARY KEY);
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS text TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS rating INTEGER;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

UPDATE testimonials SET client_name = name WHERE client_name IS NULL;
UPDATE testimonials SET content = text WHERE content IS NULL;

-- BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (id UUID DEFAULT gen_random_uuid() PRIMARY KEY);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- SETTINGS (FIXED)
CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY DEFAULT 1);
-- Attempt to fix the NOT NULL constraint on 'key' if it exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'settings' AND column_name = 'key') THEN
        ALTER TABLE settings ALTER COLUMN "key" DROP NOT NULL;
    END IF;
END $$;

ALTER TABLE settings ADD COLUMN IF NOT EXISTS site_title TEXT;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS site_description TEXT;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'classic-green';


-- Ensure at least one row (Safe Insert)
INSERT INTO settings (id, theme) 
VALUES (1, 'classic-green') 
ON CONFLICT (id) DO UPDATE SET theme = EXCLUDED.theme WHERE settings.theme IS NULL;


-- Step 2: RLS Policies (Secure but Functional)
-- =====================================================

-- PROJECTS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations" ON projects;
DROP POLICY IF EXISTS "Public Read Projects" ON projects;
DROP POLICY IF EXISTS "Auth Write Projects" ON projects;
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Auth Write Projects" ON projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- TEAM MEMBERS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations" ON team_members;
DROP POLICY IF EXISTS "Public Read Team" ON team_members;
DROP POLICY IF EXISTS "Auth Write Team" ON team_members;
CREATE POLICY "Public Read Team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Auth Write Team" ON team_members FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- CLIENTS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations" ON clients;
DROP POLICY IF EXISTS "Public Read Clients" ON clients;
DROP POLICY IF EXISTS "Auth Write Clients" ON clients;
CREATE POLICY "Public Read Clients" ON clients FOR SELECT USING (true);
CREATE POLICY "Auth Write Clients" ON clients FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- TESTIMONIALS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations" ON testimonials;
DROP POLICY IF EXISTS "Public Read Testimonials" ON testimonials;
DROP POLICY IF EXISTS "Auth Write Testimonials" ON testimonials;
CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Auth Write Testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- BLOG POSTS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations" ON blog_posts;
DROP POLICY IF EXISTS "Public Read Blog" ON blog_posts;
DROP POLICY IF EXISTS "Auth Write Blog" ON blog_posts;
CREATE POLICY "Public Read Blog" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Auth Write Blog" ON blog_posts FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- SETTINGS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON settings;
DROP POLICY IF EXISTS "Public Read Settings" ON settings;
DROP POLICY IF EXISTS "Auth Write Settings" ON settings;
CREATE POLICY "Public Read Settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Auth Write Settings" ON settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Step 3: Grant Permissions
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
