/**
 * Certifications Routes
 */

const express = require('express');
const router = express.Router();
const { certificationsController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', certificationsController.getAll);
router.get('/category/:category', certificationsController.getByCategory);
router.get('/:id', certificationsController.getById);

// Protected routes
router.post('/', verifyToken, certificationsController.create);
router.put('/:id', verifyToken, certificationsController.update);
router.delete('/:id', verifyToken, certificationsController.delete);
router.post('/delete-many', verifyToken, certificationsController.deleteMany);

module.exports = router;

