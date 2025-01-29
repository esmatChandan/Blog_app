const express = require("express");
const router = express.Router();
const PostController = require("../controller/postController");
const jwt_verify = require('../controller/authentication');

// Routes
router.get("/posts", jwt_verify, PostController.getAllPosts);       // View all posts
router.get("/posts/:id", PostController.getPostById);   // View single post
router.post("/posts", PostController.createPost);       // Create post
router.put("/posts/:id", PostController.updatePost);    // Update post
router.delete("/posts/:id", PostController.deletePost); // Delete post

module.exports = router;
