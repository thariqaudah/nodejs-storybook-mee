const express = require('express');
const { requireAuth } = require('../middlewares/auth');
const Story = require('../models/Story');

const router = express.Router();

// @desc    Display all stories
// @path    GET /stories
router.get('/', requireAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .sort({ createdAt: 'desc' })
      .populate('user')
      .lean();

    res.status(200).render('stories/index', {
      stories,
      helper: req.app.locals.ejsHelper,
      subtitle: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500');
  }
});

// @desc    Display create story page
// @path    GET /stories/add
router.get('/add', requireAuth, (req, res) => {
  res.render('stories/add');
});

// @desc    Create a story
// @path    POST /stories
router.post('/', requireAuth, async (req, res) => {
  req.body.user = req.user._id;

  try {
    await Story.create({ ...req.body });
    res.status(201).redirect('dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500');
  }
});

// @desc    Display single story
// @path    GET /stories/:id
router.get('/:id', requireAuth, async (req, res) => {
  try {
    let story = await Story.findOne({ _id: req.params.id })
      .populate('user')
      .populate({
        path: 'comments',
        populate: { path: 'user' },
      })
      .lean();

    console.log(story);

    if (!story) {
      return res.status(404).render('errors/404');
    }

    res.status(200).render('stories/show', {
      story,
      helper: req.app.locals.ejsHelper,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500');
  }
});

// @desc    Display edit story
// @path    GET /stories/edit/:id
router.get('/edit/:id', requireAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.status(404).render('errors/404');
    }

    if (story.user.toString() !== req.user._id.toString()) {
      return res.redirect('/stories');
    }

    res.status(200).render('stories/edit', {
      story,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500');
  }
});

// @desc    Update single story
// @path    PUT /stories/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).render('errors/404');
    }

    if (story.user != req.user.id) {
      return res.redirect('/stories');
    }

    story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500');
  }
});

// @desc    Delete single story
// @path    DELETE /stories/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id);

    if (!story) {
      return res.render('errors/404');
    }

    if (story.user != req.user.id) {
      return res.redirect('/dashboard');
    }

    story = await Story.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500');
  }
});

// @desc    Display stories by user
// @path    GET /stories/user/:userId
router.get('/user/:userId', requireAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.params.userId,
      status: 'public',
    })
      .sort({ createdAt: 'desc' })
      .populate('user')
      .lean();

    res.status(200).render('stories/index', {
      stories,
      helper: req.app.locals.ejsHelper,
      subtitle: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500');
  }
});

module.exports = router;
