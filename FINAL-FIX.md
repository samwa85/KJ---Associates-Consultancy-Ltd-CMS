# Final Fix - Add Email Column

Run this on the server:

```bash
docker exec -i supabase-db-j8k8sksckccs4ccogsscccww psql -U postgres -d postgres << 'EOF'
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS email TEXT;
EOF
```

Then exit and test again on your Mac.
