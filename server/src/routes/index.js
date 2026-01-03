/**
 * API Routes Index
 * Main router that combines all route modules
 */

const express = require('express');
const router = express.Router();

// Import route modules
const slidesRoutes = require('./slides');
const projectsRoutes = require('./projects');
const teamRoutes = require('./team');
const boardRoutes = require('./board');
const clientsRoutes = require('./clients');
const testimonialsRoutes = require('./testimonials');
const servicesRoutes = require('./services');
const blogRoutes = require('./blog');
const certificationsRoutes = require('./certifications');
const settingsRoutes = require('./settings');
const uploadRoutes = require('./upload');
const authRoutes = require('./auth');

// API Info endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'KJ & Associates CMS API',
    version: '1.0.0',
    endpoints: {
      slides: '/api/slides',
      projects: '/api/projects',
      team: '/api/team',
      board: '/api/board',
      clients: '/api/clients',
      testimonials: '/api/testimonials',
      services: '/api/services',
      blog: '/api/blog',
      certifications: '/api/certifications',
      settings: '/api/settings',
      upload: '/api/upload',
      auth: '/api/auth'
    }
  });
});

// Mount routes
router.use('/slides', slidesRoutes);
router.use('/projects', projectsRoutes);
router.use('/team', teamRoutes);
router.use('/board', boardRoutes);
router.use('/clients', clientsRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/services', servicesRoutes);
router.use('/blog', blogRoutes);
router.use('/certifications', certificationsRoutes);
router.use('/settings', settingsRoutes);
router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);

module.exports = router;

