const express = require("express");
const  requireAuth  = require("../middleware/authMiddleware.js");
const Transaction = require("../models/Transaction.js");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id });
  res.json(transactions);
});

router.post("/", requireAuth, async (req, res) => {
  const transaction = new Transaction({ ...req.body, userId: req.user.id });
  await transaction.save();
  res.status(201).json(transaction);
});

module.exports = router;
