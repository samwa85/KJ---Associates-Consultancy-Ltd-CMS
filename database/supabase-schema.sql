-- =====================================================
-- KJ & Associates CMS - Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    client TEXT,
    location TEXT,
    value TEXT,
    currency TEXT DEFAULT 'TZS',
    funding TEXT,
    sector TEXT,
    status TEXT DEFAULT 'Ongoing',
    year INTEGER,
    duration INTEGER DEFAULT 0,
    description TEXT,
    image TEXT,
    images TEXT[], -- Array of image URLs
    services TEXT[], -- Array of services
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TEAM MEMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT,
    category TEXT DEFAULT 'technical', -- leadership, technical
    experience INTEGER DEFAULT 0,
    qualifications TEXT,
    bio TEXT,
    photo TEXT,
    email TEXT,
    linkedin TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BOARD MEMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS board_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT,
    qualifications TEXT,
    experience INTEGER DEFAULT 0,
    bio TEXT,
    photo TEXT,
    is_chairman BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CLIENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT, -- Government, Donor, Private
    logo TEXT,
    website TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position TEXT,
    company TEXT,
    text TEXT NOT NULL,
    photo TEXT,
    rating INTEGER DEFAULT 5,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SLIDES TABLE (Hero Slideshow)
-- =====================================================
CREATE TABLE IF NOT EXISTS slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tagline TEXT,
    title TEXT NOT NULL,
    title_highlight TEXT,
    button_text TEXT DEFAULT 'Contact Us',
    button_link TEXT DEFAULT 'contact.html',
    image TEXT,
    active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    icon TEXT,
    category TEXT,
    summary TEXT,
    description TEXT,
    features TEXT[], -- Array of features
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BLOG POSTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    image TEXT,
    author TEXT,
    author_photo TEXT,
    author_role TEXT,
    author_bio TEXT,
    tags TEXT[],
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CERTIFICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT,
    description TEXT,
    image TEXT,
    valid_until TEXT,
    category TEXT, -- professional, tax, legal, insurance
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SETTINGS TABLE (Single row for site settings)
-- =====================================================
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    -- Branding
    logo_type TEXT DEFAULT 'image',
    logo_text TEXT DEFAULT 'KJ & Associates',
    logo_subtitle TEXT DEFAULT 'Consultancy Ltd',
    logo_image_url TEXT,
    logo_image_url_dark TEXT,
    favicon_url TEXT,
    -- Theme
    theme TEXT DEFAULT 'classic-green',
    -- Contact
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    email2 TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    hours TEXT,
    map_url TEXT,
    social_linkedin TEXT,
    social_facebook TEXT,
    social_twitter TEXT,
    social_instagram TEXT,
    -- SEO
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    seo_og_image TEXT,
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (anyone can view)
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON board_members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON clients FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON slides FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read access" ON settings FOR SELECT USING (true);

-- Authenticated users can insert/update/delete
CREATE POLICY "Auth insert" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON team_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON team_members FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON board_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON board_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON board_members FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON clients FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON clients FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON clients FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON slides FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON slides FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON slides FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON services FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON certifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON certifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON certifications FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON settings FOR UPDATE USING (auth.role() = 'authenticated');

-- =====================================================
-- TRIGGERS FOR updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_board_members_updated_at BEFORE UPDATE ON board_members FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_slides_updated_at BEFORE UPDATE ON slides FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- INSERT DEFAULT SETTINGS
-- =====================================================
INSERT INTO settings (id, logo_type, logo_text, logo_subtitle, logo_image_url, theme, phone, whatsapp, email, email2, address, city, country, seo_title, seo_description)
VALUES (
    1,
    'image',
    'KJ & Associates',
    'Consultancy Ltd',
    '/uploads/logo_kj&.png',
    'classic-green',
    '+255 768 757 779',
    '+255768757779',
    'md@kjconsultancy.co.tz',
    'info@kjconsultancy.co.tz',
    'KIJITONYAMA, MABATINI ROAD, DAR ES SALAAM, TANZANIA',
    'Dar es Salaam',
    'Tanzania',
    'KJ & Associates Consultancy Ltd',
    'Professional quantity surveying and construction project management services in Tanzania.'
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STORAGE BUCKET FOR UPLOADS
-- =====================================================
-- Run this in Supabase Dashboard > Storage > Create bucket
-- Bucket name: uploads
-- Public: Yes

