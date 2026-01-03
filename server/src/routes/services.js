/**
 * Services Routes
 */

const express = require('express');
const router = express.Router();
const { servicesController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', servicesController.getAll);
router.get('/category/:category', servicesController.getByCategory);
router.get('/:id', servicesController.getById);

// Protected routes
router.post('/', verifyToken, servicesController.create);
router.put('/:id', verifyToken, servicesController.update);
router.delete('/:id', verifyToken, servicesController.delete);
router.post('/delete-many', verifyToken, servicesController.deleteMany);

module.exports = router;

