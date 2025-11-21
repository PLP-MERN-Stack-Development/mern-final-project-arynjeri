// src/routes/chatRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const OpenAI = require("openai"); // Correct import

// Make sure dotenv is loaded in server.js before this file
// process.env.OPENAI_API_KEY should be defined
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is missing in environment variables!");
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Multer file storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ===================== TEXT MESSAGE ROUTE =====================
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: message }],
    });

    res.json({
      type: "text",
      content: response.choices[0].message.content,
      sender: "ai",
    });
  } catch (err) {
    console.error("AI request error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

// ===================== FILE UPLOAD ROUTE =====================
router.post("/file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileType = req.file.mimetype.startsWith("video/") ? "video" : "image";
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const prompt = `User uploaded a ${fileType}. Please respond appropriately.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      type: "text",
      content: response.choices[0].message.content,
      sender: "ai",
      fileUrl,
    });
  } catch (err) {
    console.error("AI file request error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

module.exports = router;
