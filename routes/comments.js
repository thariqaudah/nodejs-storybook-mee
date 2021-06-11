const express = require('express');
const Comment = require('../models/Comment');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

// @desc    Create a comment
// @path    POST /comment
router.post('/', requireAuth, async (req, res) => {
  try {
    await Comment.create({
      ...req.body
    });
  } catch (err) {
    console.error(err);
  }
});




module.exports = router;