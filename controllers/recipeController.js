const { Recipe } = require('../models/recipe');
const mongoose = require('mongoose');

// Create recipe
exports.createRecipe = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No image uploaded');

    const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`;
    const { title, description, ingredients } = req.body;

    if (!title || !ingredients) return res.status(400).send('Title and ingredients required');

    let recipe = new Recipe({
      image: imageUrl,
      title,
      description,
      ingredients,
      createdBy: req.user.userId
    });

    recipe = await recipe.save();
    res.send(recipe);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update recipe
exports.updateRecipe = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid Recipe ID');
    }

    let imageUrl;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients
    };

    if (imageUrl) updateData.image = imageUrl;

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!recipe) return res.status(404).send('Recipe not found');

    res.send(recipe);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndRemove(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.send({ success: true, message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Admin delete
exports.adminDeleteRecipe = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).send('Access denied');

    const recipe = await Recipe.findByIdAndRemove(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');

    res.send({ success: true, message: 'Admin deleted recipe' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all recipes with pagination
exports.getAllRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find().skip(skip).limit(limit);
    const total = await Recipe.countDocuments();

    res.send({
      recipes,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid Recipe ID');
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');

    res.send(recipe);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Search recipe by title
exports.searchRecipeByTitle = async (req, res) => {
  try {
    const title = req.query.title;
    if (!title) return res.status(400).send('Title is required');

    const recipe = await Recipe.findOne({ title: new RegExp(title, 'i') });
    if (!recipe) return res.status(404).send('Recipe not found');

    res.send(recipe);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
