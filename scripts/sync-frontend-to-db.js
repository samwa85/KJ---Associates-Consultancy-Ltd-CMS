require('dotenv').config({ path: 'server/.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load CMS Data
const dataPath = path.join(__dirname, '../data/cms-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const cmsData = JSON.parse(rawData);

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in server/.env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncTable(tableName, data, transformFn = (item) => item) {
    if (!data || data.length === 0) {
        console.log(`⚠️  No data found for ${tableName}`);
        return;
    }

    console.log(`🔄 Syncing ${data.length} items to '${tableName}'...`);

    // Transform data if needed (e.g., remapping fields)
    const rows = data.map(transformFn);

    const { error } = await supabase
        .from(tableName)
        .upsert(rows, { onConflict: 'id' });

    if (error) {
        console.error(`❌ Error syncing ${tableName}:`, error.message);
    } else {
        console.log(`✅ ${tableName} synced successfully!`);
    }
}

async function runSync() {
    console.log('🚀 Starting One-Way Sync: Frontend JSON -> Supabase DB');

    // 1. Sync Slides
    await syncTable('slides', cmsData.slides, (item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.tagline, // Mapping 'tagline' to 'subtitle'
        content: item.titleHighlight, // Storing highlight in content or description?
        image_url: item.image,
        link: item.buttonLink,
        button_text: item.buttonText,
        is_active: item.active,
        display_order: item.id
    }));

    // 2. Sync Projects
    await syncTable('projects', cmsData.projects, (item) => ({
        id: item.id,
        title: item.title,
        client_name: item.client,
        location: item.location,
        project_value: item.value,
        status: item.status,
        completion_year: item.year,
        sector: item.sector,
        description: item.description,
        image_url: item.image,
        services: Array.isArray(item.services) ? item.services.join(', ') : item.services, // Convert array to string
        category: item.sector, // Mapping sector to category
        slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') // Generate slug
    }));

    // 3. Sync Team
    await syncTable('team_members', cmsData.team, (item) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        bio: item.bio,
        image_url: item.photo,
        email: item.email,
        linkedin_url: item.linkedin,
        display_order: item.id,
        position: item.role // Add position derived from role
    }));

    // 4. Sync Clients
    await syncTable('clients', cmsData.clients, (item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        logo_url: item.logo || item.website, // Fallback if logo empty?
        website_url: item.website,
        display_order: item.id
    }));

    // 5. Sync Testimonials
    await syncTable('testimonials', cmsData.testimonials, (item) => ({
        id: item.id,
        name: item.name,
        role: item.position,
        company: item.company,
        content: item.text,
        image_url: item.photo,
        rating: item.rating,
        client_name: item.name // Redundant col
    }));

    // 6. Sync Services
    // (Assuming 'services' table exists, if not, skip)
    // await syncTable('services', cmsData.services, ...);

    // 7. Sync Blog Posts
    await syncTable('blog_posts', cmsData.blog, (item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        image_url: item.image,
        author: item.author,
        published_at: item.date,
        is_published: item.published,
        category: item.category
    }));

    console.log('🎉 Sync Complete!');
}

runSync().catch((err) => {
    console.error('❌ Fatal Error:', err);
    process.exit(1);
});
