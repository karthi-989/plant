import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // Fetch cart items from the backend
  useEffect(() => {
   const fetchCartItems = async () => {
     try {
       const token = localStorage.getItem("token");

       if (!token) {
         setError("Please log in to view your cart.");
         setLoading(false);
         return;
       }

       const response = await axios.get("http://localhost:7001/api/cart/get", {
         headers: { Authorization: `Bearer ${token}` },
       });

       console.log("Cart API Response:", response.data);

       // Ensure cartItems is always an array
       const products =
         response.data?.cart?.products || response.data?.cart || [];

       if (Array.isArray(products)) {
         setCartItems(products);
       } else {
         setCartItems([]); // Ensure it's always an array
       }
     } catch (err) {
       console.error("Error fetching cart:", err);
       setError("Failed to load cart. Please try again later.");
     } finally {
       setLoading(false);
     }
   };


    fetchCartItems();
  }, []);

  // Increase quantity of a product
  const handleIncreaseQuantity = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user must log in.");
        return;
      }

      const response = await axios.put(
        "http://localhost:7001/api/cart/increase",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Increase Quantity Response:", response.data);
      setCartItems(response.data.cart);
    } catch (error) {
      console.error(
        "Error increasing quantity:",
        error.response?.data || error
      );
      setError("Failed to increase quantity. Please try again later.");
    }
  };

  // Decrease quantity of a product
  const handleDecreaseQuantity = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user must log in.");
        return;
      }

      const response = await axios.put(
        "http://localhost:7001/api/cart/decrease",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Decrease Quantity Response:", response.data);
      setCartItems(response.data.cart);
    } catch (error) {
      console.error(
        "Error decreasing quantity:",
        error.response?.data || error
      );
      setError("Failed to decrease quantity. Please try again later.");
    }
  };

  // Remove product from cart
const handleRemoveFromCart = async (productId) => {
  try {
    // Optimistically update the cart state
    setCartItems((prev) =>
      prev.filter((item) => item.productId?._id !== productId)
    );

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User must log in.");
      return;
    }

    await axios.delete(`http://localhost:7001/api/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error removing product:", error.response?.data || error);
    setError("Failed to remove product. Please try again later.");
    // Rollback the optimistic update if needed
    fetchCartItems(); // Re-fetch the cart to ensure consistency
  }
};



  // Calculate total price
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) =>
          total + (item.productId?.price || 0) * (item.quantity || 1),
        0
      )
    : 0; // Default to 0 if cartItems is not an array

return (
  <div className="max-w-4xl mx-auto p-6 pt-6">
    <Header />
    <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

    {loading ? (
      <p className="text-gray-600">Loading...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : cartItems.length === 0 ? (
      <p className="text-gray-600">Your cart is empty.</p>
    ) : (
      <div>
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white shadow-md p-4 mb-4 rounded-lg"
            >
              {/* Product Image */}
              <img
                src={item.productId?.image || "https://via.placeholder.com/80"}
                alt={item.productId?.title || "Product Image"}
                className="w-20 h-20 object-cover rounded"
              />

              {/* Product Details */}
              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-lg">
                  {item.productId?.title || "Unknown Product"}
                </h3>
                <p className="text-gray-500">₹{item.productId?.price || 0}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">Qty: {item.quantity || 0}</span>

                {/* Increase Quantity Button */}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
                  onClick={() => handleIncreaseQuantity(item.productId?._id)}
                >
                  +
                </button>

                {/* Decrease Quantity Button */}
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                  onClick={() => handleDecreaseQuantity(item.productId?._id)}
                >
                  -
                </button>

                {/* Remove Button */}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                  onClick={() => handleRemoveFromCart(item.productId?._id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}

        <div className="text-right mt-6">
          <h3 className="text-lg font-semibold">
            Total: ₹{totalPrice.toFixed(2)}
          </h3>
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-lg mt-4"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default Cart;
