const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Import the 'cors' middleware
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;


// Connect to MongoDB
// Import the database connection
const db = require('./config/database');

// Allow requests from the client application (http://localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'trail--track/trail-track/build')));

// Import Mongoose model for activities (if it's in a file named activities.js)
const Activity = require('./models/activities'); // Update the model name to 'Activity'

// Parse JSON requests
app.use(express.json());

// Import the auth route
const authRoutes = require('./routes/auth'); // Update the path to auth.js

// Mount the auth route under the "/api" namespace
app.use('/api', authRoutes);

// Import the join route
const joinRoutes = require('./routes/join');

// Mount the join route under the desired namespace, e.g., "/api/join"
app.use('/api/join', joinRoutes);

// Mount user-related routes from the user route file
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

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

// Handle any other routes by serving the React app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'trail--track/trail-track/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
