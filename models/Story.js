const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a story title'],
    trim: true,
  },
  body: {
    type: String,
    required: [true, 'Please add a story body'],
  },
  status: {
    type: String,
    required: [true, 'Please adda a story status'],
    enum: ['public', 'private'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Story', storySchema);
