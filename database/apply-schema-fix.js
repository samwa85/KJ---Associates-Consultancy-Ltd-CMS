#!/usr/bin/env node

/**
 * Apply Schema Alignment Fix to Supabase
 * This script reads the SQL file and applies it to your Supabase database
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read Supabase config
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NzQyNjU0MCwiZXhwIjo0OTIzMTAwMTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.YFJqhLlFbJWKJNULvJDqXGOPjMpDNZJJfJqbJJJJJJJ';

async function applySchemaFix() {
    console.log('🔧 Applying Schema Alignment Fix...\n');

    // Create Supabase client with service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Read SQL file
    const sqlPath = path.join(__dirname, 'schema-alignment-fix.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 SQL file loaded');
    console.log('🌐 Connecting to:', SUPABASE_URL);
    console.log('');

    try {
        // Execute SQL using Supabase RPC
        // Note: This requires creating a custom function in Supabase
        // For now, we'll use individual queries

        console.log('⚠️  IMPORTANT: This script cannot directly execute DDL statements.');
        console.log('📋 Please copy the SQL from database/schema-alignment-fix.sql');
        console.log('🔗 Go to: ' + SUPABASE_URL.replace('/rest/v1', '') + '/project/_/sql');
        console.log('📝 Paste the SQL and click "Run"');
        console.log('');
        console.log('Alternatively, you can use the Supabase CLI:');
        console.log('  supabase db push --db-url "' + SUPABASE_URL + '"');
        console.log('');

        // Test connection
        const { data, error } = await supabase.from('settings').select('*').limit(1);

        if (error) {
            console.error('❌ Connection test failed:', error.message);
            process.exit(1);
        }

        console.log('✅ Connection successful!');
        console.log('');
        console.log('Next steps:');
        console.log('1. Open the Supabase SQL Editor');
        console.log('2. Copy and paste the contents of database/schema-alignment-fix.sql');
        console.log('3. Click "Run" to execute');
        console.log('4. Re-run the CRUD tests');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

applySchemaFix();
