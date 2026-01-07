# KJ & Associates Consultancy Ltd - CMS

A modern, full-stack Content Management System for quantity surveying and construction project management firms.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green.svg)](https://supabase.com/)

---

## 🌟 Features

- **📊 Project Management** - Showcase construction projects with images, details, and filtering
- **👥 Team Management** - Manage team members and board of directors
- **💼 Client Portfolio** - Display client logos and testimonials
- **📝 Blog System** - Publish articles and industry insights
- **🎨 Theme Customization** - Multiple pre-built themes (Classic Green, Professional Dark, Earth Warm)
- **🔐 Secure Admin Panel** - Password-protected CMS with full CRUD operations
- **📱 Responsive Design** - Mobile-first, works on all devices
- **🚀 Fast & Lightweight** - Static frontend with API backend
- **☁️ Cloud Database** - Powered by Supabase (PostgreSQL)
- **🔄 Real-time Sync** - Changes reflect immediately on the website

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Admin Panel   │ (Static HTML/JS)
│   (Browser)     │
└────────┬────────┘
         │
         │ Direct Connection
         ▼
┌─────────────────┐
│  Supabase DB    │ (PostgreSQL)
│                 │
└────────┬────────┘
         ▲
         │ API Calls
         │
┌────────┴────────┐   ┌─────────────┐
│  API Server     │◄──│  Website    │ (Static HTML/JS)
│  (Node.js)      │   │  (Browser)  │
└─────────────────┘   └─────────────┘
```

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18 or higher
- npm or yarn
- Supabase account (free tier available)

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/samwa85/KJ---Associates-Consultancy-Ltd-CMS.git
   cd KJ---Associates-Consultancy-Ltd-CMS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

3. **Configure environment variables:**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Set up database:**
   - Create a Supabase project at https://supabase.com
   - Run the schema from `database/schema.sql` in Supabase SQL Editor
   - Copy your Supabase URL and keys to `server/.env`

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open the application:**
   - Website: Open `index.html` in your browser
   - Admin Panel: Open `admin/index.html` (password: `qwerty7890@`)

---

## 📖 Documentation

- **[Quick Start Guide](QUICK-START.md)** - Get up and running in 30 seconds
- **[Deployment Guide](DEPLOYMENT-GUIDE.md)** - Deploy to production with live API
- **[CRUD Testing Report](CRUD-TEST-REPORT.md)** - Comprehensive testing documentation
- **[Troubleshooting](CRUD-ISSUE-RESOLUTION.md)** - Common issues and solutions

---

## 🛠️ Tech Stack

### **Frontend**
- HTML5, CSS3, JavaScript (ES6+)
- Tailwind CSS (via CDN)
- Lucide Icons
- Vanilla JS (no framework dependencies)

### **Backend**
- Node.js + Express
- Supabase (PostgreSQL database)
- JWT authentication
- CORS middleware
- Rate limiting

### **Database**
- Supabase (managed PostgreSQL)
- Row Level Security (RLS)
- Real-time subscriptions
- Automatic backups

---

## 📁 Project Structure

```
KJ-Associates-CMS/
├── admin/                    # CMS Admin Panel
│   ├── index.html           # Admin dashboard
│   ├── cms-data.js          # CMS data management
│   └── cms-api-sync.js      # API synchronization
├── server/                   # Node.js API Server
│   ├── src/
│   │   ├── index.js         # Server entry point
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── middleware/      # Express middleware
│   ├── .env.example         # Environment template
│   └── package.json
├── database/                 # Database schemas & migrations
│   ├── schema.sql           # Main database schema
│   └── secure-policies.sql  # RLS policies
├── js/                      # Frontend JavaScript
│   ├── config.js            # Configuration
│   ├── main.js              # Main application logic
│   └── supabase-client.js   # Supabase client wrapper
├── css/                     # Stylesheets
│   ├── style.css            # Main styles
│   └── themes.css           # Theme definitions
├── projects/                # Projects page
│   └── index.html
├── index.html               # Homepage
├── about.html               # About page
├── contact.html             # Contact page
└── README.md                # This file
```

---

## 🎨 Features in Detail

### **Admin Panel**
- **Dashboard** - Overview of all content (projects, team, clients, etc.)
- **Projects** - Full CRUD operations with image upload
- **Team Members** - Manage staff and board members
- **Clients** - Client logos and information
- **Testimonials** - Customer reviews and ratings
- **Blog Posts** - Article management with rich text
- **Settings** - Branding, contact info, SEO, themes

### **Website**
- **Dynamic Content** - All content pulled from database
- **Project Filtering** - Filter by sector, status, funding source
- **Responsive Design** - Mobile, tablet, desktop optimized
- **SEO Optimized** - Meta tags, schema.org markup
- **Fast Loading** - Optimized images, lazy loading
- **Offline Support** - LocalStorage caching fallback

---

## 🔐 Security

- **Password Protection** - Admin panel requires authentication
- **Row Level Security** - Database-level access control
- **Environment Variables** - Sensitive data not in code
- **CORS Protection** - Whitelist allowed origins
- **Rate Limiting** - Prevent API abuse
- **Input Validation** - Sanitize all user inputs
- **HTTPS Only** - Secure connections in production

---

## 🚀 Deployment

### **Quick Deploy Options**

1. **Frontend (Static Files):**
   - 20i (current)
   - Netlify
   - Vercel
   - GitHub Pages

2. **Backend (API Server):**
   - Railway (recommended)
   - Render
   - Heroku
   - DigitalOcean App Platform

3. **Database:**
   - Supabase (managed PostgreSQL)

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions.

---

## 🧪 Testing

### **Run CRUD Tests:**

Open `test-crud.html` in your browser to run automated database tests.

### **Manual Testing:**

1. Start the server: `npm run dev`
2. Open admin panel: `admin/index.html`
3. Create a test project
4. Verify it appears on `projects/index.html`
5. Edit and delete the test project

See [CRUD-TEST-REPORT.md](CRUD-TEST-REPORT.md) for full test results.

---

## 📊 Database Schema

Main tables:
- `projects` - Construction projects
- `team_members` - Staff and leadership
- `board_members` - Board of directors
- `clients` - Client information
- `testimonials` - Customer reviews
- `blog_posts` - Blog articles
- `services` - Service offerings
- `certifications` - Company certifications
- `slides` - Homepage slideshow
- `settings` - Global settings

See `database/schema.sql` for complete schema.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**KJ & Associates Consultancy Ltd**
- Website: https://kjconsultancy.co.tz
- Email: info@kjconsultancy.co.tz
- Location: Dar es Salaam, Tanzania

**Developer**
- GitHub: [@samwa85](https://github.com/samwa85)

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Lucide Icons](https://lucide.dev) - Icon library
- [Express.js](https://expressjs.com) - Web framework

---

## 📞 Support

For issues, questions, or suggestions:

1. Check the [documentation](QUICK-START.md)
2. Search [existing issues](https://github.com/samwa85/KJ---Associates-Consultancy-Ltd-CMS/issues)
3. Create a [new issue](https://github.com/samwa85/KJ---Associates-Consultancy-Ltd-CMS/issues/new)

---

## 🗺️ Roadmap

- [ ] Implement Supabase Auth for admin panel
- [ ] Add image optimization and CDN support
- [ ] Create mobile app (React Native)
- [ ] Add multi-language support
- [ ] Implement advanced analytics
- [ ] Add email notifications
- [ ] Create automated backups
- [ ] Add version control for content

---

## 📈 Status

**Current Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** January 7, 2026

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
