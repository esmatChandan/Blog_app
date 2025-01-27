const bcrypt = require("bcryptjs");
const User = require("../models/User");
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
  const { name, email,username, password } = req.body;
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
      username,
      password: hashpassword,
    });

    // Save the new user
    await NewUser.save();

    res.status(201).json({
      success: true,
      message: "User successfully created",
      data: NewUser,
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again" });
  }
};

// Login user

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existsUser = await User.findOne({ email });

    if (!existsUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, existsUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Handle successful login (e.g., generate token, session, etc.)
    const token = jwt.sign({ data: existsUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", accesstoken: token });
  } catch (error) {
    // Handle errors
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
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
