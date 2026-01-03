#!/usr/bin/env node
/**
 * Create Admin User Script
 * 
 * Usage:
 *   node scripts/create-admin.js <email> <password>
 * 
 * Example:
 *   node scripts/create-admin.js admin@kjconsultancy.co.tz MySecurePassword123
 */

require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

// Get credentials from arguments or prompt
const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

if (!email || !password) {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║           KJ & Associates CMS - Create Admin User         ║
╚═══════════════════════════════════════════════════════════╝

Usage:
  node scripts/create-admin.js <email> <password>

Example:
  node scripts/create-admin.js admin@kjconsultancy.co.tz MySecurePassword123

Requirements:
  - Password must be at least 8 characters
  - Email must be valid
  - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env
`);
  process.exit(1);
}

// Validate inputs
if (password.length < 8) {
  console.error('❌ Error: Password must be at least 8 characters');
  process.exit(1);
}

if (!email.includes('@')) {
  console.error('❌ Error: Invalid email address');
  process.exit(1);
}

// Check environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  console.log('\nMake sure your .env file contains:');
  console.log('  SUPABASE_URL=https://your-project.supabase.co');
  console.log('  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  console.log('\n🔄 Creating admin user...\n');

  try {
    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error checking existing users:', listError.message);
      process.exit(1);
    }

    const existingUser = existingUsers.users.find(u => u.email === email);
    
    if (existingUser) {
      console.log('⚠️  User already exists with this email.');
      console.log('\nDo you want to update the password? Run:');
      console.log(`  node scripts/update-admin-password.js ${email} <new-password>\n`);
      process.exit(0);
    }

    // Create new admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: 'admin',
        name: 'CMS Administrator'
      },
      app_metadata: {
        role: 'admin'
      }
    });

    if (error) {
      console.error('❌ Error creating user:', error.message);
      process.exit(1);
    }

    console.log('✅ Admin user created successfully!\n');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║                    Admin User Details                     ║');
    console.log('╠═══════════════════════════════════════════════════════════╣');
    console.log(`║  Email:    ${email.padEnd(45)}║`);
    console.log(`║  User ID:  ${data.user.id.padEnd(45)}║`);
    console.log(`║  Role:     admin${' '.repeat(40)}║`);
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('\n🔐 Auth pages removed; use admin API or scripts to manage access.\n');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

createAdmin();

