/**
 * Board Routes
 */

const express = require('express');
const router = express.Router();
const { boardController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', boardController.getAll);
router.get('/chairman', boardController.getChairman);
router.get('/:id', boardController.getById);

// Protected routes
router.post('/', verifyToken, boardController.create);
router.put('/:id', verifyToken, boardController.update);
router.delete('/:id', verifyToken, boardController.delete);
router.post('/delete-many', verifyToken, boardController.deleteMany);

module.exports = router;

