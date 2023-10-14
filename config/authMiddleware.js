const passport = require('passport');

function ensureAuthenticated(req, res, next) {
  // Use Passport for authentication here
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

module.exports = {
  ensureAuthenticated,
};
