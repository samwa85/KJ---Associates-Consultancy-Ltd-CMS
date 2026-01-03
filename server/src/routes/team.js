/**
 * Team Routes
 */

const express = require('express');
const router = express.Router();
const { teamController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', teamController.getAll);
router.get('/leadership', teamController.getLeadership);
router.get('/technical', teamController.getTechnical);
router.get('/category/:category', teamController.getByCategory);
router.get('/:id', teamController.getById);

// Protected routes
router.post('/', verifyToken, teamController.create);
router.put('/:id', verifyToken, teamController.update);
router.delete('/:id', verifyToken, teamController.delete);
router.post('/delete-many', verifyToken, teamController.deleteMany);

module.exports = router;

