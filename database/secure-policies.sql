-- Secure RLS Policies
-- Pattern: Public can READ, only Authenticated users can WRITE (Create/Update/Delete)

-- ==============================================================================
-- 1. PROJECTS
-- ==============================================================================
DROP POLICY IF EXISTS "Allow all operations" ON projects;

CREATE POLICY "Enable read access for all users" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON projects
    FOR DELETE USING (auth.role() = 'authenticated');


-- ==============================================================================
-- 2. TEAM MEMBERS
-- ==============================================================================
DROP POLICY IF EXISTS "Allow all operations" ON team_members;

CREATE POLICY "Enable read access for all users" ON team_members
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON team_members
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON team_members
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON team_members
    FOR DELETE USING (auth.role() = 'authenticated');


-- ==============================================================================
-- 3. CLIENTS
-- ==============================================================================
DROP POLICY IF EXISTS "Allow all operations" ON clients;

CREATE POLICY "Enable read access for all users" ON clients
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON clients
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON clients
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON clients
    FOR DELETE USING (auth.role() = 'authenticated');


-- ==============================================================================
-- 4. TESTIMONIALS
-- ==============================================================================
DROP POLICY IF EXISTS "Allow all operations" ON testimonials;

CREATE POLICY "Enable read access for all users" ON testimonials
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON testimonials
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON testimonials
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON testimonials
    FOR DELETE USING (auth.role() = 'authenticated');


-- ==============================================================================
-- 5. BLOG POSTS
-- ==============================================================================
DROP POLICY IF EXISTS "Allow all operations" ON blog_posts;

CREATE POLICY "Enable read access for all users" ON blog_posts
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');
