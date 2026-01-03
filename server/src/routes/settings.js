/**
 * Settings Routes
 */

const express = require('express');
const router = express.Router();
const { settingsController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes (read-only)
router.get('/', settingsController.getAll);
router.get('/branding', settingsController.getBranding);
router.get('/contact', settingsController.getContact);
router.get('/seo', settingsController.getSEO);
router.get('/theme', settingsController.getTheme);

// Protected routes (write)
router.put('/branding', verifyToken, settingsController.updateBranding);
router.put('/contact', verifyToken, settingsController.updateContact);
router.put('/seo', verifyToken, settingsController.updateSEO);
router.put('/theme', verifyToken, settingsController.updateTheme);

module.exports = router;

