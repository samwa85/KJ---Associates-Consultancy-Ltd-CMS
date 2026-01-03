/**
 * Projects Routes
 */

const express = require('express');
const router = express.Router();
const { projectsController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', projectsController.getAll);
router.get('/featured', projectsController.getFeatured);
router.get('/status/:status', projectsController.getByStatus);
router.get('/sector/:sector', projectsController.getBySector);
router.get('/:id', projectsController.getById);

// Protected routes
router.post('/', verifyToken, projectsController.create);
router.put('/:id', verifyToken, projectsController.update);
router.delete('/:id', verifyToken, projectsController.delete);
router.post('/delete-many', verifyToken, projectsController.deleteMany);

module.exports = router;

