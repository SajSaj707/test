const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipeController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', recipeController.getAllRecipes);
router.get('/search', recipeController.searchRecipeByTitle);
router.get('/:id', recipeController.getRecipeById);

router.post('/', authMiddleware, upload.single('image'), recipeController.createRecipe);
router.put('/:id', authMiddleware, upload.single('image'), recipeController.updateRecipe);
router.delete('/:id', authMiddleware, recipeController.deleteRecipe);

router.delete('/admin/:id', adminOnly, recipeController.adminDeleteRecipe);

module.exports = router;
