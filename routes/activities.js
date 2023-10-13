const express = require('express');
const router = express.Router();
const Activity = require('../models/activities'); // Import the Activity model
const UserStats = require('../models/userStats'); // Import the UserStats model

// Handle adding a new activity
router.post('/api/activities', async (req, res) => {
  try {
    // Implementation for adding a new activity
    // This code will depend on your specific use case
    // After successfully adding an activity, update user statistics
    // Example: Save the newly added activity document to 'newActivity'
    const newActivity = await new Activity({
      // ... (activity data)
    }).save();

    // Update user statistics
    await updateStats(req.user._id); // Assuming you have authenticated the user and their ID is available in req.user

    res.json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save the activity' });
  }
});

// Handle editing an existing activity
router.put('/api/activities/:id', async (req, res) => {
  try {
    // Implementation for editing an existing activity
    // This code will depend on your specific use case
    // After successfully editing the activity, update user statistics

    // Example: Update the activity document

    // Update user statistics
    await updateStats(req.user._id); // Assuming you have authenticated the user and their ID is available in req.user

    res.json(updatedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the activity' });
  }
});

// Handle deleting an activity
router.delete('/api/activities/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    const userId = req.user._id; // Assuming you have authenticated the user and their ID is available in req.user

    const activity = await Activity.findOne({ _id: activityId, createdBy: userId });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found or you do not have permission to delete it' });
    }

    await Activity.findByIdAndRemove(activityId);

    // Update user statistics after successfully deleting an activity
    await updateStats(userId);

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting the activity' });
  }
});

// Function to update user statistics
const updateStats = async (userId) => {
  try {
    const userStats = await UserStats.findOne({ userId });

    if (userStats) {
      // Assuming you have a method in your model to update user stats, for example, 'updateUserStats'
      await userStats.updateUserStats(); 
    }
  } catch (error) {
    console.error(error);
  }
};

// Define a route to retrieve all activities
router.get('/api/activities', async (req, res) => {
  try {
    // Retrieve all activities from the database
    const activities = await Activity.find();

    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve activities' });
  }
});

module.exports = router;
