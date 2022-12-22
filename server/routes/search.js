require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// search
router.post("/", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "please write something to search" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
module.exports = router;
