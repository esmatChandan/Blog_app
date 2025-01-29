const express = require("express");
const router = express.Router();
const {
  registerUser,
  userlogin,
  logoutUser,
} = require("../controller/auth_controller");
const { createPost } = require("../controller/postController");
const Post = require("../models/Post");
const User = require("../models/User");

// Home route
router.get("/", async (req, res) => {
  try {
    // const posts = await Post.find({}).populate("author", "username");
    //const user = await User.find({}).populate( "name");
    res.render("index");
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

// Sign-in route
router.get("/signin", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});
router.get("/blogs", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author");
    // const posts = await post.find({}).populate("author");
    //const user = req.user;//Assuming you have user information in req.user
    res.render("blogs", { posts,user:{} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

// Register route
router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

router.get("/blogs", function (req, res, next) {
  res.render("blogs", { title: "Express" });
});

module.exports = router;
