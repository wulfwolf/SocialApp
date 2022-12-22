require("dotenv").config();
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
// GET all user IMG
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const userImg = await User.findById(req.params.userId).select("avatarURL");
    const postFindingCondition = { user: req.params.userId };
    const postImg = await Post.find(postFindingCondition).select("img");

    return res.json({
      success: true,
      message: "Success",
      wholeImg: [...postImg, userImg],
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
module.exports = router;
