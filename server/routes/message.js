require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
const Message = require("../models/Message");

// get msg
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const findCondition = {
      $or: [
        { user: req.userId, receiver: req.params.userId },
        { user: req.params.userId, receiver: req.userId },
      ],
    };
    const sendingSMS = await Message.find(findCondition)
      .populate("user", ["username", "avatarURL"])
      .populate("receiver", ["username", "avatarURL"]);
    if (sendingSMS) return res.json({ message: true, sendingSMS });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
// send msg
router.post("/:userId", verifyToken, async (req, res) => {
  const { content } = req.body;
  try {
    const newMessage = new Message({
      user: req.userId,
      receiver: req.params.userId,
      content,
    });
    newMessage.save();
    res.json({ success: true, newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
module.exports = router;
