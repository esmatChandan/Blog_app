const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Route to activate a post
router.put('/posts/:id/activate', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.active = true;
      await post.save();
      res.status(200).json({ message: 'Post activated successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error activating post', error });
  }
});

module.exports = router;