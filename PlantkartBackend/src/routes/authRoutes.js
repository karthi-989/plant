const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  postProduct,
  getProducts,
  getProductsByCategory,
} = require("../controllers/productController");


const router = express.Router();

// Route to post a product (admin only)
router.post("/product", postProduct);

// Route to fetch all products (accessible to all users)
router.get("/product", getProducts);
router.get("/product/category/:category", getProductsByCategory);

module.exports = router;



// Authentication Routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;