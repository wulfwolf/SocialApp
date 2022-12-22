require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//register
router.post("/register", async (req, res) => {
  const { username, password, alias, avatarURL } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing username / password" });
  }
  try {
    //check for existing user
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "username alrd taken" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      alias,
      avatarURL,
    });
    await newUser.save();
    // return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfully !",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing username / password" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "incorrect username/password" });
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "incorrect username/password" });
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User loggedin successfully !",
      accessToken,
      user,
    });
  } catch (error) {}
});

// PUT api/auth/:id update
router.put("/:id", async (req, res) => {
  const data = req.body;

  try {
    updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "exellent progress",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

module.exports = router;
