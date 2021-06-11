const express = require('express');
const Comment = require('../models/Comment');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

// @desc    Create a comment
// @path    POST /comment
router.post('/', requireAuth, async (req, res) => {
  console.log(req.body);
  res.end();
});




module.exports = router;