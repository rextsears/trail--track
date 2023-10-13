const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const newUser = new User({
      username,
      password, // Store the password as plain text
      name,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
