require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const User = require("./models/user.models");

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//DB Connection
try {
  mongoose.connect(process.env.MONGO_DB_URL);
  console.log("DB Connected");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.json("Hello World");
});

//Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User Already Exist",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accssToken = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "360000m",
  });

  return res.json({
    error: false,
    user,
    accssToken,
    message: "Registration Successful",
  });
});

//Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "user not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accssToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "360000m",
    });
    return res.status(200).json({
      error: false,
      user,
      accssToken,
      message: "Logged In Successful",
    });
  } else {
    res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

app.listen(8000);

module.exports = app;
