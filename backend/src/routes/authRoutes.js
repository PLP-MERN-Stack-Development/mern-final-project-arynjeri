const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Auth routes
router.post("/register", authController.register);    // POST /api/auth/register
router.post("/login", authController.login);          // POST /api/auth/login
router.post("/google", authController.googleLogin);  // POST /api/auth/google

module.exports = router;
