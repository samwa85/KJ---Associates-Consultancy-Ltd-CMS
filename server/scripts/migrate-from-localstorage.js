/**
 * Migration Script: localStorage to Supabase
 * 
 * This script helps migrate existing CMS data from localStorage export
 * to the Supabase database.
 * 
 * Usage:
 * 1. Export localStorage data from browser console:
 *    copy(JSON.stringify(localStorage.getItem('kj_cms_data')))
 * 2. Save to a JSON file (e.g., cms-export.json)
 * 3. Run: node scripts/migrate-from-localstorage.js ./cms-export.json
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Field mapping from localStorage format to database format
const fieldMappings = {
  slides: {
    titleHighlight: 'title_highlight',
    buttonText: 'button_text',
    buttonLink: 'button_link',
    orderIndex: 'order_index'
  },
  projects: {
    orderIndex: 'order_index'
  },
  team: {
    orderIndex: 'order_index'
  },
  board: {
    isChairman: 'is_chairman',
    orderIndex: 'order_index'
  },
  clients: {
    orderIndex: 'order_index'
  },
  testimonials: {
    orderIndex: 'order_index'
  },
  services: {
    orderIndex: 'order_index'
  },
  blog: {
    titleHighlight: 'title_highlight',
    authorPhoto: 'author_photo',
    authorRole: 'author_role',
    authorBio: 'author_bio'
  },
  certifications: {
    validUntil: 'valid_until',
    orderIndex: 'order_index'
  }
};

// Transform record to database format
function transformRecord(record, mappings = {}) {
  const transformed = {};
  
  for (const [key, value] of Object.entries(record)) {
    // Skip id field (will be auto-generated as UUID)
    if (key === 'id') continue;
    
    // Apply field mapping if exists
    const dbKey = mappings[key] || key;
    
    // Convert camelCase to snake_case if no explicit mapping
    const finalKey = dbKey.replace(/([A-Z])/g, '_$1').toLowerCase();
    
    transformed[finalKey] = value;
  }
  
  return transformed;
}

// Migrate a single table
async function migrateTable(tableName, data, mappings = {}) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.log(`⏭️  Skipping ${tableName}: No data to migrate`);
    return { success: true, count: 0 };
  }

  console.log(`📦 Migrating ${tableName}: ${data.length} records...`);

  try {
    // Transform all records
    const transformedData = data.map(record => transformRecord(record, mappings));

    // Insert in batches of 100
    const batchSize = 100;
    let totalInserted = 0;

    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      
      const { data: inserted, error } = await supabase
        .from(tableName)
        .upsert(batch, { onConflict: 'id', ignoreDuplicates: true })
        .select();

      if (error) {
        console.error(`❌ Error migrating ${tableName}:`, error.message);
        return { success: false, error: error.message };
      }

      totalInserted += inserted?.length || batch.length;
    }

    console.log(`✅ Migrated ${tableName}: ${totalInserted} records`);
    return { success: true, count: totalInserted };
  } catch (error) {
    console.error(`❌ Error migrating ${tableName}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Migrate settings (key-value pairs)
async function migrateSettings(settings) {
  console.log('⚙️  Migrating settings...');

  const settingsToMigrate = ['branding', 'contact', 'seo', 'theme'];
  let migrated = 0;

  for (const key of settingsToMigrate) {
    if (settings[key]) {
      const { error } = await supabase
        .from('settings')
        .upsert({ key, value: settings[key] }, { onConflict: 'key' });

      if (error) {
        console.error(`❌ Error migrating setting ${key}:`, error.message);
      } else {
        migrated++;
      }
    }
  }

  console.log(`✅ Migrated ${migrated} settings`);
  return { success: true, count: migrated };
}

// Main migration function
async function migrate(inputFile) {
  console.log('\n🚀 Starting migration from localStorage to Supabase\n');
  console.log('=' .repeat(50));

  // Read input file
  let cmsData;
  try {
    const rawData = fs.readFileSync(inputFile, 'utf8');
    // Handle double-stringified JSON (from copy() in browser)
    cmsData = JSON.parse(rawData);
    if (typeof cmsData === 'string') {
      cmsData = JSON.parse(cmsData);
    }
  } catch (error) {
    console.error('❌ Error reading input file:', error.message);
    process.exit(1);
  }

  console.log(`📁 Loaded data from: ${inputFile}\n`);

  // Migration results
  const results = {};

  // Migrate each entity type
  const migrations = [
    { table: 'slides', data: cmsData.slides, mappings: fieldMappings.slides },
    { table: 'projects', data: cmsData.projects, mappings: fieldMappings.projects },
    { table: 'team_members', data: cmsData.team, mappings: fieldMappings.team },
    { table: 'board_members', data: cmsData.board, mappings: fieldMappings.board },
    { table: 'clients', data: cmsData.clients, mappings: fieldMappings.clients },
    { table: 'testimonials', data: cmsData.testimonials, mappings: fieldMappings.testimonials },
    { table: 'services', data: cmsData.services, mappings: fieldMappings.services },
    { table: 'blog_posts', data: cmsData.blog, mappings: fieldMappings.blog },
    { table: 'certifications', data: cmsData.certifications, mappings: fieldMappings.certifications }
  ];

  for (const { table, data, mappings } of migrations) {
    results[table] = await migrateTable(table, data, mappings);
  }

  // Migrate settings
  results.settings = await migrateSettings(cmsData);

  // Summary
  console.log('\n' + '=' .repeat(50));
  console.log('📊 Migration Summary:\n');

  let totalSuccess = 0;
  let totalFailed = 0;

  for (const [table, result] of Object.entries(results)) {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${table}: ${result.count || 0} records`);
    if (result.success) totalSuccess++;
    else totalFailed++;
  }

  console.log('\n' + '=' .repeat(50));
  console.log(`\n✨ Migration complete!`);
  console.log(`   Success: ${totalSuccess} tables`);
  console.log(`   Failed: ${totalFailed} tables\n`);
}

// CLI entry point
const inputFile = process.argv[2];

if (!inputFile) {
  console.log(`
📦 localStorage to Supabase Migration Tool

Usage: node scripts/migrate-from-localstorage.js <input-file>

To export your localStorage data:
1. Open browser console on your CMS page
2. Run: copy(JSON.stringify(localStorage.getItem('kj_cms_data')))
3. Paste into a JSON file
4. Run this script with the file path

Example:
  node scripts/migrate-from-localstorage.js ./cms-export.json
`);
  process.exit(0);
}

migrate(inputFile).catch(console.error);

