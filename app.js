const express = require("express");
const mongoose = require("mongoose");
const authroutes = require("./routes/auth.js");
const postRoutes = require("./routes/postRoutes");
const indexRoutes = require("./routes/indexRoutes");

require("dotenv").config();
const path = require("path");

const app = express();

// Connect to MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Not Connected");
  }
};
app.use(express.static('public'));
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));


// Use the user routes
app.use(express.json());
app.use('/', indexRoutes);
app.use("/api", authroutes);
app.use("/posts", postRoutes);
// app.use("/blogs", );
app.use('/blogs', require('./routes/indexRoutes'));


// Start the server
app.listen(process.env.PORT || 3000, () => {
  connectDb();
  console.log(`Server started on http://localhost:${process.env.PORT || 8001}`);
});
