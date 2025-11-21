const express = require("express");
const  requireAuth  = require("../middleware/authMiddleware.js");
const Marketplace = require("../models/MarketPlace.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Marketplace.find();
  res.json(items);
});

router.post("/", requireAuth, async (req, res) => {
  const item = new Marketplace({ ...req.body, userId: req.user.id });
  await item.save();
  res.status(201).json(item);
});

module.exports = router;
