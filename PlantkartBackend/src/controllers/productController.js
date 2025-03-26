const Product = require("../models/product");


const postProduct = async (req, res) => {
  try {
    // Ensure user is authenticated and has admin role
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { title, description, price, category, image, stock } = req.body;

    // Validate input
    if (
      !title ||
      !description ||
      !price ||
      !image ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure price and stock are valid numbers
    if (isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
      return res
        .status(400)
        .json({ message: "Price and stock must be non-negative numbers." });
    }

    // Create a new product
    const product = new Product({
      title,
      description,
      price,
      category,
      image,
      stock,
    });

    // Save the product
    await product.save();

    // Send response
    res.status(201).json({
      message: "Product successfully created.",
      productId: product._id, // ✅ Returns only the product ID
    });
  } catch (err) {
    console.error("Error posting product:", err);

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error.", error: err.message });
    }

    res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found for category: ${category}` });
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const { title, description, price, category, image } = req.body;
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (image) product.image = image;

    await product.save();
    res.status(200).json({ message: "Product successfully updated.", product });
  } catch (err) {
    console.error("Error updating product:", err);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // Ensure user is authenticated and is an admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;

    // Validate ID format (check if it's a valid MongoDB ObjectId)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res
      .status(200)
      .json({ message: "Product successfully deleted.", deletedProduct });
  } catch (err) {
    console.error("Error deleting product:", err);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } }, // Case-insensitive search in title
        { description: { $regex: new RegExp(query, "i") } }, // Case-insensitive search in description
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No matching products found." });
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error("Error searching products:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
};

module.exports = {
  postProduct,
  getProducts,
  getProductsByCategory,
  editProduct,
  deleteProduct,
  searchProducts, // ✅ Added the new function
};

