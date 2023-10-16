const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route to handle user login
router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Login failed:', err);
      return res.status(500).json({ error: 'Login failed' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: 'Login failed' });
      }
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
});

module.exports = router;
