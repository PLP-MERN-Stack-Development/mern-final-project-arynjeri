const express = require("express");
const requireAuth  = require("../middleware/authMiddleware.js");
const Project = require("../models/Project.js");
const Material = require("../models/Material.js");
const Transaction = require("../models/Transaction.js");

const router = express.Router();

// Get all projects for the logged-in user
router.get("/", requireAuth, async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });
  res.json(projects);
});

// Create a new project
router.post("/", requireAuth, async (req, res) => {
  const { name, type, materials: materialsUsed, hookSize, rowCount } = req.body;

  try {
    // Deduct materials
    for (let m of materialsUsed) {
      const mat = await Material.findById(m.materialId);
      if (!mat) return res.status(404).json({ error: "Material not found" });
      if (mat.quantity < m.quantity) return res.status(400).json({ error: `Insufficient ${mat.name}` });
      mat.quantity -= m.quantity;
      await mat.save();
    }

    // Create the project
    const project = new Project({
      name,
      type,
      materials: materialsUsed,
      hookSize,
      rowCount,
      userId: req.user.id
    });
    await project.save();

    // Record finance expense for the materials used
    const totalCost = materialsUsed.reduce((sum, m) => sum + (m.cost || 0), 0);
    if (totalCost > 0) {
      await Transaction.create({
        type: "Expense",
        amount: totalCost,
        project: project.name,
        userId: req.user.id
      });
    }

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

module.exports = router;
