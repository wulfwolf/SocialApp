require("dotenv").config();
const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const Comment = require("../models/Comment");

// leave comment
router.post("/:id", verifyToken, async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "please write something !" });
  }
  try {
    const comment = new Comment({
      content,
      user: req.userId,
      post: req.params.id,
    });
    comment.save();

    res.json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
// get all comments
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const commentCondition = { post: req.params.id };
    const comment = await Comment.find(commentCondition).populate("user", [
      "username",
      "alias",
      "avatarURL",
    ]);
    res.json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
module.exports = router;
