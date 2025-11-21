const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const requireAuth = require("../middleware/authMiddleware"); // fixed export

const router = express.Router();

// GET all posts (feed)
router.get("/", async (req, res) => {
try {
const posts = await Post.find()
.populate("userId", "username avatar")
.sort({ createdAt: -1 });
res.json(posts);
} catch (err) {
console.error(err);
res.status(500).json({ message: err.message });
}
});

// GET posts by username
router.get("/user/:username", async (req, res) => {
try {
const user = await User.findOne({ username: req.params.username });
if (!user) return res.status(404).json({ message: "User not found" });


const posts = await Post.find({ userId: user._id }).populate(
  "userId",
  "username avatar"
);

res.json(posts);

} catch (err) {
console.error(err);
res.status(500).json({ message: err.message });
}
});

// LIKE / UNLIKE post
router.post("/:id/like", requireAuth, async (req, res) => {
const postId = req.params.id;
if (!mongoose.Types.ObjectId.isValid(postId)) {
return res.status(400).json({ message: "Invalid post ID" });
}

try {
const post = await Post.findById(postId);
if (!post) return res.status(404).json({ message: "Post not found" });

const userId = req.user.id;
const alreadyLiked = post.likes.includes(userId);

if (alreadyLiked) {
  post.likes = post.likes.filter((id) => id.toString() !== userId);
} else {
  post.likes.push(userId);
}

await post.save();
res.json({ likes: post.likes.length });

} catch (err) {
console.error(err);
res.status(500).json({ message: err.message });
}
});

// ADD comment
router.post("/:id/comment", requireAuth, async (req, res) => {
const postId = req.params.id;
if (!mongoose.Types.ObjectId.isValid(postId)) {
return res.status(400).json({ message: "Invalid post ID" });
}

try {
const post = await Post.findById(postId);
if (!post) return res.status(404).json({ message: "Post not found" });

const { text } = req.body;
if (!text) return res.status(400).json({ message: "Comment text required" });

post.comments.push({
  userId: req.user.id,
  text,
});

await post.save();
res.json(post.comments);

} catch (err) {
console.error(err);
res.status(500).json({ message: err.message });
}
});

module.exports = router;
