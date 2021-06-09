const express = require('express');
const { requireAuth, requireGuest } = require('../middlewares/auth');
const Story = require('../models/Story');

const router = express.Router();

// @desc    Login/ Lading page
// @path    GET /
router.get('/', requireGuest, (req, res) => {
  res.status(200).render('index', {
    layout: 'layouts/landing',
  });
});

// @desc    Dashboard view
// @path    GET /dashboard
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    let stories = await Story.find({ user: req.user._id })
      .sort({ createdAt: 'desc' })
      .lean();

    res.status(200).render('dashboard', {
      name: req.user.firstName,
      stories,
      helper: req.app.locals.ejsHelper,
    });
  } catch (err) {
    console.error(err);
    res.render('errors/500');
  }
});

// @desc    Log out the current user
// @path    GET /logout
router.get('/logout', requireAuth, async (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
