# KJ & Associates CMS - Node.js Backend

A Node.js + Express + Supabase backend for the KJ & Associates Consultancy CMS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- An existing Supabase project with database access
- Supabase URL and Service Role Key

### Installation

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   PORT=3001
   NODE_ENV=development
   ```

4. **Set up the database:**
   
   Run the schema SQL in your Supabase SQL Editor:
   ```bash
   # Copy contents of database/schema.sql
   # Paste and run in Supabase Dashboard > SQL Editor
   ```

5. **Start the server:**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

6. **Verify the server is running:**
   ```
   http://localhost:3001/health
   ```

## 📁 Project Structure

```
server/
├── src/
│   ├── index.js              # Express app entry point
│   ├── config/
│   │   └── supabase.js       # Supabase client configuration
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication middleware
│   │   └── errorHandler.js   # Centralized error handling
│   ├── services/
│   │   ├── baseService.js    # Base CRUD service class
│   │   └── index.js          # All service instances
│   ├── controllers/
│   │   ├── baseController.js # Base controller class
│   │   └── index.js          # All controller instances
│   └── routes/
│       ├── index.js          # Route aggregator
│       ├── auth.js           # Authentication routes
│       ├── slides.js         # Slides CRUD routes
│       ├── projects.js       # Projects CRUD routes
│       ├── team.js           # Team members routes
│       ├── board.js          # Board members routes
│       ├── clients.js        # Clients routes
│       ├── testimonials.js   # Testimonials routes
│       ├── services.js       # Services routes
│       ├── blog.js           # Blog posts routes
│       ├── certifications.js # Certifications routes
│       ├── settings.js       # Settings routes
│       └── upload.js         # File upload routes
├── database/
│   ├── schema.sql            # Database schema
│   └── seed.sql              # Initial seed data
├── scripts/
│   └── migrate-from-localstorage.js  # Migration tool
├── package.json
├── .env.example
└── README.md
```

## 🔌 API Endpoints

### Base URL
- Development: `http://localhost:3001/api`
- Production: `https://your-domain.com/api`

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signin` | Sign in with email/password |
| POST | `/auth/signout` | Sign out current user |
| GET | `/auth/me` | Get current user info |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/update-password` | Update password |

### Content Endpoints

All content endpoints follow the same pattern:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/{resource}` | List all | No |
| GET | `/{resource}/:id` | Get by ID | No |
| POST | `/{resource}` | Create new | Yes |
| PUT | `/{resource}/:id` | Update | Yes |
| DELETE | `/{resource}/:id` | Delete | Yes |

**Resources:**
- `/slides` - Hero slideshow
- `/projects` - Project portfolio
- `/team` - Team members
- `/board` - Board of directors
- `/clients` - Client organizations
- `/testimonials` - Client testimonials
- `/services` - Service offerings
- `/blog` - Blog posts
- `/certifications` - Company certifications
- `/settings` - Site settings

### Special Endpoints

```
GET /projects/featured          # Featured projects
GET /projects/status/:status    # Projects by status
GET /projects/sector/:sector    # Projects by sector

GET /team/leadership            # Leadership team
GET /team/technical             # Technical team

GET /blog/published             # Published posts
GET /blog/featured              # Featured posts
GET /blog/slug/:slug            # Post by URL slug

GET /settings/branding          # Branding settings
GET /settings/contact           # Contact info
GET /settings/seo               # SEO settings
```

### File Upload

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload/:category` | Upload single file |
| POST | `/upload/:category/multiple` | Upload multiple files |
| DELETE | `/upload/:category/:filename` | Delete file |

## 🔐 Authentication

The API uses Supabase Auth with JWT tokens.

### Getting a Token

```javascript
const response = await fetch('http://localhost:3001/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'your-password'
  })
});

const { data } = await response.json();
const token = data.session.access_token;
```

### Using the Token

```javascript
fetch('http://localhost:3001/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ title: 'New Project', ... })
});
```

## 🗃️ Database Setup

### 1. Run Schema

Copy the contents of `database/schema.sql` and run in Supabase SQL Editor.

### 2. Seed Initial Data (Optional)

Copy the contents of `database/seed.sql` and run in Supabase SQL Editor.

### 3. Migrate from localStorage

If you have existing data in localStorage:

```bash
# Export from browser console:
# copy(JSON.stringify(localStorage.getItem('kj_cms_data')))
# Save to cms-export.json

node scripts/migrate-from-localstorage.js ./cms-export.json
```

## 🛡️ Security

- **Service Role Key**: Never expose in frontend code
- **RLS Policies**: Enabled on all tables
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for allowed origins
- **Helmet**: Security headers enabled
- **Input Validation**: Sanitized inputs

## 🚢 Deployment

### Environment Variables

Set these in your hosting platform:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-domain.com
```

### Platforms

**Vercel:**
```bash
vercel --prod
```

**Railway:**
```bash
railway up
```

**Render:**
- Connect GitHub repo
- Set environment variables
- Deploy

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📝 Development

### Running in Development

```bash
npm run dev
```

This starts the server with nodemon for auto-reload.

### Testing API

```bash
# Health check
curl http://localhost:3001/health

# Get all projects
curl http://localhost:3001/api/projects

# Get featured projects
curl http://localhost:3001/api/projects/featured
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details.

