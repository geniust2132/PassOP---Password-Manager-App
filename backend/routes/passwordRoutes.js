// backend/routes/passwordRoutes.js
const express = require("express");
const Password = require("../models/password");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET /api/passwords
 * Fetch all passwords belonging to the logged-in user
 */
router.get("/", auth, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });
    res.json(passwords);
  } catch (err) {
    console.error("GET /passwords error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * POST /api/passwords
 * Create a new password entry
 */
router.post("/", auth, async (req, res) => {
  try {
    const { id, site, username, password } = req.body;

    if (!site || !username || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newPassword = new Password({
      id, // uuid generated on frontend
      site,
      username,
      password,
      user: req.user.id,
    });

    await newPassword.save();
    res.json(newPassword);
  } catch (err) {
    console.error("POST /passwords error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * PUT /api/passwords/:id
 * Update an existing password entry
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const { site, username, password } = req.body;

    const updated = await Password.findOneAndUpdate(
      { id: req.params.id, user: req.user.id }, // filter by id + user
      { site, username, password },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Password not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("PUT /passwords error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE /api/passwords/:id
 * Delete a password entry
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Password.findOneAndDelete({
      id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Password not found" });
    }

    res.json({ message: "Password deleted" });
  } catch (err) {
    console.error("DELETE /passwords error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
