const fs = require('fs');
const path = require('path');

// Load CMS Data
const dataPath = path.join(__dirname, '../data/cms-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const cmsData = JSON.parse(rawData);

let sql = '-- Generated Seed Data from Frontend JSON\n\n';

function escape(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/'/g, "''"); // Escape single quotes for SQL
}

// 1. Slides
if (cmsData.slides && cmsData.slides.length > 0) {
    sql += '-- Slides\n';
    sql += `INSERT INTO slides (id, title, subtitle, content, image_url, link, button_text, is_active, display_order) VALUES\n`;
    const values = cmsData.slides.map(item => {
        return `(${item.id}, '${escape(item.title)}', '${escape(item.tagline)}', '${escape(item.titleHighlight)}', '${escape(item.image)}', '${escape(item.buttonLink)}', '${escape(item.buttonText)}', ${item.active}, ${item.id})`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, subtitle = EXCLUDED.subtitle;\n\n';
}

// 2. Projects
if (cmsData.projects && cmsData.projects.length > 0) {
    sql += '-- Projects\n';
    // Check schema for columns. Assuming: id, title, client_name, location, project_value, status, completion_year, sector, description, image_url, services, category, slug
    sql += `INSERT INTO projects (id, title, client_name, location, project_value, status, completion_year, sector, description, image_url, services, category, slug) VALUES\n`;
    const values = cmsData.projects.map(item => {
        const services = Array.isArray(item.services) ? item.services.join(', ') : item.services;
        const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `(${item.id}, '${escape(item.title)}', '${escape(item.client)}', '${escape(item.location)}', '${escape(item.value)}', '${escape(item.status)}', ${item.year}, '${escape(item.sector)}', '${escape(item.description)}', '${escape(item.image)}', '${escape(services)}', '${escape(item.sector)}', '${escape(slug)}')`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;\n\n';
}

// 3. Team
if (cmsData.team && cmsData.team.length > 0) {
    sql += '-- Team\n';
    sql += `INSERT INTO team_members (id, name, role, bio, image_url, email, linkedin_url, display_order, position) VALUES\n`;
    const values = cmsData.team.map(item => {
        return `(${item.id}, '${escape(item.name)}', '${escape(item.role)}', '${escape(item.bio)}', '${escape(item.photo)}', '${escape(item.email)}', '${escape(item.linkedin)}', ${item.id}, '${escape(item.role)}')`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n\n';
}

// 4. Clients
if (cmsData.clients && cmsData.clients.length > 0) {
    sql += '-- Clients\n';
    sql += `INSERT INTO clients (id, name, category, logo_url, website_url, display_order) VALUES\n`;
    const values = cmsData.clients.map(item => {
        return `(${item.id}, '${escape(item.name)}', '${escape(item.category)}', '${escape(item.logo || item.website)}', '${escape(item.website)}', ${item.id})`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n\n';
}

// 5. Testimonials
if (cmsData.testimonials && cmsData.testimonials.length > 0) {
    sql += '-- Testimonials\n';
    sql += `INSERT INTO testimonials (id, name, role, company, content, image_url, rating, client_name) VALUES\n`;
    const values = cmsData.testimonials.map(item => {
        return `(${item.id}, '${escape(item.name)}', '${escape(item.position)}', '${escape(item.company)}', '${escape(item.text)}', '${escape(item.photo)}', ${item.rating}, '${escape(item.name)}')`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content;\n\n';
}

// 6. Blog
if (cmsData.blog && cmsData.blog.length > 0) {
    sql += '-- Blog Posts\n';
    sql += `INSERT INTO blog_posts (id, title, slug, excerpt, content, image_url, author, published_at, is_published, category) VALUES\n`;
    const values = cmsData.blog.map(item => {
        const isPublished = item.published ? 'true' : 'false';
        return `(${item.id}, '${escape(item.title)}', '${escape(item.slug)}', '${escape(item.excerpt)}', '${escape(item.content)}', '${escape(item.image)}', '${escape(item.author)}', '${escape(item.date)}', ${isPublished}, '${escape(item.category)}')`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;\n\n';
}

// Write to file
const outputPath = path.join(__dirname, '../data/seed-frontend.sql');
fs.writeFileSync(outputPath, sql);
console.log(`✅ Generated SQL Seed at: ${outputPath}`);
