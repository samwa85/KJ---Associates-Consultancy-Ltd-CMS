-- =====================================================
-- DATABASE CLEANUP & DEDUPLICATION
-- =====================================================

-- 1. Deduplicate Projects (keep latest)
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
               PARTITION BY title 
               ORDER BY created_at DESC
           ) as row_num
    FROM projects
)
DELETE FROM projects
WHERE id IN (
    SELECT id FROM duplicates WHERE row_num > 1
);

-- 2. Deduplicate Team Members (keep latest)
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
               PARTITION BY name 
               ORDER BY created_at DESC
           ) as row_num
    FROM team_members
)
DELETE FROM team_members
WHERE id IN (
    SELECT id FROM duplicates WHERE row_num > 1
);

-- 3. Deduplicate Clients (keep latest)
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
               PARTITION BY name 
               ORDER BY created_at DESC
           ) as row_num
    FROM clients
)
DELETE FROM clients
WHERE id IN (
    SELECT id FROM duplicates WHERE row_num > 1
);

-- 4. Deduplicate Testimonials (keep latest)
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
               PARTITION BY name 
               ORDER BY created_at DESC
           ) as row_num
    FROM testimonials
)
DELETE FROM testimonials
WHERE id IN (
    SELECT id FROM duplicates WHERE row_num > 1
);

-- 5. Deduplicate Blog Posts (keep latest)
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
               PARTITION BY title 
               ORDER BY created_at DESC
           ) as row_num
    FROM blog_posts
)
DELETE FROM blog_posts
WHERE id IN (
    SELECT id FROM duplicates WHERE row_num > 1
);
