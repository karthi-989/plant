const Cart = require("../models/cart");
const mongoose = require("mongoose");
const Product = require("../models/product");

// Utility Function: Find or create a cart
const findOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, products: [] });
    await cart.save();
  }
  return cart;
};

// Add Product to Cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    
    const product = await Product.findById(productId.trim());
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

   
    const cart = await findOrCreateCart(userId);

   
    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity; 
    } else {
      cart.products.push({ productId, quantity }); 
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart.", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

// Get Cart Items
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the cart and populate product details
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.productId"
    );

    if (!cart || cart.products.length === 0) {
      return res
        .status(200)
        .json({ message: "Your cart is empty.", cart: [], totalPrice: 0 });
    }

    // Calculate total price
    const totalPrice = cart.products.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    res.status(200).json({ cart: cart.products, totalPrice });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

// Remove Product from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params; 

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    console.log("Cart before removal:", cart.products);

    
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    console.log("Cart after removal:", cart.products);

    await cart.save();

    res.status(200).json({ message: "Product removed from cart.", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};






// Increase Product Quantity
exports.increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId, "products.productId": productId },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    ).populate("products.productId");

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    res
      .status(200)
      .json({ message: "Quantity updated.", cart: updatedCart.products });
  } catch (error) {
    console.error("Error increasing product quantity:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

exports.decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId, "products.productId": productId },
      { $inc: { "products.$.quantity": -1 } },
      { new: true }
    ).populate("products.productId");

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    
    updatedCart.products = updatedCart.products.filter(
      (item) => item.quantity > 0
    );
    await updatedCart.save();

    res
      .status(200)
      .json({ message: "Quantity updated.", cart: updatedCart.products });
  } catch (error) {
    console.error("Error decreasing product quantity:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};


