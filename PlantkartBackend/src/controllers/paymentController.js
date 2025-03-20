const Razorpay = require("razorpay");
const crypto = require("crypto");
const Cart = require("../models/cart");  
const Order = require("../models/order");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// Create a Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.productId"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const amount = cart.products.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

    const options = {
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `order_rcptid_${userId}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body)
    .digest("hex");

    console.log("🟢 Expected Signature:", expectedSignature);
    console.log("🔴 Received Signature:", razorpay_signature);


    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Fetch cart items for order details
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Create Order in Database
    const order = new Order({
      userId,
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount: cart.products.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      ),
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "Paid",
    });

    await order.save();

    // Clear the cart after successful payment
    cart.products = []; // FIXED: Properly clearing the cart
    await cart.save();

    res.json({
      success: true,
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    // Verify admin access
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    // Extract query parameters for filtering and pagination
    const { status, page = 1, limit = 10 } = req.query;
    const filter = status ? { status } : {}; // Apply status filter if provided

    // Fetch orders with user and product details, sorted by newest first
    const orders = await Order.find(filter)
      .populate("userId", "username email") // Populate user details
      .populate("products.productId", "title price") // Populate product details
      .sort({ createdAt: -1 }) // Sort by creation date
      .skip((page - 1) * Number(limit)) // Pagination: skip records
      .limit(Number(limit)); // Pagination: limit number of records

    // Get total order count (for pagination)
    const totalOrders = await Order.countDocuments(filter);

    // Send the response with pagination metadata
    res.status(200).json({
      success: true,
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    // Enhanced error handling
    console.error("Error fetching orders:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      error: "An error occurred while fetching orders. Please try again later.",
    });
  }
};




