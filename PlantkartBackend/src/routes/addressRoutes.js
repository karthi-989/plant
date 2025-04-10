const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  addAddress,
  getAllAddresses,
} = require("../controllers/addressController");

const router = express.Router();


router.post("/add", verifyToken, addAddress);
router.get("/get", verifyToken, getAllAddresses);

module.exports = router;
