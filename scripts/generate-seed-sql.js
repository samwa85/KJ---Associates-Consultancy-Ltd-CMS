const fs = require('fs');
const path = require('path');

// Load CMS Data
const dataPath = path.join(__dirname, '../data/cms-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const cmsData = JSON.parse(rawData);

let sql = '-- Generated Seed Data from Frontend JSON (Fixed Schema)\n\n';

function escape(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/'/g, "''"); // Escape single quotes for SQL
}

function pgArray(arr) {
    if (!Array.isArray(arr)) return 'NULL';
    if (arr.length === 0) return "'{}'";
    // Escape items and join
    const items = arr.map(item => `"${item.replace(/"/g, '\\"')}"`).join(',');
    return `'${items}'`; // No, Postgres literal array syntax is '{item1,item2}'
    // Actually, simplest is ARRAY['a','b'] syntax in SQL
    // let list = arr.map(i => `'${escape(i)}'`).join(',');
    // return `ARRAY[${list}]`;
}

function pgLiteralArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return "'{}'";
    // Format: '{"a","b"}'
    const content = arr.map(s => `"${s.replace(/"/g, '\\"')}"`).join(',');
    return `'{${content}}'`;
}


// 1. Slides
// Schema: id, tagline, title, title_highlight, button_text, button_link, image, active, display_order
if (cmsData.slides && cmsData.slides.length > 0) {
    sql += '-- Slides\n';
    sql += `INSERT INTO slides (id, title, tagline, title_highlight, image, button_link, button_text, active, display_order) VALUES\n`;
    const values = cmsData.slides.map(item => {
        return `(${item.id}, '${escape(item.title)}', '${escape(item.tagline)}', '${escape(item.titleHighlight)}', '${escape(item.image)}', '${escape(item.buttonLink)}', '${escape(item.buttonText)}', ${item.active}, ${item.id})`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, tagline = EXCLUDED.tagline, image = EXCLUDED.image;\n\n';
}

// 2. Projects
// Schema: id, title, client, location, value, funding, sector, status, year, duration, description, image, services (TEXT[]), featured, display_order
if (cmsData.projects && cmsData.projects.length > 0) {
    sql += '-- Projects\n';
    sql += `INSERT INTO projects (id, title, client, location, value, funding, sector, status, year, duration, description, image, services, featured) VALUES\n`;
    const values = cmsData.projects.map(item => {
        const servicesArr = Array.isArray(item.services) ? item.services : [];
        return `(${item.id}, '${escape(item.title)}', '${escape(item.client)}', '${escape(item.location)}', '${escape(item.value)}', '${escape(item.funding)}', '${escape(item.sector)}', '${escape(item.status)}', ${item.year}, ${item.duration || 0}, '${escape(item.description)}', '${escape(item.image)}', ${pgLiteralArray(servicesArr)}, false)`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;\n\n';
}

// 3. Team
// Schema: id, name, role, experience, qualifications, bio, photo, email, linkedin, display_order
if (cmsData.team && cmsData.team.length > 0) {
    sql += '-- Team\n';
    sql += `INSERT INTO team_members (id, name, role, experience, qualifications, bio, photo, email, linkedin, display_order) VALUES\n`;
    const values = cmsData.team.map(item => {
        return `(${item.id}, '${escape(item.name)}', '${escape(item.role)}', ${item.experience}, '${escape(item.qualifications)}', '${escape(item.bio)}', '${escape(item.photo)}', '${escape(item.email)}', '${escape(item.linkedin)}', ${item.id})`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n\n';
}

// 4. Clients
// Schema: id, name, category, logo, website, display_order
if (cmsData.clients && cmsData.clients.length > 0) {
    sql += '-- Clients\n';
    sql += `INSERT INTO clients (id, name, category, logo, website, display_order) VALUES\n`;
    const values = cmsData.clients.map(item => {
        return `(${item.id}, '${escape(item.name)}', '${escape(item.category)}', '${escape(item.logo || item.website)}', '${escape(item.website)}', ${item.id})`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n\n';
}

// 5. Testimonials
// Schema: id, name, position, company, text, photo, rating, display_order
if (cmsData.testimonials && cmsData.testimonials.length > 0) {
    sql += '-- Testimonials\n';
    sql += `INSERT INTO testimonials (id, name, position, company, text, photo, rating, display_order) VALUES\n`;
    const values = cmsData.testimonials.map(item => {
        return `(${item.id}, '${escape(item.name)}', '${escape(item.position)}', '${escape(item.company)}', '${escape(item.text)}', '${escape(item.photo)}', ${item.rating}, ${item.id})`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text;\n\n';
}

// 6. Blog
// Schema: id, title, slug, excerpt, content, category, image, author, date, published
if (cmsData.blog && cmsData.blog.length > 0) {
    sql += '-- Blog Posts\n';
    sql += `INSERT INTO blog_posts (id, title, slug, excerpt, content, category, image, author, date, published) VALUES\n`;
    const values = cmsData.blog.map(item => {
        const isPublished = item.published ? 'true' : 'false';
        return `(${item.id}, '${escape(item.title)}', '${escape(item.slug)}', '${escape(item.excerpt)}', '${escape(item.content)}', '${escape(item.category)}', '${escape(item.image)}', '${escape(item.author)}', '${escape(item.date)}', ${isPublished})`;
    });
    sql += values.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;\n\n';
}

// Write to file
const outputPath = path.join(__dirname, '../data/seed-frontend.sql');
fs.writeFileSync(outputPath, sql);
console.log(`✅ Generated SQL Seed at: ${outputPath}`);
