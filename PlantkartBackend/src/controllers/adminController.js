const Order = require("../models/order");
const User = require("../models/user"); // Import the User model

exports.getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments(); // 🆕 Count of users

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const ordersOverTime = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalOrders,
      totalUsers, // Include in response
      ordersByStatus,
      ordersOverTime,
    });
  } catch (err) {
    console.error("Failed to get order stats:", err);
    res.status(500).json({ error: "Failed to fetch order stats" });
  }
};
