-- =====================================================
-- SYNC BOARD MEMBERS TO SUPABASE
-- =====================================================
-- This script migrates the Board of Directors data from
-- the frontend defaults to the Supabase database.
-- =====================================================

-- First, check if board_members table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables 
                   WHERE table_schema = 'public' 
                   AND table_name = 'board_members') THEN
        RAISE EXCEPTION 'Table board_members does not exist. Please run the schema setup first.';
    END IF;
END $$;

-- Ensure all required columns exist (add them if missing)
DO $$
BEGIN
    -- Add qualifications column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'board_members' 
        AND column_name = 'qualifications'
    ) THEN
        ALTER TABLE public.board_members ADD COLUMN qualifications TEXT;
        RAISE NOTICE 'Added missing column: qualifications';
    END IF;

    -- Add experience column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'board_members' 
        AND column_name = 'experience'
    ) THEN
        ALTER TABLE public.board_members ADD COLUMN experience INTEGER DEFAULT 0;
        RAISE NOTICE 'Added missing column: experience';
    END IF;

    -- Add bio column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'board_members' 
        AND column_name = 'bio'
    ) THEN
        ALTER TABLE public.board_members ADD COLUMN bio TEXT;
        RAISE NOTICE 'Added missing column: bio';
    END IF;

    -- Add photo column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'board_members' 
        AND column_name = 'photo'
    ) THEN
        ALTER TABLE public.board_members ADD COLUMN photo TEXT;
        RAISE NOTICE 'Added missing column: photo';
    END IF;

    -- Add is_chairman column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'board_members' 
        AND column_name = 'is_chairman'
    ) THEN
        ALTER TABLE public.board_members ADD COLUMN is_chairman BOOLEAN DEFAULT false;
        RAISE NOTICE 'Added missing column: is_chairman';
    END IF;

    -- Add display_order column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'board_members' 
        AND column_name = 'display_order'
    ) THEN
        ALTER TABLE public.board_members ADD COLUMN display_order INTEGER DEFAULT 0;
        RAISE NOTICE 'Added missing column: display_order';
    END IF;

    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'board_members' 
        AND column_name = 'created_at'
    ) THEN
        ALTER TABLE public.board_members ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
        RAISE NOTICE 'Added missing column: created_at';
    END IF;

    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'board_members' 
        AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE public.board_members ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
        RAISE NOTICE 'Added missing column: updated_at';
    END IF;
END $$;

-- Clear existing board members (if any)
TRUNCATE TABLE public.board_members RESTART IDENTITY CASCADE;

-- Insert the 3 board members from frontend defaults
INSERT INTO public.board_members (
    name,
    role,
    qualifications,
    experience,
    bio,
    photo,
    is_chairman,
    display_order
) VALUES
(
    'QS Kashebo J. Rwezaula',
    'Board Chairman',
    'Registered Quantity Surveyor',
    37,
    'Experienced in pre and post contract duties, project management and contract administration. Extensive background in both public and private sector projects.',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    true,
    1
),
(
    'QS Phillemon J. Rwezaula',
    'Board Member',
    'Registered Quantity Surveyor',
    NULL,
    '',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    false,
    2
),
(
    'QS Adelhard A. Kweyamba',
    'Board Member',
    'Registered Quantity Surveyor',
    NULL,
    '',
    '/images/team/adelhard-kweyamba.jpg',
    false,
    3
);

-- Verify the insert
SELECT 
    id,
    name,
    role,
    qualifications,
    is_chairman,
    display_order,
    created_at
FROM public.board_members
ORDER BY display_order;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Successfully synced 3 board members!';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Board Chairman: QS Kashebo J. Rwezaula';
    RAISE NOTICE 'Board Members:';
    RAISE NOTICE '  - QS Phillemon J. Rwezaula';
    RAISE NOTICE '  - QS Adelhard A. Kweyamba';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Next step: Refresh your admin panel to see the board members!';
END $$;
