-- =====================================================
-- SYNC HERO SLIDES TO SUPABASE
-- =====================================================
-- This script populates the slides table with the default hero slides
-- from the frontend code (main.js lines 589-639)
--
-- Run this script in your Supabase SQL Editor to populate the slides table
-- =====================================================

-- First, check if the slides table exists and has the correct structure
DO $$
BEGIN
    -- Check if table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'slides') THEN
        RAISE EXCEPTION 'Table "slides" does not exist. Please run the schema migration first.';
    END IF;
    
    -- Check and add missing columns if needed
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'tagline') THEN
        ALTER TABLE slides ADD COLUMN tagline TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'title') THEN
        ALTER TABLE slides ADD COLUMN title TEXT NOT NULL DEFAULT '';
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'title_highlight') THEN
        ALTER TABLE slides ADD COLUMN title_highlight TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'button_text') THEN
        ALTER TABLE slides ADD COLUMN button_text TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'button_link') THEN
        ALTER TABLE slides ADD COLUMN button_link TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'image') THEN
        ALTER TABLE slides ADD COLUMN image TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'active') THEN
        ALTER TABLE slides ADD COLUMN active BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'display_order') THEN
        ALTER TABLE slides ADD COLUMN display_order INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'created_at') THEN
        ALTER TABLE slides ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'slides' 
                   AND column_name = 'updated_at') THEN
        ALTER TABLE slides ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- Clear existing slides (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE slides RESTART IDENTITY CASCADE;

-- Insert default hero slides
-- These match the default slides from main.js (lines 589-639)
INSERT INTO slides (
    tagline,
    title,
    title_highlight,
    button_text,
    button_link,
    image,
    active,
    display_order
) VALUES
(
    'BUILD ANYTHING WITH US',
    'Precision Through',
    'Digital Tools.',
    'Contact Us',
    'contact.html',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    true,
    1
),
(
    'TRUSTED BY WORLD BANK & AfDB',
    'Expert',
    'Quantity Surveyors.',
    'Our Services',
    'services/index.html',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
    true,
    2
),
(
    '17+ YEARS OF EXCELLENCE',
    'Cost Control',
    'Expertise.',
    'About Us',
    'about.html',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    true,
    3
),
(
    'FROM INCEPTION TO COMPLETION',
    'Project',
    'Management.',
    'View Projects',
    'projects/index.html',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80',
    true,
    4
),
(
    'SERVING TANZANIA',
    'Building',
    'The Future.',
    'Get Started',
    'contact.html',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    true,
    5
)
ON CONFLICT (id) DO NOTHING;

-- Verify the data was inserted
SELECT 
    id,
    tagline,
    title,
    title_highlight,
    button_text,
    active,
    display_order
FROM slides
ORDER BY display_order;

-- Summary
DO $$
DECLARE
    slide_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO slide_count FROM slides WHERE active = true;
    RAISE NOTICE '✅ Sync complete! % active slides in database', slide_count;
END $$;
