const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");


// Home route
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author", "username");
    const user = await User.find({}).populate( "username");
    res.render("index", { posts, user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

// Sign-in route
router.get("/signin", (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

// Register route
router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
