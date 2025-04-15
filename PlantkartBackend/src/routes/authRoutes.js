const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  postProduct,
  getProducts,
  getProductsByCategory,
  editProduct,
  deleteProduct,
  searchProducts,
  bulkUploadProducts,
} = require("../controllers/productController");
const {
  createOrder,
  verifyPayment,
  getAllOrders
} = require("../controllers/paymentController");

const verifyToken=require("../middlewares/authMiddleware")
const { getOrderStats } = require("../controllers/adminController");



const router = express.Router();

// Route to post a product (admin only)
router.post("/product",verifyToken, postProduct);
router.put("/product/:id", verifyToken, editProduct); // Only admin can edit
router.delete("/product/:id", verifyToken, deleteProduct); 
router.get("/products/search", searchProducts);


// Route to fetch all products (accessible to all users)
router.get("/product", getProducts);
router.get("/product/category/:category", getProductsByCategory);
router.post("/admin/bulk-upload", verifyToken,bulkUploadProducts)

router.post("/create-order", verifyToken, createOrder);
router.post("/verify-payment", verifyToken, verifyPayment);
router.get("/admin/orders", verifyToken, getAllOrders);
module.exports = router;



// Authentication Routes
router.post("/register", register);
router.post("/login", login);
//admin stats
router.get("/order-stats", verifyToken, verifyToken, getOrderStats);


module.exports = router;