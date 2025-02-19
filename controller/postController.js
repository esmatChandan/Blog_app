const Post = require("../models/Post"); // Import the Post model

// GET: Fetch all blog posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.render("posts/index", { posts }); // Render EJS view with the posts
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// GET: Fetch a single blog post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Fetch post by ID
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render("posts/show", { post });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// POST: Create a new blog post
const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author }); // Create a new post
    await newPost.save(); // Save to the database
    // Save to the database
    
    // Redirect to the blogs page
    res.redirect("/blogs");
    console.log("Post created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// PUT: Update an existing blog post
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }
    res.redirect(`/posts/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// DELETE: Delete a blog post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
