const express = require('express');
const Comment = require('../models/Comment');
const Story = require('../models/Story');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

// @desc    Create a comment
// @path    POST /comments
router.post('/', requireAuth, async (req, res) => {
  req.body.user = req.user._id;

  try {
    const newComment = await Comment.create({ ...req.body });
    const story = await Story.findById(req.body.story);
    await story.update({ comments: [newComment, ...story.comments] });
    res.redirect('back');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
