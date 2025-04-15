const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentId: String,
    orderId: String,
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    // ✅ Add this address field
    address: {
      firstName: String,
      lastName: String,
      phoneNumber: String,
      address: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
      landmark: String,
      email: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
