const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  userId: String // owner
}, { timestamps: true });

module.exports = mongoose.model("Marketplace", marketplaceSchema);
