const mongoose = require("mongoose");

const failedPaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String },
  reason: { type: String, required: true }, // e.g., "Invalid signature"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FailedPayment", failedPaymentSchema);
