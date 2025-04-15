const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  addAddress,
  getAllAddresses,
  getAddressById,
  editAddress,
  deleteAddress,
} = require("../controllers/addressController");

const router = express.Router();

// Get all addresses for a user
router.get("/", verifyToken, getAllAddresses);

// Add a new address
router.post("/", verifyToken, addAddress);

// Get a specific address by ID
router.get("/:id", verifyToken, getAddressById);

// Update an existing address
router.put("/:id", verifyToken, editAddress);

// Delete a specific address
router.delete("/:id", verifyToken, deleteAddress);

module.exports = router;
