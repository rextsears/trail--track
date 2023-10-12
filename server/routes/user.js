const express = require('express');
const router = express.Router();
const UserStats = require('../models/userStats');

// Route to fetch user statistics
router.get('/api/user/stats', async (req, res) => {
  try {
    // Fetch user statistics based on the user's ID
    // You should have user authentication in place to get the user's ID
    const userId = req.user._id; // Assuming you have authenticated the user and their ID is available in req.user

    // Use the userId to fetch user statistics from the database
    const userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      // If no user statistics are found, you can return an appropriate response
      return res.status(404).json({ error: 'User statistics not found' });
    }

    // Respond with the user statistics as JSON
    res.json(userStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
});

// You can add more user-related routes here as needed

module.exports = router;
