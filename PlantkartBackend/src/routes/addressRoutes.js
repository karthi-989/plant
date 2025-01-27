const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  addAddress,
  getAllAddresses,
} = require("../controllers/addressController");

const router = express.Router();

// Routes with authentication
router.post("/post", verifyToken, addAddress);
router.get("/get", verifyToken, getAllAddresses);

module.exports = router;
