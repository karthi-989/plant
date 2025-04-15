import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    landmark: "",
  });

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
    fetchCart();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Failed to load addresses:", err);
      setError("Failed to fetch addresses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.cart);
      setTotalPrice(res.data.totalPrice);
    } catch (err) {
      console.error("Failed to load cart:", err);
      setError("Failed to fetch cart details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "address",
      "city",
      "state",
      "country",
      "pincode",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field} field.`);
        return false;
      }
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError("Pincode must be a valid 6-digit number.");
      return false;
    }

    setError("");
    return true;
  };

  const handleAddOrEdit = async () => {
    if (!validateAddress()) return;
    const token = localStorage.getItem("token");
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/addresses/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/api/addresses`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        landmark: "",
      });
      fetchAddresses();
    } catch (err) {
      console.error("Error adding/editing address:", err);
      setError("Failed to save address. Please try again.");
    }
  };

  const handleEditClick = (address) => {
    setFormData(address);
    setEditingId(address._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address:", err);
      setError("Failed to delete address. Please try again.");
    }
  };

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
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay SDK. Please try again.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email || "user@example.com";
    const userName = user?.name || formData.name || "User";
    const userPhone = user?.phone || formData.phoneNumber || "";

    const orderResponse = await axios.post(
      `${API_URL}/api/auth/create-order`,
      {
        address: selectedAddress,
        cartItems: cart,
        totalPrice: totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { orderId, key } = orderResponse.data;

const options = {
  key: "rzp_test_PGrSvKSsu8PlqK", // Your Razorpay Key
  amount: totalPrice * 100, // Convert to paise
  currency: "INR",
  name: "Plant Store",
  description: "Order Payment",
  order_id: orderId, // Ensure this is correctly set
  handler: function (response) {
    console.log("Full Razorpay Response:", response); // Debug response
    // Send payment details to backend for verification
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
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Payment successful! Your order has been placed.");
        navigate("/home");
      })
      .catch((err) => {
        console.error(
          "Payment verification failed:",
          err.response?.data || err
        );
        alert("Payment verification failed, please try again.");
      });
  },
  prefill: {
    name: userName,
    email: userEmail,
    contact: userPhone,
  },
  theme: { color: "#3399cc" },
};


    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (err) {
    console.error("Error during payment:", err);
    setError("Payment process failed. Please try again.");
  }
};



  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">
      {/* Left: Address List */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <p>Loading addresses...</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 border rounded mb-3 ${
                selectedAddress?._id === addr._id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <p>
                <strong>
                  {addr.firstName} {addr.lastName}
                </strong>{" "}
                ({addr.phoneNumber})
              </p>
              <p>
                {addr.address}, {addr.city}, {addr.state}, {addr.country} -{" "}
                {addr.pincode}
              </p>
              <p>Email: {addr.email}</p>
              <p>Landmark: {addr.landmark}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setSelectedAddress(addr)}
                  className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Select
                </button>
                <button
                  onClick={() => handleEditClick(addr)}
                  className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right: Address Form */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Address" : "Add New Address"}
        </h2>
        <form className="grid grid-cols-1 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="landmark"
            placeholder="Landmark (optional)"
            value={formData.landmark}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            type="button"
            onClick={handleAddOrEdit}
            className="bg-green-600 text-white p-2 rounded mt-2"
          >
            {editingId ? "Update Address" : "Add Address"}
          </button>
        </form>

        <button
          onClick={handlePayment}
          className={`bg-indigo-600 text-white mt-6 w-full p-3 rounded-lg ${
            !selectedAddress ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedAddress}
        >
          Proceed to Pay ₹{totalPrice}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
