const express = require('express');
const router = express.Router();
const passport = require('passport');

// @desc    Authenticate with GoogleOAuth20 Strategy
// @path    GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Passport Google Callback
// @path    GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;
