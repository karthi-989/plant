import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    landmark: "",
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Store cart details
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/cart/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Cart API Response:", response.data); // Debugging log

        setCart(response.data.cart);
        setTotalPrice(response.data.totalPrice);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart. Please try again.");
      }
    };

    fetchCart();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle payment
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to proceed with payment.");
      return;
    }

    try {
      // 🔹 Load Razorpay script before proceeding
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Failed to load Razorpay SDK. Please try again.");
        return;
      }

      // 🔹 Fetch user details from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const userEmail = user?.email || "user@example.com";

      // Step 1: Send order details to the backend to create an order
      const orderResponse = await axios.post(
        `${API_URL}/api/auth/create-order`,
        {
          billingAddress: formData,
          cartItems: cart,
          totalPrice: totalPrice,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, key } = orderResponse.data;

      // Step 2: Open Razorpay modal
      const options = {
        key: "rzp_test_PGrSvKSsu8PlqK", // Razorpay API key (Ensure it's stored securely)
        amount: totalPrice * 100, // Amount in paisa (Razorpay expects amount in the smallest currency unit)
        currency: "INR",
        name: "Plant Store",
        description: "Order Payment",
        order_id: orderId,
        handler: function (response) {
          console.log("Payment Successful", response);
          // Send payment details to backend
          axios
            .post(
              `${API_URL}/api/auth/verify-payment`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // ✅ Add Token
                },
              }
            )
            .then((res) => {
              console.log("Payment Verified:", res.data);
              alert("Payment successful! Your order has been placed.");
              navigate("/home");
            })
            .catch((err) => {
              console.error(
                "Payment verification failed:",
                err.response?.data || err
              );
              alert("Payment failed, please try again.");
            });
        },
        prefill: {
          name: formData.name || user?.name || "User",
          email: userEmail,
          contact: formData.phoneNumber || user?.phone || "",
        },
        theme: { color: "#3399cc" },
      };

      // 🔹 Ensure Razorpay object is available
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Error during payment:", err);
      setError("Payment process failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Billing Address</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form className="space-y-4">
        <div>
          <label className="block font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Landmark (Optional)</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <ul className="mt-2">
          {cart?.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <h4 className="text-lg font-bold mt-4">Total: ₹{totalPrice}</h4>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition mt-4"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
