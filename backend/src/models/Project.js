const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  materials: [{ materialId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  hookSize: String,
  rowCount: Number,
  status: { type: String, default: "Ongoing" },
  userId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
