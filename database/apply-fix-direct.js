#!/usr/bin/env node

/**
 * Direct Schema Fix Application
 * Uses Supabase REST API to apply schema changes
 */

const https = require('https');

const SUPABASE_URL = 'https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io';
const SERVICE_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NzQyNjU0MCwiZXhwIjo0OTIzMTAwMTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.YFJqhLlFbJWKJNULvJDqXGOPjMpDNZJJfJqbJJJJJJJ';

const SQL_STATEMENTS = [
    // Add category to projects
    `ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT`,
    `UPDATE projects SET category = sector WHERE category IS NULL`,

    // Add slug to projects
    `ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT`,
    `UPDATE projects SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL`,

    // Add position to team_members
    `ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position TEXT`,
    `UPDATE team_members SET position = role WHERE position IS NULL`,

    // Add phone to team_members
    `ALTER TABLE team_members ADD COLUMN IF NOT EXISTS phone TEXT`,

    // Add logo_url to clients
    `ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT`,
    `UPDATE clients SET logo_url = logo WHERE logo_url IS NULL`,

    // Add client_name to testimonials
    `ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_name TEXT`,
    `UPDATE testimonials SET client_name = name WHERE client_name IS NULL`,

    // Add content to testimonials
    `ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS content TEXT`,
    `UPDATE testimonials SET content = text WHERE content IS NULL`,
];

async function executeSQL(sql) {
    return new Promise((resolve, reject) => {
        const url = new URL('/rest/v1/rpc/exec_sql', SUPABASE_URL);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SERVICE_KEY,
                'Authorization': `Bearer ${SERVICE_KEY}`
            }
        };

        const req = https.request(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(data);
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', reject);
        req.write(JSON.stringify({ query: sql }));
        req.end();
    });
}

async function main() {
    console.log('🔧 Applying Schema Alignment Fix...\n');
    console.log('⚠️  Note: Direct SQL execution via REST API may not be supported.');
    console.log('📋 Please use the Supabase SQL Editor instead.\n');
    console.log('Instructions:');
    console.log('1. Open: ' + SUPABASE_URL.replace('/rest/v1', '') + '/project/_/sql');
    console.log('2. Copy and paste the SQL from database/schema-alignment-fix.sql');
    console.log('3. Click "Run"\n');
    console.log('SQL Preview:');
    console.log('─'.repeat(60));
    SQL_STATEMENTS.forEach((sql, i) => {
        console.log(`${i + 1}. ${sql.substring(0, 80)}${sql.length > 80 ? '...' : ''}`);
    });
    console.log('─'.repeat(60));
}

main().catch(console.error);
