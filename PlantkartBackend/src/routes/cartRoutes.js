const express = require("express");
const { addToCart } = require("../controllers/cartController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Add to cart route (requires authentication)

router.post("/cart", verifyToken, addToCart);

module.exports = router;
