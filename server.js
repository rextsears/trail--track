const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Import the database connection
const db = require('./config/database');

// Middleware: Allow requests from the client application (http://localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware: Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'trail--track/trail-track/build')));

// Import Mongoose model for activities (if it's in a file named activities.js)
const Activity = require('./models/activities'); // Update the model name to 'Activity'

// Middleware: Parse JSON requests
app.use(express.json());

// Import the join route
const joinRoutes = require('./routes/join');
// Mount the join route under the desired namespace, e.g., "/api/join"
app.use('/api/join', joinRoutes);

// Mount user-related routes from the user route file
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Import the auth route
const authRoutes = require('./routes/auth'); // Update the path to auth.js
// Mount the auth route under the "/api/login" namespace
app.post('/api/login', authRoutes);

// Import the accomplishments route
const accomplishmentsRoutes = require('./routes/accomplishments');
// Mount the accomplishments route under the desired namespace, e.g., "/api/accomplishments"
app.use('/api/accomplishments', accomplishmentsRoutes);

// API route to save a new activity
app.post('/api/trackServer', async (req, res) => {
  try {
    const { activityType, distance, completionTime, location, accomplishment } = req.body;

    // Create a new activity document
    const newActivity = new Activity({
      activityType,
      distance,
      completionTime,
      location,
      accomplishment,
    });

    // Save the activity to the database
    const savedActivity = await newActivity.save();

    res.json(savedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save the activity' });
  }
});

// API route to edit an existing activity
app.put('/api/trackServer/:id', async (req, res) => {
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

    res.json(updatedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the activity' });
  }
});

// New route to retrieve all activities
app.get('/api/activities', async (req, res) => {
  try {
    // Retrieve all activities from the database
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve activities' });
  }
});

// Handle any other routes by serving the React app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'trail--track/trail-track/build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
