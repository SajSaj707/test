const { User } = require('../models/user');
const express = require('express');
const multer = require('multer');
const { Recipe } = require('../models/recipe');
const mongoose = require('mongoose');

exports.createRecipe = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('No image uploaded');

  const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`;

  let recipe = new Recipe({
    image: imageUrl,
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    createdBy: req.body.userId
  });

  recipe = await recipe.save();
  if (!recipe) return res.status(500).send('Recipe could not be created');
  res.send(recipe);
};



// Delete
exports.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).send('Recipe not found');

  await Recipe.findByIdAndRemove(req.params.id);
  res.send({ success: true, message: 'Recipe deleted' });
};


// Admin
exports.adminDeleteRecipe = async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user || !user.isAdmin) return res.status(403).send('Access denied');

  const recipe = await Recipe.findByIdAndRemove(req.params.id);
  if (!recipe) return res.status(404).send('Recipe not found');

  res.send({ success: true, message: 'Admin deleted recipe' });
};



// Get all recipes
exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
};



// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Recipe ID');
  }

  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).send('Recipe not found');

  res.send(recipe);
};



// Search recipe by title
exports.searchRecipeByTitle = async (req, res) => {
  const title = req.query.title;
  if (!title) return res.status(400).send('Title is required');

  const recipe = await Recipe.findOne({ title: new RegExp(title, 'i') });
  if (!recipe) return res.status(404).send('Recipe not found');

  res.send(recipe);
};



// Update recipe
exports.updateRecipe = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Recipe ID');
  }

  let recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).send('Recipe not found');

  let imageUrl = recipe.image;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
  }

  recipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    {
      image: imageUrl,
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      createdBy: req.body.userId
    },
    { new: true }
  );

  res.send(recipe);
};