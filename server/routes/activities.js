const express = require('express');
const router = express.Router();

const Activity = require('../models/activity');

// Define routes

// Handle adding a new activity
router.post('/api/activities', async (req, res) => {
});

// Handle editing an existing activity
router.put('/api/activities/:id', async (req, res) => {
});

module.exports = router;
