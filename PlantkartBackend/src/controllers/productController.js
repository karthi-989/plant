const multer = require("multer");
const XLSX = require("xlsx");
const Product = require("../models/product");
const Order = require("../models/order"); // Assuming you have an Order model
const User = require("../models/user"); // Assuming you have a User model for address fetching

// Setup multer for handling file uploads
const storage = multer.memoryStorage(); // Save files in memory
const upload = multer({ storage: storage }).single("file"); // Accept a single file

// POST endpoint to upload an Excel file containing product details (Bulk Upload)
const bulkUploadProducts = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error uploading file", error: err.message });
    }

    try {
      // Read the Excel file
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet); // Convert Excel sheet to JSON

      // Map and validate data
      const products = [];
      const failedRows = [];

      data.forEach((item, index) => {
        const errors = [];

        if (!item.Title) errors.push("Title is missing.");
        if (!item.Price || typeof item.Price !== "number" || item.Price < 0) {
          errors.push("Price must be a positive number.");
        }
        if (!item.Category) errors.push("Category is missing.");

        if (errors.length > 0) {
          failedRows.push({ row: index + 2, error: errors.join(" ") });
        } else {
          products.push({
            title: item.Title,
            description: item.Description || "",
            price: item.Price,
            category: item.Category,
            image: item.Image || "default.jpg",
            stock: item.Stock || 1,
          });
        }
      });

      if (failedRows.length > 0) {
        console.log("Validation errors on rows:", failedRows);
      }

      // Check for duplicate titles in the database
      const existingTitles = products.map((p) => p.title);
      const existingProducts = await Product.find({
        title: { $in: existingTitles },
      });

      const existingTitlesSet = new Set(existingProducts.map((p) => p.title));
      const uniqueProducts = products.filter(
        (p) => !existingTitlesSet.has(p.title)
      );

      // Chunk insertion for large datasets
      const CHUNK_SIZE = 100;
      for (let i = 0; i < uniqueProducts.length; i += CHUNK_SIZE) {
        const chunk = uniqueProducts.slice(i, i + CHUNK_SIZE);
        await Product.insertMany(chunk);
      }

      res.status(200).json({
        message: "Bulk upload completed.",
        successfulUploads: uniqueProducts.length,
        duplicates: existingProducts.length,
        failedRows,
      });
    } catch (error) {
      console.error("Error processing bulk upload:", error.message);
      res.status(500).json({
        message: "Error processing the Excel file.",
        error: error.message,
      });
    }
  });
};


// POST endpoint to create a product (Admin only)
const postProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { title, description, price, category, image, stock } =
      req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !image ||
      stock === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
      return res
        .status(400)
        .json({ message: "Price and stock must be non-negative numbers." });
    }

    const product = new Product({
      title,
      description,
      price,
      category,
      image,
      stock,
    });

    await product.save();

    res.status(201).json({
      message: "Product successfully created.",
      productId: product._id,
    });
  } catch (err) {
    console.error("Error posting product:", err);
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


// GET all products
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

// GET products by category
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

// PUT endpoint to edit a product (Admin only)
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

    const { title, description, price, category, subcategory, image } =
      req.body;
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (subcategory) product.subcategory = subcategory;
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

// DELETE a product by ID (Admin only)
const deleteProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

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

// SEARCH products by title or description
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
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

// Fetch User Address before placing order (Auto-fill address feature)
const getUserAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const addresses = user.addresses; // Assuming user has an array of addresses
    if (addresses.length === 0) {
      return res
        .status(404)
        .json({ message: "No saved addresses found for this user." });
    }

    res.status(200).json({ addresses });
  } catch (err) {
    console.error("Error fetching user address:", err);
    res
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
  searchProducts,
  bulkUploadProducts,
  getUserAddress, // Add this function for fetching user address
};
