const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "1535478";

const jwt_verify = async (req, res, next) => {
  try {
    const token = req.headers.accesstoken;
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "Access denied" });
    } else {
      jwt.verify(token, JWT_SECRET, async function (err, decoded) {
        console.log(decoded);
        const user_details = await User.findById(decoded.data);
        console.log(user_details);
        if (user_details) {
          res
            .send({ success: "logged in user details", data: user_details })
            .status(200);
        } else {
          res.status(404).send({ message: "User not found" });
        }
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
module.exports = jwt_verify ;
