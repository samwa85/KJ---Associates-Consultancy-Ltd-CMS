/**
 * Clients Routes
 */

const express = require('express');
const router = express.Router();
const { clientsController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', clientsController.getAll);
router.get('/category/:category', clientsController.getByCategory);
router.get('/:id', clientsController.getById);

// Protected routes
router.post('/', verifyToken, clientsController.create);
router.put('/:id', verifyToken, clientsController.update);
router.delete('/:id', verifyToken, clientsController.delete);
router.post('/delete-many', verifyToken, clientsController.deleteMany);

module.exports = router;

