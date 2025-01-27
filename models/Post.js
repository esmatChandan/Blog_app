const mongoose = require('mongoose');
const User = require('./User');
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: false } // Add this field
});

module.exports = mongoose.model('Post', postSchema);
