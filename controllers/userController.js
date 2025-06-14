const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');




//forgetpasss
exports.changePassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  if (newPassword === confirmPassword) {
    fakeUser.password = newPassword;
    res.render("forgotPass", { user: null, sent: false, verified: true });
  } else {
    res.render("forgotPass", { user: null, sent: false, verified: false });
  }
};


//signLogin
exports.loginUser = async (req, res) => {
  const { loginPassword, loginUsername } = req.body;
  if (loginPassword === fakeUser.password && loginUsername === fakeUser.name) {
    res.redirect("/profile");
  } else {
    res.render("signLogin", { user: null, error: "Invalid credentials" });
  }
};

//create 
exports.signUser = (req, res) => {
  const { SignUpUsername,SignUpPassword, email } = req.body;
  if (SignUpUsername === fakeUser.name && SignUpPassword === fakeUser.password && email === fakeUser.email) {
    res.redirect("/profile");
  } else {
    res.render("signLogin", { user: null, error: "Invalid credentials" });
  }
};

//adminDashboard
exports.editUser = async (req, res) => {
  try {
    const { originalName, userName, userPass } = req.body;
    
    const updateData = {
      name: userName,
      password: userPass
    };

    if (req.file) {
      updateData.img = '/images/' + req.file.filename;
    }

    // Update user in database using original name
    const updatedUser = await User.findOneAndUpdate(
      { name: originalName },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    // Update local users array
    const index = users.findIndex(u => u.name === originalName);
    if (index !== -1) {
      users[index] = {
        ...users[index],
        ...updateData
      };
    }

    res.redirect('/adminDashboard');
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Error updating user');
  }
};



//Delete
exports.deleteUser = async (req, res) => {
  try {
    const { userName } = req.body;

    // Delete user from database by name
    const deletedUser = await User.findOneAndDelete({ name: userName });

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    // Remove from local users array
    const index = users.findIndex(u => u.name === userName);
    if (index !== -1) {
      users.splice(index, 1);
    }

    res.redirect('/adminDashboard');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Error deleting user');
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

// Get all users 
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Count users 
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.send({ count });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
