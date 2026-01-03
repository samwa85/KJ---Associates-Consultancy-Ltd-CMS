/**
 * Testimonials Routes
 */

const express = require('express');
const router = express.Router();
const { testimonialsController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', testimonialsController.getAll);
router.get('/published', testimonialsController.getPublished);
router.get('/:id', testimonialsController.getById);

// Protected routes
router.post('/', verifyToken, testimonialsController.create);
router.put('/:id', verifyToken, testimonialsController.update);
router.delete('/:id', verifyToken, testimonialsController.delete);
router.post('/delete-many', verifyToken, testimonialsController.deleteMany);

module.exports = router;

