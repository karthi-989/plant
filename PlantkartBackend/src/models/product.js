const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Product image URL is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: ["Bonsai", "Indoor Plants","Cactus" "Outdoor Plants", "Flowering", "Succulents","Planter","Air Purifying Plants","Flowering Plants"], // Add categories here
  },
  stock: {
    type: Number,
    default: 1,
    min: [0, "Stock cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite error
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
