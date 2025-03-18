const Razorpay = require("razorpay");
const crypto = require("crypto");
const Cart = require("../models/Cart");
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
    // Ensure only admins can access this route (using middleware is better)
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    // Extract optional query parameters for filtering and pagination
    const { status, page = 1, limit = 10 } = req.query;
    const filter = status ? { status } : {}; // Filter by status if provided

    // Fetch orders with user and product details, sorted by newest first
    const orders = await Order.find(filter)
      .populate("userId", "username email") // Fetch user details
      .populate("products.productId", "title price") // Fetch product details
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit) // Pagination
      .limit(Number(limit));

    // Get total count (for pagination)
    const totalOrders = await Order.countDocuments(filter);

    res.json({
      success: true,
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

