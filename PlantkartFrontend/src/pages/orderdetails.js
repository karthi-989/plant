import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./adminLayout";

const API_URL = process.env.REACT_APP_API_URL;

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in again.");
        return;
      }

      const response = await axios.get(`${API_URL}/api/auth/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6  mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Order Management
        </h2>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">
                  Products
                </th>
                <th className="px-4 py-3 border-b text-center text-sm font-semibold text-gray-700">
                  Total Amount
                </th>
                <th className="px-4 py-3 border-b text-center text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-4 py-3 border-b text-gray-800">
                      {order.userId.username}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-800">
                      {order.products.map((product, index) => (
                        <div key={index} className="mb-1">
                          <span className="font-medium">
                            {product.quantity}
                          </span>{" "}
                          x ₹
                          <span className="font-medium">{product.price}</span> —{" "}
                          <span className="italic text-gray-600">
                            {product.productId?.title || "Unknown Product"}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 border-b text-center font-semibold text-gray-800">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-4 py-3 border-b text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    No orders to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderDetails;
