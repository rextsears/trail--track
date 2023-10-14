const express = require('express');
const router = express.Router();
const UserStats = require('../models/userStats');
const { ensureAuthenticated } = require('../config/authMiddleware'); // Import the authentication middleware

// Route to fetch user statistics
router.get('/api/user/stats', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id; // Get the user's ID from the authenticated user
    const userStats = await UserStats.findOne({ userId }); // Filter statistics by userId

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

module.exports = router;