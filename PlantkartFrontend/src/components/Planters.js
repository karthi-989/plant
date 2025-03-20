import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const API_URL = process.env.REACT_APP_API_URL;
const Planters = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlanters();
  }, []);

  const fetchPlanters = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/auth/product/category/planter`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching planters:", error.response?.data || error);
      setError("Failed to load planters. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is included if required
      await axios.post(
        `${API_URL}/api/cart/add`,
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Header />
      <h2 className="text-3xl font-bold text-center my-6">Planters</h2>

      {loading && <p className="text-center">Loading planters...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden p-4 flex flex-col h-[320px] w-full sm:h-[280px] sm:w-[200px] md:w-[240px]"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[180px] sm:h-[150px] md:h-[160px] object-cover rounded-md"
              />
            </div>

            {/* Product Title */}
            <h3 className="text-lg font-semibold text-center mt-2">
              {product.title}
            </h3>

            {/* Price and Add to Cart Button */}
            <div className="mt-auto flex justify-between items-center">
              <p className="text-gray-700 text-lg font-medium">
                ₹ {product.price}
              </p>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={() => addToCart(product._id)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planters;
