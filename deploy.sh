#!/bin/bash

# One-Click Deployment & Sync Script
# 1. Updates Server Code (Git Pull)
# 2. Deploys Frontend & Backend
# 3. AUTO-SYNCS Frontend Data (JSON) to Live Database

echo "🚀 Starting Deployment & Auto-Sync..."

# Create expect script
cat > /tmp/deploy_full.exp << 'EOF'
#!/usr/bin/expect -f

set timeout 120

spawn ssh root@31.97.79.197

expect "password:"
send "3&Wcue.t4hsPo?PN2Hjo\r"

expect "# "
send "echo '=== 1. UPDATING CODEBASE ==='\r"
send "cd /home/kjconsul/public_html/demo\r"
send "git stash\r"
send "git fetch origin main\r"
send "git reset --hard origin/main\r"
send "git clean -fd\r"

expect "# "
send "echo '=== 2. GENERATING SYNC SQL ==='\r"
# Regenerate the SQL seed file from the latest JSON data on the server
send "node scripts/generate-seed-sql.js\r"

expect "# "
send "echo '=== 3. DEPLOYING FRONTEND ==='\r"
# Sync to public web directory
send "rsync -av --delete --exclude='.git' --exclude='node_modules' --exclude='server' --exclude='.DS_Store' /home/kjconsul/public_html/demo/ /var/www/kjconsultancy.co.tz/demo/\r"

expect "# "
send "echo '=== 4. DEPLOYING BACKEND API ==='\r"
send "mkdir -p /var/www/kjconsultancy.co.tz/server\r"
send "rsync -av --exclude='node_modules' --exclude='.env' /home/kjconsul/public_html/demo/server/ /var/www/kjconsultancy.co.tz/server/\r"

expect "# "
send "echo '=== 5. RESTARTING API SERVER ==='\r"
send "cd /var/www/kjconsultancy.co.tz/server\r"
send "npm install --production\r"
send "pm2 restart kj-cms-api || pm2 start src/index.js --name kj-cms-api\r"
send "pm2 save\r"

expect "# "
send "echo '=== 6. SYNCING DATABASE ==='\r"
# Identify DB Container
send "DB_CONTAINER=\$(docker ps -q -f name=supabase-db | head -n 1)\r"
send "echo \"Target DB: \$DB_CONTAINER\"\r"
# Apply the generated Seed SQL
send "cat /home/kjconsul/public_html/demo/data/seed-frontend.sql | docker exec -i \$DB_CONTAINER psql -U postgres\r"

expect "# "
send "echo '=== 7. VERIFICATION ==='\r"
send "curl -I http://localhost:3001/health || echo 'Health check warning'\r"
send "docker exec -i \$DB_CONTAINER psql -U postgres -c 'SELECT count(*) as slides_count FROM slides;'\r"

expect "# "
send "exit\r"

expect eof
EOF

chmod +x /tmp/deploy_full.exp

echo "📡 Connecting to production server..."
expect /tmp/deploy_full.exp

echo "✅ Deployment & Sync Complete!"
rm /tmp/deploy_full.exp
