const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
name: { type: String, required: true },
quantity: { type: String, required: true }, // Now a string to allow units like "50g" or "100pcs"
craftType: { type: String, default: "" }, // Optional craft type
imageUrl: { type: String, default: "" },
userId: { type: String, required: true } // Creator of material
}, { timestamps: true });

module.exports = mongoose.model("Material", materialSchema);
