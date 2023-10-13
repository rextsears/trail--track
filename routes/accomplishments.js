const express = require('express');
const router = express.Router();
const Activity = require('../models/activities'); // Import the Activity model

router.get('/api/accomplishments', async (req, res) => {
    try {
      // Fetch all activities
      const activities = await Activity.find({});
  
      // Filter activities that have accomplishment: true
      const accomplishments = activities.filter((activity) => activity.accomplishment === true);
  
      // Send JSON response
      res.json(accomplishments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch accomplishments' });
    }
  });
  

module.exports = router;
