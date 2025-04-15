const Razorpay = require("razorpay");
const crypto = require("crypto");
const Cart = require("../models/cart");
const Order = require("../models/order");
const User = require("../models/user"); 
const FailedPayment = require("../models/failedPayment");// Import the User model
require("dotenv").config();



// Create Order
exports.createOrder = async (req, res) => {
  try {
      const razorpay = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      });

    const { cartItems, totalPrice } = req.body;

    // Create Razorpay order
    const options = {
      amount: totalPrice * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Pass Razorpay Order ID to frontend
    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id, // Razorpay-generated order ID
      key: process.env.RAZORPAY_KEY_ID, // Razorpay Key ID for frontend
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ message: "Failed to create Razorpay order." });
  }
};





// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // 1. Validate incoming payment details
    console.log("📥 Received Razorpay Details:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("❌ Missing required Razorpay payment fields.");
      return res
        .status(400)
        .json({ error: "Missing required payment details." });
    }

    // 2. Generate and validate the signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body)
      .digest("hex");

    console.log("🔐 Generated Signature:", generatedSignature);
    console.log("🔐 Received Signature:", razorpay_signature);

    if (generatedSignature !== razorpay_signature) {
      console.error("❌ Signature mismatch detected.");

      // Log failed payment (optional)
      if (req.user?.id) {
        const failedPayment = new FailedPayment({
          userId: req.user.id,
          razorpay_order_id,
          razorpay_payment_id,
          reason: "Signature mismatch",
        });
        await failedPayment.save();
      }

      return res
        .status(400)
        .json({
          error: "Invalid payment signature. Payment verification failed.",
        });
    }

    // 3. Validate authenticated user
    const userId = req.user?.id;
    if (!userId) {
      console.error("❌ User not authenticated.");
      return res
        .status(401)
        .json({
          error: "Authentication required. Please log in and try again.",
        });
    }
    console.log("✅ Authenticated User ID:", userId);

    // 4. Retrieve user's cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.productId"
    );
    if (!cart || cart.products.length === 0) {
      console.error("🛒 User's cart is empty.");
      return res
        .status(400)
        .json({
          error: "Cart is empty. Please add items to your cart and try again.",
        });
    }

    console.log("🛒 Cart details:", cart);

    // 5. Calculate the total amount
    const totalAmount = cart.products.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);
    console.log("💰 Total Amount Calculated:", totalAmount);

    // 6. Create and save the order
    const newOrder = new Order({
      userId,
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "Paid", // Mark status as paid after successful verification
    });

    const savedOrder = await newOrder.save();
    console.log("✅ Order Saved Successfully:", savedOrder);

    // 7. Clear user's cart
    cart.products = [];
    await cart.save();
    console.log("🧹 Cart cleared for user ID:", userId);

    // 8. Respond with success
    res.status(200).json({
      success: true,
      message: "Payment verified and order placed successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("💥 Error during payment verification:", error.message);
    res
      .status(500)
      .json({
        error:
          "Payment verification failed due to an internal error. Please try again.",
      });
  }
};
// Admin: Get All Orders (with User Address)
exports.getAllOrders = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { status, page = 1, limit = 10 } = req.query;
    const filter = status ? { status } : {};

    const orders = await Order.find(filter)
      .populate("userId", "username email address") // Include user address
      .populate("products.productId", "title price")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const totalOrders = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "An error occurred while fetching orders" });
  }
};
