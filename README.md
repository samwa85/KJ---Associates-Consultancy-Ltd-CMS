# KJ & Associates Consultancy Ltd - CMS Website

A professional website and content management system for KJ & Associates Consultancy Ltd, a quantity surveying firm based in Tanzania.

## 🏗️ Project Overview

This project consists of:
- **Frontend**: Static HTML/CSS/JS website with dynamic content loading
- **Backend**: Node.js + Express API server
- **Database**: Supabase (PostgreSQL)
- **CMS Admin**: Web-based admin panel for content management

## 📁 Project Structure

```
├── index.html              # Homepage
├── about.html              # About Us page
├── contact.html            # Contact page
├── team.html               # Team page
├── clients.html            # Clients page
├── certifications.html     # Certifications page
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
├── projects/               # Projects section
├── services/               # Services section
├── blog/                   # Blog section
├── admin/                  # CMS Admin Panel
│   ├── index.html          # Admin dashboard
│   └── cms-data.js         # CMS data management
├── css/                    # Stylesheets
│   ├── style.css           # Main styles
│   └── themes.css          # Theme variations
├── js/                     # JavaScript
│   ├── main.js             # Main frontend JS
│   ├── api-client.js       # API client for backend
│   └── config.js           # Configuration
├── uploads/                # Uploaded files
├── server/                 # Node.js Backend
│   ├── src/                # Server source code
│   ├── database/           # SQL schemas
│   └── README.md           # Backend documentation
└── README.md               # This file
```

## 🚀 Getting Started

### Option 1: Static Site (No Backend)

For development or simple hosting, the site works with localStorage:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8080
```

Visit `http://localhost:8080` to view the site.

### Option 2: Full Stack with Supabase Backend

1. **Set up Supabase:**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run `server/database/schema.sql` in SQL Editor
   - Get your project URL and service role key

2. **Configure the backend:**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Install and run:**
   ```bash
   npm install
   npm run dev
   ```

4. **Update frontend config:**
   Edit `js/config.js` to point to your API:
   ```javascript
   window.API_BASE_URL = 'http://localhost:3001/api';
   ```

See `server/README.md` for detailed backend documentation.

## 🔧 Configuration

### Environment Variables (Backend)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:8080
```

### Frontend Configuration

Edit `js/config.js`:
```javascript
window.API_BASE_URL = 'http://localhost:3001/api';
window.USE_API = true;  // false to use localStorage
```

## 📊 CMS Features

Access the admin panel at `/admin/index.html`:

- **Hero Slides**: Manage homepage slideshow
- **Projects**: Add/edit portfolio projects
- **Team**: Manage team members and board
- **Clients**: Client organizations
- **Testimonials**: Client testimonials
- **Services**: Service offerings
- **Blog**: Blog posts
- **Certifications**: Company certifications
- **Settings**: Branding, contact info, SEO

## 🔌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/projects` | List all projects |
| `GET /api/projects/featured` | Featured projects |
| `GET /api/team` | Team members |
| `GET /api/clients` | Client organizations |
| `GET /api/testimonials` | Testimonials |
| `GET /api/settings/branding` | Branding settings |

See `server/README.md` for complete API documentation.

## 🚢 Deployment

### Frontend Only (Static Hosting)

Deploy to any static host:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### Full Stack

1. Deploy backend to:
   - Railway
   - Render
   - Vercel (Serverless)
   - DigitalOcean App Platform

2. Update `js/config.js` with production API URL

3. Deploy frontend to static host

### Docker

```dockerfile
# Backend
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🔐 Security

- Service role keys are never exposed to frontend
- JWT authentication for protected routes
- Row Level Security (RLS) on all tables
- Rate limiting on API endpoints
- CORS configuration
- Helmet security headers

## 📝 Migration from localStorage

If you have existing data in localStorage:

```bash
# Export from browser console:
# copy(JSON.stringify(localStorage.getItem('kj_cms_data')))

# Run migration:
cd server
node scripts/migrate-from-localstorage.js ./cms-export.json
```

## 🛠️ Development

### Frontend Development

```bash
# Start local server
python3 -m http.server 8080

# Edit files and refresh browser
```

### Backend Development

```bash
cd server
npm run dev  # Starts with nodemon
```

### Database Changes

1. Edit `server/database/schema.sql`
2. Run changes in Supabase SQL Editor
3. Update services/controllers as needed

## 📄 License

MIT License - See LICENSE file for details.

## 🤝 Support

For support, contact KJ & Associates Consultancy Ltd:
- Email: md@kjconsultancy.co.tz
- Phone: +255 768 757 779
