require("dotenv").config();
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");
const Follow = require("../models/Follow");
// get all followings post
// GET api/post
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const following = await Follow.find({ user: req.params.userId }).populate(
      "follow",
      ["username", "avatarURL", "alias"]
    );
    const tmpArray = following.map((item) => item.follow);

    const followingPostsCondition = {
      $or: [
        ...tmpArray.map((user) => ({ user: user._id })),
        { user: req.params.userId },
      ],
    };

    const followingPosts = await Post.find(followingPostsCondition).populate(
      "user",
      ["username", "avatarURL", "alias"]
    );
    return res.json({ success: true, message: "Success", followingPosts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});

// POST api/post     create
router.post("/", verifyToken, async (req, res) => {
  const { content, img } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "content is required" });
  }

  try {
    const newPost = new Post({
      content,
      img,
      user: req.userId,
    });

    await newPost.save();
    res.json({ success: true, message: "posted!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

// PUT api/post update
router.put("/:id", verifyToken, async (req, res) => {
  const { content, img } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "content is required" });
  }

  try {
    let updatedPost = new Post({
      content,
      img,
      _id: req.params.id,
    });

    const postUpdateConditrion = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateConditrion,
      updatedPost,
      { new: true }
    );
    //user not authorised to update post or post not found
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "post not found or user not authorised",
      });
    }
    res.json({
      success: true,
      message: "exellent progress",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
//like a post
router.put("/like/:id", verifyToken, async (req, res) => {
  try {
    const updatedPostCondition = { _id: req.params.id };
    let updatedPost = await Post.findById(updatedPostCondition);
    let message = "";
    if (updatedPost.likes.includes(req.userId)) {
      updatedPost = {
        ...updatedPost,
        _doc: {
          likes: updatedPost.likes.filter((item) => item !== req.userId),
        },
      };
      message = "Disliked!";
    } else {
      updatedPost = {
        ...updatedPost,
        likes: updatedPost.likes.push(req.userId),
      };
      message = "Liked!";
    }
    updatedPost = await Post.findByIdAndUpdate(
      updatedPostCondition,
      updatedPost,
      {
        new: true,
      }
    );

    // User not authorised to update post
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorised",
      });
    }
    res.json({
      success: true,
      message: message,
      post: updatedPost,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
// DELETE api/post delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteConditrion = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteConditrion);
    //user not authorised to update post or post not found
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: "post not found or user not authorised",
      });
    }
    res.json({
      success: true,
      message: "post deleted",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
module.exports = router;
