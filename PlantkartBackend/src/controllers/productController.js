const Product = require("../models/product");

const postProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // Validate input
    if (!title || !description || !price) {
      return res
        .status(400)
        .json({ message: "Title, description, and price are required." });
    }

    // Create the product with title, description, price, and category
    const product = new Product({
      title,
      description,
      price,
      category,
    });

    // Save the product
    await product.save();

    // Send response with product details
    res.status(201).json({
      message: "Product successfully created.",
      product: {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  } catch (err) {
    console.error("Error posting product:", err);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    // Fetch all products
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

    // Fetch products by category (case-insensitive)
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

module.exports = { postProduct, getProducts, getProductsByCategory };
