const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send('Name, email, and password are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({
      name,
      email,
      password: hashedPassword,
      phone
    });

    user = await user.save();
    if (!user) return res.status(500).send('User could not be created');

    res.send(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Email and password required');

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'yoursecret',
      { expiresIn: '1h' }
    );

    res.send({ token, user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('favs')
      .populate('adds')
      .populate('lastViewed');
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update user (profile or by ID)
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get user by ID
exports.getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Admin delete
exports.adminDeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send({ success: true, message: 'Admin deleted user' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Toggle dark mode
exports.toggleDarkMode = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).send('User not found');

    user.isDarkMode = !user.isDarkMode;
    await user.save();
    res.send({ isDarkMode: user.isDarkMode });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update last viewed
exports.updateLastViewed = async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!mongoose.isValidObjectId(recipeId)) {
      return res.status(400).send('Invalid recipe ID');
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { lastViewed: recipeId },
      { new: true }
    );

    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all users (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Count users (admin)
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.send({ count });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
