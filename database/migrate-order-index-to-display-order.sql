-- Migration Script: Rename order_index to display_order
-- Run this in your Supabase SQL Editor if your database already has order_index columns
-- This script is idempotent and safe to run multiple times

-- Rename order_index to display_order for all tables
DO $$
BEGIN
    -- Slides table
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'slides' AND column_name = 'order_index') THEN
        ALTER TABLE slides RENAME COLUMN order_index TO display_order;
        RAISE NOTICE 'Renamed order_index to display_order in slides table';
    END IF;

    -- Projects table
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'order_index') THEN
        ALTER TABLE projects RENAME COLUMN order_index TO display_order;
        RAISE NOTICE 'Renamed order_index to display_order in projects table';
    END IF;

    -- Team members table
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'team_members' AND column_name = 'order_index') THEN
        ALTER TABLE team_members RENAME COLUMN order_index TO display_order;
        RAISE NOTICE 'Renamed order_index to display_order in team_members table';
    END IF;

    -- Board members table
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'board_members' AND column_name = 'order_index') THEN
        ALTER TABLE board_members RENAME COLUMN order_index TO display_order;
        RAISE NOTICE 'Renamed order_index to display_order in board_members table';
    END IF;

    -- Clients table
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'order_index') THEN
        ALTER TABLE clients RENAME COLUMN order_index TO display_order;
        RAISE NOTICE 'Renamed order_index to display_order in clients table';
    END IF;

    -- Testimonials table
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'order_index') THEN
        ALTER TABLE testimonials RENAME COLUMN order_index TO display_order;
        RAISE NOTICE 'Renamed order_index to display_order in testimonials table';
    END IF;

    -- Services table
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'order_index') THEN
        ALTER TABLE services RENAME COLUMN order_index TO display_order;
        RAISE NOTICE 'Renamed order_index to display_order in services table';
    END IF;

    -- Certifications table
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'certifications' AND column_name = 'order_index') THEN
        ALTER TABLE certifications RENAME COLUMN order_index TO display_order;
        RAISE NOTICE 'Renamed order_index to display_order in certifications table';
    END IF;

    RAISE NOTICE 'Migration complete! All order_index columns have been renamed to display_order.';
END $$;

