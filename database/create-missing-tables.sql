-- =====================================================
-- CREATE MISSING TABLES: SERVICES & CERTIFICATIONS
-- =====================================================
-- This script creates the missing 'services' and 'certifications' tables
-- that are causing 400 errors in the Admin Panel
-- =====================================================

-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;

-- Create services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    category TEXT,
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE certifications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    issuing_organization TEXT,
    issue_date DATE,
    expiry_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    description TEXT,
    image TEXT,
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on both tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for services
CREATE POLICY "Allow public read access to services"
ON services FOR SELECT
TO public
USING (active = true);

CREATE POLICY "Allow authenticated users to manage services"
ON services FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create RLS policies for certifications
CREATE POLICY "Allow public read access to certifications"
ON certifications FOR SELECT
TO public
USING (active = true);

CREATE POLICY "Allow authenticated users to manage certifications"
ON certifications FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify tables were created
SELECT 
    'services' as table_name,
    COUNT(*) as row_count
FROM services
UNION ALL
SELECT 
    'certifications' as table_name,
    COUNT(*) as row_count
FROM certifications;

-- Summary
DO $$
BEGIN
    RAISE NOTICE '✅ Tables created successfully!';
    RAISE NOTICE 'Created: services table with active column';
    RAISE NOTICE 'Created: certifications table with active column';
    RAISE NOTICE 'RLS policies enabled for both tables';
END $$;
