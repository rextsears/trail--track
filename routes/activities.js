const express = require('express');
const router = express.Router();
const Activity = require('../models/activities'); // Import the Activity model
const UserStats = require('../models/userStats'); // Import the UserStats model
const { ensureAuthenticated } = require('../config/authMiddleware'); // Import the authentication middleware

// Handle adding a new activity
router.post('/trackServer', ensureAuthenticated, async (req, res) => {
    try {
        const { activityType, distance, completionTime, location, accomplishment } = req.body;

        // Create a new activity document
        const newActivity = new Activity({
            activityType,
            distance,
            completionTime,
            location,
            accomplishment,
            userId: req.user.id // Assign the userId to associate the activity with the currently authenticated user
        });

        // Save the activity to the database
        const savedActivity = await newActivity.save();

        // Update user statistics
        await updateStats(req.user.id);

        res.json(savedActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save the activity' });
    }
});

// Handle editing an existing activity
router.put('/trackServer/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { activityType, distance, completionTime, location, accomplishment } = req.body;

        // Find the activity by ID and update its fields
        const updatedActivity = await Activity.findByIdAndUpdate(
            req.params.id,
            {
                activityType,
                distance,
                completionTime,
                location,
                accomplishment,
            },
            { new: true }
        );

        // Update user statistics
        await updateStats(req.user.id);

        res.json(updatedActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update the activity' });
    }
});

// Handle deleting an activity
router.delete('/activities/:id', ensureAuthenticated, async (req, res) => {
    try {
        const activityId = req.params.id;
        const userId = req.user.id;

        const activity = await Activity.findOne({ _id: activityId, userId: userId });

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
        // Find the user's statistics
        let userStats = await UserStats.findOne({ userId });

        // If no user statistics exist, create them
        if (!userStats) {
            userStats = new UserStats({ userId });
        }

        // Call the updateStatsOnAdventureAddition method to update user statistics
        await userStats.updateStatsOnAdventureAddition();
    } catch (error) {
        console.error(error);
    }
};

module.exports = router;
