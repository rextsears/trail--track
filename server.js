const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const UserStats = require('./models/userStats');
const { ensureAuthenticated } = require('./config/authMiddleware');
const Activity = require('./models/activities');
const updateStats = require('./updateStatsFunction'); 

require('dotenv').config();

const app = express();

// Import the database connection
const db = require('./config/database');

// Middleware: Allow requests from the client application (http://localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware: Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'trail--track/trail-track/build')));

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
const secret = '20991f72a7dcdc6b65ea4efebd4abfec0254eb3d8e136619c70a2828a6c04164';

app.use(
  session({
    secret: secret, // Replace with a strong, random secret
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Import the join route
const joinRoutes = require('./routes/join');
// Mount the join route under the desired namespace, e.g., "/api/join"
app.use('/api/join', joinRoutes);

// Route to fetch user details
app.get('/api/user/details', (req, res) => {
  if (req.isAuthenticated()) {
      res.json(req.user);  // Send back user details
  } else {
      res.status(401).json({ message: "Not authenticated" });  // 401 Unauthorized
  }
});

// Route to fetch user statistics
app.get('/api/user/stats', ensureAuthenticated, async (req, res) => {
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

// Route to fetch only the user's name
app.get('/api/user/name', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id, 'name');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user name' });
  }
});


// Import the auth route
const authRoutes = require('./routes/auth'); // Update the path to auth.js
// Mount the auth route under the "/api/login" namespace
app.post('/api/login', authRoutes);

// Mount the activities route
const activitiesRoutes = require('./routes/activities');
app.use('/api', activitiesRoutes); // This prefix ensures that all routes in activitiesRoutes start with /api

// Route to manually update user statistics for development purposes
app.post('/updatestats', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id; // Get the user's ID from the authenticated user

    // Call the function to update user stats
    await updateStats(userId);

    res.json({ message: 'User statistics updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user statistics' });
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
