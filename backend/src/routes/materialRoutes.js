const express = require("express");
const  requireAuth  = require("../middleware/authMiddleware");
const Material = require("../models/Material");

const router = express.Router();

// GET all materials
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch materials" });
  }
});

// POST a new material (requires auth)
router.post("/", requireAuth, async (req, res) => {
  try {
    const material = new Material({ ...req.body, userId: req.user.id });
    await material.save();
    res.status(201).json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add material" });
  }
});

// PUT update material
router.put("/:id", requireAuth, async (req, res) => {
  const { name, quantity, imageUrl, craftType } = req.body;
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { name, quantity, imageUrl, craftType },
      { new: true }
    );
    res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update material" });
  }
});

// DELETE material
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete material" });
  }
});

module.exports = router;
