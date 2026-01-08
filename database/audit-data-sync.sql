-- =====================================================
-- COMPREHENSIVE DATA AUDIT
-- =====================================================
-- This script audits all CMS tables to verify data
-- synchronization between frontend and backend.
-- =====================================================

\echo '========================================='
\echo 'CMS DATA AUDIT REPORT'
\echo '========================================='
\echo ''

-- 1. PROJECTS
\echo '1. PROJECTS:'
SELECT 
    COUNT(*) as total_projects,
    COUNT(CASE WHEN status = 'Ongoing' THEN 1 END) as ongoing,
    COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed
FROM public.projects;
\echo ''

-- 2. TEAM MEMBERS
\echo '2. TEAM MEMBERS:'
SELECT 
    COUNT(*) as total_team_members,
    COUNT(CASE WHEN category = 'leadership' THEN 1 END) as leadership,
    COUNT(CASE WHEN category = 'technical' THEN 1 END) as technical
FROM public.team_members;
\echo ''

-- 3. BOARD MEMBERS
\echo '3. BOARD MEMBERS:'
SELECT 
    COUNT(*) as total_board_members,
    COUNT(CASE WHEN is_chairman = true THEN 1 END) as chairman_count
FROM public.board_members;
\echo ''

-- List board members if any exist
SELECT 
    name,
    role,
    is_chairman
FROM public.board_members
ORDER BY display_order;
\echo ''

-- 4. CLIENTS
\echo '4. CLIENTS:'
SELECT 
    COUNT(*) as total_clients,
    COUNT(CASE WHEN category = 'Government' THEN 1 END) as government,
    COUNT(CASE WHEN category = 'Donor' THEN 1 END) as donor,
    COUNT(CASE WHEN category = 'Private' THEN 1 END) as private
FROM public.clients;
\echo ''

-- 5. TESTIMONIALS
\echo '5. TESTIMONIALS:'
SELECT 
    COUNT(*) as total_testimonials,
    ROUND(AVG(rating), 2) as average_rating
FROM public.testimonials;
\echo ''

-- 6. SERVICES
\echo '6. SERVICES:'
SELECT 
    COUNT(*) as total_services
FROM public.services;
\echo ''

-- 7. BLOG POSTS
\echo '7. BLOG POSTS:'
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN published = true THEN 1 END) as published,
    COUNT(CASE WHEN featured = true THEN 1 END) as featured
FROM public.blog_posts;
\echo ''

-- 8. CERTIFICATIONS
\echo '8. CERTIFICATIONS:'
SELECT 
    COUNT(*) as total_certifications,
    COUNT(CASE WHEN category = 'professional' THEN 1 END) as professional,
    COUNT(CASE WHEN category = 'tax' THEN 1 END) as tax,
    COUNT(CASE WHEN category = 'legal' THEN 1 END) as legal
FROM public.certifications;
\echo ''

-- 9. SLIDES
\echo '9. SLIDES:'
SELECT 
    COUNT(*) as total_slides,
    COUNT(CASE WHEN active = true THEN 1 END) as active_slides
FROM public.slides;
\echo ''

-- 10. SETTINGS
\echo '10. SETTINGS:'
SELECT 
    COUNT(*) as total_settings
FROM public.settings;
\echo ''

\echo '========================================='
\echo 'EXPECTED COUNTS (from frontend defaults):'
\echo '========================================='
\echo 'Projects: 31+'
\echo 'Team Members: 7'
\echo 'Board Members: 3 ⚠️ (CRITICAL - currently 0)'
\echo 'Clients: 6+'
\echo 'Testimonials: 3+'
\echo 'Services: 4+'
\echo 'Blog Posts: 3+'
\echo 'Certifications: 5+'
\echo 'Slides: 5'
\echo ''
\echo '========================================='
\echo 'ACTION REQUIRED:'
\echo '========================================='
\echo 'If Board Members count is 0, run:'
\echo '  database/sync-board-members.sql'
\echo '========================================='
