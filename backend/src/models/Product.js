const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  seller: { type: String, required: true }, // Clerk userId
  stock: { type: Number, default: 1 },
  ratings: [{ userId: String, rating: Number, review: String }],
}, { timestamps: true });

module.exports= mongoose.model("Product", productSchema);
