#!/usr/bin/env node

/**
 * Helper script to extract and save uploaded images from localStorage data
 * 
 * Usage:
 * 1. Export your CMS data from the admin panel (Export All Data)
 * 2. Save it as 'cms-data-export.json' in the project root
 * 3. Run: node save-uploaded-images.js
 * 
 * This script will:
 * - Read the exported JSON file
 * - Extract all base64 image data
 * - Save images to the /uploads folder structure
 * - Update paths in the JSON to point to the saved files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_FILE = 'cms-data-export.json';
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Create uploads subdirectories
const subdirs = ['projects', 'team', 'board', 'clients', 'slides', 'blog', 'testimonials'];
subdirs.forEach(subdir => {
    const dir = path.join(UPLOADS_DIR, subdir);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

// Function to extract base64 data and save as file
function saveBase64Image(base64Data, filePath) {
    if (!base64Data || !base64Data.startsWith('data:image')) {
        return false;
    }
    
    try {
        // Extract mime type and base64 data
        const matches = base64Data.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
        if (!matches) {
            return false;
        }
        
        const mimeType = matches[1];
        const base64String = matches[2];
        const buffer = Buffer.from(base64String, 'base64');
        
        // Ensure file extension matches mime type
        const ext = mimeType === 'jpeg' ? 'jpg' : mimeType;
        const finalPath = filePath.replace(/\.[^.]+$/, `.${ext}`);
        
        // Write file
        fs.writeFileSync(finalPath, buffer);
        console.log(`Saved: ${finalPath}`);
        return finalPath;
    } catch (error) {
        console.error(`Error saving ${filePath}:`, error.message);
        return false;
    }
}

// Function to process CMS data and extract images
function processCMSData(data) {
    let savedCount = 0;
    
    // Process projects
    if (data.projects && Array.isArray(data.projects)) {
        data.projects.forEach((project, index) => {
            if (project.image && project.image.startsWith('data:image')) {
                const filename = `project-${project.id || index + 1}.jpg`;
                const filePath = path.join(UPLOADS_DIR, 'projects', filename);
                const savedPath = saveBase64Image(project.image, filePath);
                if (savedPath) {
                    project.image = `/uploads/projects/${path.basename(savedPath)}`;
                    savedCount++;
                }
            }
        });
    }
    
    // Process team members
    if (data.team && Array.isArray(data.team)) {
        data.team.forEach((member, index) => {
            if (member.photo && member.photo.startsWith('data:image')) {
                const name = (member.name || 'member').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
                const filename = `${name}-${member.id || index + 1}.jpg`;
                const filePath = path.join(UPLOADS_DIR, 'team', filename);
                const savedPath = saveBase64Image(member.photo, filePath);
                if (savedPath) {
                    member.photo = `/uploads/team/${path.basename(savedPath)}`;
                    savedCount++;
                }
            }
        });
    }
    
    // Process board members
    if (data.board && Array.isArray(data.board)) {
        data.board.forEach((member, index) => {
            if (member.photo && member.photo.startsWith('data:image')) {
                const name = (member.name || 'member').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
                const filename = `${name}-${member.id || index + 1}.jpg`;
                const filePath = path.join(UPLOADS_DIR, 'board', filename);
                const savedPath = saveBase64Image(member.photo, filePath);
                if (savedPath) {
                    member.photo = `/uploads/board/${path.basename(savedPath)}`;
                    savedCount++;
                }
            }
        });
    }
    
    // Process clients
    if (data.clients && Array.isArray(data.clients)) {
        data.clients.forEach((client, index) => {
            if (client.logo && client.logo.startsWith('data:image')) {
                const name = (client.name || 'client').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
                const filename = `${name}-${client.id || index + 1}.jpg`;
                const filePath = path.join(UPLOADS_DIR, 'clients', filename);
                const savedPath = saveBase64Image(client.logo, filePath);
                if (savedPath) {
                    client.logo = `/uploads/clients/${path.basename(savedPath)}`;
                    savedCount++;
                }
            }
        });
    }
    
    // Process slides
    if (data.slides && Array.isArray(data.slides)) {
        data.slides.forEach((slide, index) => {
            if (slide.image && slide.image.startsWith('data:image')) {
                const filename = `slide-${slide.id || index + 1}.jpg`;
                const filePath = path.join(UPLOADS_DIR, 'slides', filename);
                const savedPath = saveBase64Image(slide.image, filePath);
                if (savedPath) {
                    slide.image = `/uploads/slides/${path.basename(savedPath)}`;
                    savedCount++;
                }
            }
        });
    }
    
    // Process blog posts
    if (data.blog && Array.isArray(data.blog)) {
        data.blog.forEach((post, index) => {
            if (post.image && post.image.startsWith('data:image')) {
                const title = (post.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
                const filename = `${title}-${post.id || index + 1}.jpg`;
                const filePath = path.join(UPLOADS_DIR, 'blog', filename);
                const savedPath = saveBase64Image(post.image, filePath);
                if (savedPath) {
                    post.image = `/uploads/blog/${path.basename(savedPath)}`;
                    savedCount++;
                }
            }
            if (post.authorPhoto && post.authorPhoto.startsWith('data:image')) {
                const author = (post.author || 'author').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
                const filename = `${author}-${post.id || index + 1}.jpg`;
                const filePath = path.join(UPLOADS_DIR, 'blog', filename);
                const savedPath = saveBase64Image(post.authorPhoto, filePath);
                if (savedPath) {
                    post.authorPhoto = `/uploads/blog/${path.basename(savedPath)}`;
                    savedCount++;
                }
            }
        });
    }
    
    // Process testimonials
    if (data.testimonials && Array.isArray(data.testimonials)) {
        data.testimonials.forEach((testimonial, index) => {
            if (testimonial.photo && testimonial.photo.startsWith('data:image')) {
                const name = (testimonial.name || 'testimonial').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
                const filename = `${name}-${testimonial.id || index + 1}.jpg`;
                const filePath = path.join(UPLOADS_DIR, 'testimonials', filename);
                const savedPath = saveBase64Image(testimonial.photo, filePath);
                if (savedPath) {
                    testimonial.photo = `/uploads/testimonials/${path.basename(savedPath)}`;
                    savedCount++;
                }
            }
        });
    }
    
    return { data, savedCount };
}

// Main execution
try {
    console.log('Reading CMS data export...');
    
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Error: ${INPUT_FILE} not found!`);
        console.log('Please export your CMS data first from the admin panel.');
        process.exit(1);
    }
    
    const jsonData = fs.readFileSync(INPUT_FILE, 'utf8');
    const cmsData = JSON.parse(jsonData);
    
    console.log('Processing images...');
    const { data: updatedData, savedCount } = processCMSData(cmsData);
    
    // Save updated data back
    const outputFile = 'cms-data-export-updated.json';
    fs.writeFileSync(outputFile, JSON.stringify(updatedData, null, 2));
    
    console.log(`\n✅ Successfully saved ${savedCount} image(s) to /uploads folder`);
    console.log(`✅ Updated data saved to: ${outputFile}`);
    console.log('\nNext steps:');
    console.log('1. Review the saved images in the /uploads folder');
    console.log('2. Import the updated JSON file back into the CMS if needed');
    console.log('3. Or manually update localStorage with the new paths');
    
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}

