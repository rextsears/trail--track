const passport = require('passport');

function ensureAuthenticated(req, res, next) {
  
  // Passport authentication
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

module.exports = {
  ensureAuthenticated,
};
