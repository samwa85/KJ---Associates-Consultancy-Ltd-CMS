/**
 * Database Setup Script
 * Creates all required tables in PostgreSQL
 * 
 * Usage: node scripts/setup-database.js
 * Requires DATABASE_URL environment variable or POSTGRES_PASSWORD + SUPABASE_DB_HOST in .env
 */

require('dotenv').config();
const { Client } = require('pg');

// Get connection string from environment variables (NEVER hardcode credentials!)
const connectionString = process.env.DATABASE_URL || 
  `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@${process.env.SUPABASE_DB_HOST || 'localhost'}:5432/postgres`;

if (!process.env.DATABASE_URL && !process.env.POSTGRES_PASSWORD) {
  console.error('❌ Error: DATABASE_URL or POSTGRES_PASSWORD environment variable is required');
  console.error('   Set DATABASE_URL in your .env file or provide POSTGRES_PASSWORD and SUPABASE_DB_HOST');
  console.error('');
  console.error('   Example .env configuration:');
  console.error('   DATABASE_URL=postgresql://postgres:yourpassword@yourhost:5432/postgres');
  console.error('   OR');
  console.error('   POSTGRES_PASSWORD=yourpassword');
  console.error('   SUPABASE_DB_HOST=yourhost');
  process.exit(1);
}

// SQL to create tables
const createTablesSQL = \`
-- SLIDES TABLE
CREATE TABLE IF NOT EXISTS slides (
    id SERIAL PRIMARY KEY,
    tagline VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    title_highlight VARCHAR(255),
    button_text VARCHAR(100),
    button_link VARCHAR(255),
    image TEXT,
    active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    client VARCHAR(255),
    location VARCHAR(255),
    value VARCHAR(100),
    currency VARCHAR(10) DEFAULT 'TZS',
    funding VARCHAR(100),
    sector VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Ongoing',
    year INTEGER,
    duration INTEGER DEFAULT 0,
    description TEXT,
    image TEXT,
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    experience INTEGER DEFAULT 0,
    qualifications TEXT,
    bio TEXT,
    photo TEXT,
    email VARCHAR(255),
    linkedin VARCHAR(255),
    category VARCHAR(50) DEFAULT 'technical',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- BOARD MEMBERS TABLE
CREATE TABLE IF NOT EXISTS board_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    qualifications TEXT,
    experience INTEGER DEFAULT 0,
    bio TEXT,
    photo TEXT,
    is_chairman BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CLIENTS TABLE
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    logo TEXT,
    website VARCHAR(255),
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    company VARCHAR(255),
    text TEXT NOT NULL,
    photo TEXT,
    rating INTEGER DEFAULT 5,
    published BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    icon VARCHAR(50),
    category VARCHAR(100),
    summary TEXT,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category VARCHAR(100),
    image TEXT,
    author VARCHAR(255),
    author_photo TEXT,
    author_role VARCHAR(255),
    author_bio TEXT,
    date DATE DEFAULT CURRENT_DATE,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    description TEXT,
    image TEXT,
    valid_until DATE,
    category VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
('branding', '{"logoType": "image", "logoText": "KJ & Associates", "logoSubtitle": "Consultancy Ltd", "logoImageUrl": "/uploads/logo_kj&.png"}'),
('contact', '{"phone": "+255 768 757 779", "whatsapp": "+255768757779", "email": "md@kjconsultancy.co.tz", "email2": "info@kjconsultancy.co.tz", "address": "KIJITONYAMA, MABATINI ROAD, DAR ES SALAAM, TANZANIA", "city": "Dar es Salaam", "country": "Tanzania"}'),
('seo', '{"title": "KJ & Associates Consultancy Ltd", "description": "Professional quantity surveying and construction project management services in Tanzania."}'),
('theme', '"classic-green"')
ON CONFLICT (key) DO NOTHING;
\`;

async function setupDatabase() {
  console.log('🚀 Connecting to PostgreSQL...');
  
  const client = new Client({
    connectionString,
    ssl: false
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    console.log('📦 Creating tables...');
    await client.query(createTablesSQL);
    console.log('✅ Tables created successfully!');

    // Verify tables
    const result = await client.query(\`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    \`);

    console.log('\\n📋 Tables in database:');
    result.rows.forEach(row => {
      console.log(\`   - \${row.table_name}\`);
    });

    console.log('\\n✨ Database setup complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

setupDatabase();
