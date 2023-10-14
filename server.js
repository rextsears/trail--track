const express = require('express');
const session = require('express-session'); // Import express-session
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user'); // Import the User model
const { ensureAuthenticated } = require('./config/authMiddleware'); // Adjust the path as needed
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module

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

// Passport configuration
passport.use(new LocalStrategy(
  {
    usernameField: 'username', // Customize these to match your user model
    passwordField: 'password', // Customize these to match your user model
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Invalid username' });
      }

      // You should compare the hashed password here (using a library like bcrypt)
      if (password !== user.password) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id); // Customize this based on your user model
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Initialize Passport
const secret = crypto.randomBytes(32).toString('hex');

app.use(
  session({
    secret: secret, // Replace with a strong, random secret
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const secretKey = crypto.randomBytes(32).toString('hex');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token using the secret key you have defined
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is invalid' });
    }

    // Attach the user ID to the request
    req.userId = decoded.userId;
    next();
  });
};

// Use the middleware in your protected route
app.get('/api/activities', verifyToken, async (req, res) => {
  // Now, req.userId contains the user's ID
  // Fetch activities for the authenticated user using req.userId
});

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

// New route to retrieve activities for the active user
app.get('/api/activities', ensureAuthenticated, async (req, res) => {
  try {
    // Retrieve activities only for the currently authenticated user
    const activities = await Activity.find({ userId: req.user.id }); // Assuming there is a 'userId' field in the activities model

    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve activities' });
  }
});

// API route to save a new activity
app.post('/api/trackServer', ensureAuthenticated, async (req, res) => {
  try {
    const { activityType, distance, completionTime, location, accomplishment } = req.body;

    // Create a new activity document
    const newActivity = new Activity({
      activityType,
      distance,
      completionTime,
      location,
      accomplishment,
      userId: req.user.id, // Assign the userId to associate the activity with the currently authenticated user
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
app.put('/api/trackServer/:id', ensureAuthenticated, async (req, res) => {
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
