const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const User = require("../models/user");
const router = express.Router();

// Middleware to check if the user has a specific role (e.g., admin)
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied. ${role}s only.` });
    }
    next();
  };
};

// Admin-only route (using the general role-based authorization middleware)
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Get user role route (returns the role of the logged-in user)
router.get("/getUserRole", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Find user in the database by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the role to the frontend
    res.json({ role: user.role });
  } catch (error) {
    console.error("Error retrieving user role:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin-only route using the generic authorization middleware
// Example of a more dynamic role check
router.get(
  "/admin-dashboard",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
  }
);

module.exports = router;
