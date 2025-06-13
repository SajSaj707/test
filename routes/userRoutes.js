const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Authenticated user routes
router.get('/profile', authMiddleware, userController.getUserProfile);
router.patch('/last-viewed', authMiddleware, userController.updateLastViewed);
router.patch('/dark-mode', authMiddleware, userController.toggleDarkMode);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.get('/:id', authMiddleware, userController.getUserByID);

// Admin-only routes
router.get('/get/count', adminOnly, userController.getUserCount);
router.delete('/admin/:id', adminOnly, userController.adminDeleteUser);
router.get('/', adminOnly, userController.getAllUsers);

module.exports = router;
