const bcrypt = require("bcryptjs");
const User = require("../models/User");
const post = require("../models/Post");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//user get all
const getall = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error, try again later" });
  }
};

// Register user
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    // Check if the email already exists
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    // Create a new user
    const NewUser = new User({
      name,
      email,
      phone,
      password: hashpassword,
    });

    // Save the new user
    await NewUser.save();

    // Redirect to the blogs page upon successful registration
    res.render("login",
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", error });
  }
};


// Login user

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existsUser = await User.findOne({ email });
    const posts = await post.find({}).populate("author");

    if (!existsUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, existsUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

     //Handle successful login (e.g., generate token, session, etc.)
    const token = jwt.sign({ data: existsUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Render the blogs.ejs file upon successful login
    const payload = {
      message: "Login successful ",
      
    };
  //const user = await User.find({}).populate( "name");
  console.log(token);
    res.render("blogs", {
      user: existsUser , posts,
      response: token,
    } );
    
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// POST: Log out a user
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "LogOut successful" });
  });
};

module.exports = {
  register,
  userlogin,
  getall,
  logoutUser,
};
