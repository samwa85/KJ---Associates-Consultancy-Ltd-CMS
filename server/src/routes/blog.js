/**
 * Blog Routes
 */

const express = require('express');
const router = express.Router();
const { blogController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', blogController.getAll);
router.get('/published', blogController.getPublished);
router.get('/featured', blogController.getFeatured);
router.get('/category/:category', blogController.getByCategory);
router.get('/slug/:slug', blogController.getBySlug);
router.get('/:id', blogController.getById);

// Protected routes
router.post('/', verifyToken, blogController.create);
router.put('/:id', verifyToken, blogController.update);
router.delete('/:id', verifyToken, blogController.delete);
router.post('/delete-many', verifyToken, blogController.deleteMany);

module.exports = router;

