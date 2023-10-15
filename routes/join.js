const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt'); // Import bcrypt

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
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
