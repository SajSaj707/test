const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/get/count', adminOnly, userController.getUserCount);
router.delete('/admin/:id', adminOnly, userController.adminDeleteUser);
router.get('/', adminOnly, userController.getAllUsers);
router.patch('/changePassword', userController.changePassword );
router.post('/login', userController.loginUser);
router.post('/signin', userController.signUser);
router.patch('/dark-mode', authMiddleware, userController.toggleDarkMode);
router.patch('/last-viewed', authMiddleware, userController.updateLastViewed);
router.put('/:id', authMiddleware, userController.editUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.get('/:id', authMiddleware, userController.getUserByID);


module.exports = router;
