-- =====================================================
-- Schema Alignment Fix
-- Adds missing columns to align with frontend expectations
-- =====================================================

-- Add 'category' column to projects table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'category'
    ) THEN
        ALTER TABLE projects ADD COLUMN category TEXT;
        -- Copy sector values to category for existing records
        UPDATE projects SET category = sector WHERE category IS NULL;
    END IF;
END $$;

-- Add 'slug' column to projects table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'slug'
    ) THEN
        ALTER TABLE projects ADD COLUMN slug TEXT;
        -- Generate slugs for existing records
        UPDATE projects 
        SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g'))
        WHERE slug IS NULL;
    END IF;
END $$;

-- Add 'position' column to team_members table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'team_members' AND column_name = 'position'
    ) THEN
        ALTER TABLE team_members ADD COLUMN position TEXT;
        -- Copy role values to position for existing records
        UPDATE team_members SET position = role WHERE position IS NULL;
    END IF;
END $$;

-- Add 'phone' column to team_members table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'team_members' AND column_name = 'phone'
    ) THEN
        ALTER TABLE team_members ADD COLUMN phone TEXT;
    END IF;
END $$;

-- Add 'logo_url' column to clients table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'clients' AND column_name = 'logo_url'
    ) THEN
        ALTER TABLE clients ADD COLUMN logo_url TEXT;
        -- Copy logo values to logo_url for existing records
        UPDATE clients SET logo_url = logo WHERE logo_url IS NULL;
    END IF;
END $$;

-- Add 'client_name' column to testimonials table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'testimonials' AND column_name = 'client_name'
    ) THEN
        ALTER TABLE testimonials ADD COLUMN client_name TEXT;
        -- Copy name values to client_name for existing records
        UPDATE testimonials SET client_name = name WHERE client_name IS NULL;
    END IF;
END $$;

-- Add 'content' column to testimonials table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'testimonials' AND column_name = 'content'
    ) THEN
        ALTER TABLE testimonials ADD COLUMN content TEXT;
        -- Copy text values to content for existing records
        UPDATE testimonials SET content = text WHERE content IS NULL;
    END IF;
END $$;

-- =====================================================
-- Update RLS policies to allow anonymous inserts for testing
-- (Remove this in production!)
-- =====================================================

-- Drop existing auth policies and create permissive ones for testing
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

-- Create permissive policies (TEMPORARY - for testing only!)
CREATE POLICY "Allow all operations" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- Verification Query
-- =====================================================
-- Run this to verify all columns exist:
/*
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
    AND table_name IN ('projects', 'team_members', 'clients', 'testimonials', 'blog_posts')
ORDER BY table_name, ordinal_position;
*/
