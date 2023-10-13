const express = require('express');
const router = express.Router();
const User = require('../models/user');
/*
// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new user
    const user = new User({
      username,
      password, // Store the password as plain text
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});
*/
// Route to handle user login
router.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the password in the database (both are stored as plain text)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;

