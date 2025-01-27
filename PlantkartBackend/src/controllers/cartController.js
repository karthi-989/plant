const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user
    const { productId, quantity } = req.body;

    // Validate the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      // Update the quantity of the existing product
      existingProduct.quantity += quantity || 1;
    } else {
      // Add the new product to the cart
      cart.products.push({ productId, quantity: quantity || 1 });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product added to cart.", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product to cart.", error: error.message });
  }
};
