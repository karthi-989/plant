const express = require("express");
const { addToCart,getCart,removeFromCart,increaseQuantity,decreaseQuantity } = require("../controllers/cartController")
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();



router.post("/add", verifyToken, addToCart);
router.get("/get",verifyToken, getCart)
router.delete("/remove/:productId", verifyToken, removeFromCart);
router.put("/increase", verifyToken, increaseQuantity);
router.put("/decrease", verifyToken, decreaseQuantity);


module.exports = router;
