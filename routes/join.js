const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
    });

    await newUser.save();

    const secretKey = process.env.SECRET_KEY; // Retrieve the secret key from the environment variables
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
