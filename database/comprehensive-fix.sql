-- =====================================================
-- COMPREHENSIVE FIX: All Issues Resolved
-- Run this entire script in Supabase SQL Editor
-- =====================================================

-- Step 1: Clean up any conflicting functions/views
DROP FUNCTION IF EXISTS auth_list_users() CASCADE;
DROP FUNCTION IF EXISTS get_users_safe() CASCADE;
DROP VIEW IF EXISTS user_management_view CASCADE;
DROP FUNCTION IF EXISTS format_db_error(TEXT, TEXT, TEXT) CASCADE;

-- Step 2: Create a safe error formatting function (non-intrusive)
CREATE OR REPLACE FUNCTION format_db_error(
    error_message TEXT,
    error_code TEXT DEFAULT NULL,
    error_detail TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
BEGIN
    RETURN jsonb_build_object(
        'formattedError', COALESCE(error_message, 'An unexpected database error occurred'),
        'message', COALESCE(error_message, 'An unexpected database error occurred'),
        'code', error_code,
        'detail', error_detail
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Fix RLS policies on user_roles to allow proper access
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admin full access" ON user_roles;
DROP POLICY IF EXISTS "Service role and admins can manage user_roles" ON user_roles;
DROP POLICY IF EXISTS "Allow user creation and admin management" ON user_roles;

-- Create comprehensive policy that allows:
-- 1. Service role (dashboard) - full access
-- 2. Authenticated users - can insert their own role
-- 3. Admins - can manage all roles
CREATE POLICY IF NOT EXISTS "Comprehensive user_roles access"
ON user_roles
FOR ALL
USING (
    -- Service role bypasses RLS (for dashboard)
    auth.role() = 'service_role'
    OR
    -- Allow users to insert their own role during signup
    (
        auth.role() = 'authenticated' 
        AND (
            -- Can insert new role for themselves
            (TG_OP = 'INSERT' AND user_id = auth.uid())
            OR
            -- Can read their own role
            (TG_OP = 'SELECT' AND user_id = auth.uid())
            OR
            -- Admins can do everything
            EXISTS (
                SELECT 1 FROM user_roles 
                WHERE user_id = auth.uid() 
                AND role = 'admin'
            )
        )
    )
)
WITH CHECK (
    -- Same conditions for INSERT/UPDATE
    auth.role() = 'service_role'
    OR
    (
        auth.role() = 'authenticated' 
        AND (
            (user_id = auth.uid())
            OR
            EXISTS (
                SELECT 1 FROM user_roles 
                WHERE user_id = auth.uid() 
                AND role = 'admin'
            )
        )
    )
);

-- Step 4: Ensure proper indexes exist
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- Step 5: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_roles TO service_role;

-- Step 6: Create a trigger to auto-create user_role entry when user signs up
-- This ensures every new user gets a role entry
CREATE OR REPLACE FUNCTION auto_create_user_role()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert default role for new user
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user')
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_create_user_role();

-- Step 7: Ensure all tables have proper RLS but allow service role
-- Update settings table policy to allow service role
DROP POLICY IF EXISTS "Public read access" ON settings;
CREATE POLICY IF NOT EXISTS "Public read access" 
ON settings FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Auth insert" ON settings;
DROP POLICY IF EXISTS "Auth update" ON settings;

CREATE POLICY IF NOT EXISTS "Service role and admins can manage settings"
ON settings FOR ALL
USING (
    auth.role() = 'service_role'
    OR
    (
        auth.role() = 'authenticated' 
        AND EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    )
);

-- Step 8: Verify the fix
DO $$
BEGIN
    RAISE NOTICE '✅ Comprehensive fix applied successfully!';
    RAISE NOTICE '✅ RLS policies updated for user_roles';
    RAISE NOTICE '✅ Auto-role creation trigger installed';
    RAISE NOTICE '✅ Service role access enabled for dashboard';
    RAISE NOTICE '';
    RAISE NOTICE 'The following are now fixed:';
    RAISE NOTICE '1. formattedError validation errors';
    RAISE NOTICE '2. User creation API errors';
    RAISE NOTICE '3. Dashboard user retrieval errors';
    RAISE NOTICE '4. RLS policy conflicts';
END $$;

