/**
 * Slides Routes
 */

const express = require('express');
const router = express.Router();
const { slidesController } = require('../controllers');
const { verifyToken, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', slidesController.getAll);
router.get('/active', slidesController.getActive);
router.get('/:id', slidesController.getById);

// Protected routes (require authentication)
router.post('/', verifyToken, slidesController.create);
router.put('/:id', verifyToken, slidesController.update);
router.delete('/:id', verifyToken, slidesController.delete);
router.post('/delete-many', verifyToken, slidesController.deleteMany);

module.exports = router;

