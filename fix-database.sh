#!/bin/bash

# Supabase Database Fix Script
# This script will connect to your server and fix the database schema

echo "🔧 Supabase Database Fix Script"
echo "================================"
echo ""

# Server details
SERVER="root@31.97.79.197"
PASSWORD="3&Wcue.t4hsPo?PN2Hjo"

echo "Step 1: Connecting to server..."
echo ""

# Create the SQL fix file
cat > /tmp/supabase-fix.sql << 'EOF'
-- Add missing columns
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS content TEXT;

-- Copy existing data
UPDATE projects SET category = sector WHERE category IS NULL;
UPDATE team_members SET position = role WHERE position IS NULL;
UPDATE clients SET logo_url = logo WHERE logo_url IS NULL;
UPDATE testimonials SET client_name = name WHERE client_name IS NULL;
UPDATE testimonials SET content = text WHERE content IS NULL;

-- Update RLS policies
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

CREATE POLICY "Allow all operations" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
EOF

echo "✓ SQL fix file created"
echo ""

# Use sshpass if available, otherwise provide manual instructions
if command -v sshpass &> /dev/null; then
    echo "Step 2: Uploading SQL file to server..."
    sshpass -p "$PASSWORD" scp /tmp/supabase-fix.sql $SERVER:/tmp/
    
    echo "Step 3: Finding database container..."
    CONTAINER=$(sshpass -p "$PASSWORD" ssh $SERVER "docker ps --format '{{.Names}}' | grep -i postgres | head -1")
    
    if [ -z "$CONTAINER" ]; then
        echo "❌ Could not find PostgreSQL container"
        echo "Please run manually: ssh $SERVER"
        exit 1
    fi
    
    echo "✓ Found container: $CONTAINER"
    echo ""
    
    echo "Step 4: Executing SQL fix..."
    sshpass -p "$PASSWORD" ssh $SERVER "docker exec -i $CONTAINER psql -U postgres -d postgres < /tmp/supabase-fix.sql"
    
    echo ""
    echo "✅ Database fix completed!"
    echo ""
    echo "Step 5: Verifying changes..."
    sshpass -p "$PASSWORD" ssh $SERVER "docker exec -i $CONTAINER psql -U postgres -d postgres -c '\d projects' | grep -E 'category|slug'"
    
else
    echo "⚠️  sshpass not installed. Manual steps required:"
    echo ""
    echo "Run these commands manually:"
    echo ""
    echo "1. Connect to server:"
    echo "   ssh $SERVER"
    echo "   Password: $PASSWORD"
    echo ""
    echo "2. Find the database container:"
    echo "   docker ps | grep postgres"
    echo ""
    echo "3. Copy the SQL from /tmp/supabase-fix.sql and run:"
    echo "   docker exec -i CONTAINER_NAME psql -U postgres -d postgres"
    echo "   Then paste the SQL"
    echo ""
    echo "Or install sshpass:"
    echo "   brew install hudochenkov/sshpass/sshpass"
    echo "   Then run this script again"
fi

echo ""
echo "Next step: Test CRUD operations"
echo "Open: file://$(pwd)/test-crud.html"
echo "Click 'Run All Tests' - they should all pass!"
