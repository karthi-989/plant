const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const User = require("../models/user");
const router = express.Router();


const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied. ${role}s only.` });
    }
    next();
  };
};


router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});


router.get("/getUserRole", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    res.json({ role: user.role });
  } catch (error) {
    console.error("Error retrieving user role:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get(
  "/admin-dashboard",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
  }
);

module.exports = router;
