// seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Post = require("./models/Post");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/craftpal";

// Seed users: must include both name and username
const rawUsers = [
  {
    name: "Mary Mburu",
    username: "mary",
    email: "mary@example.com",
    password: "mary123",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Crochet lover & beadwork artist 💕",
  },
  {
    name: "Cynthia A.",
    username: "cynthia",
    email: "cynthia@example.com",
    password: "cyn12345",
    avatar: "https://i.pravatar.cc/150?img=32",
    bio: "I love yarn shopping 🧶✨",
  },
  {
    name: "John Doe",
    username: "john",
    email: "john@example.com",
    password: "johnpass",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Crafting is my therapy 😌",
  },
];

// Seed posts
const posts = [
  {
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    caption: "Finished my new crochet top 😍❤️",
  },
  {
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    caption: "Beaded keychains for sale! DM me 💫",
  },
  {
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    caption: "Weekend crochet project 🧶✨",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🌿 Connected to MongoDB");

    // Clear old data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("🗑️ Old data cleared");

    // Hash passwords manually (or let pre-save hook handle it)
    const usersWithHashedPasswords = await Promise.all(
      rawUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Insert users
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log("👤 Users seeded");

    // Attach posts to random users
    const postsToInsert = posts.map((post) => ({
      ...post,
      userId: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
    }));

    await Post.insertMany(postsToInsert);
    console.log("📝 Posts seeded");

    console.log("🌱 Seeding finished successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seedDatabase();
