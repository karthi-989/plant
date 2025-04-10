import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

console.log("Backend API URL:", API_URL);

const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    console.log("Token being used:", token);

    await axios.post(
      `${API_URL}/api/cart/add`,
      { productId, quantity: 1 },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.alert("Product added to cart!");
  } catch (error) {
    console.error(
      "Error adding product to cart:",
      error.response?.data || error.message
    );
    alert("Failed to add product to cart.");
  }
};

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/product`);
        const data = await response.json();
        setProducts(data);

        if (selectedCategory) {
          const formattedCategory = selectedCategory.toLowerCase();
          setFilteredProducts(
            data.filter(
              (product) => product.category.toLowerCase() === formattedCategory
            )
          );
        } else {
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="m-0 font-sans">
      <Header />
      <div className="p-5 text-center pt-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 relative inline-block">
          {selectedCategory
            ? `${selectedCategory.charAt(0).toUpperCase()}${selectedCategory
                .slice(1)
                .toLowerCase()} Collection`
            : "Shop Our Plants"}
          <span className="block w-16 h-[3px] bg-gray-800 mx-auto mt-3"></span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col justify-between h-[320px] w-full sm:w-[200px] md:w-[240px]"
              >
                
                <div className="h-[150px] flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

             
                <h6 className="text-lg font-bold text-center mt-2">
                  {product.title}
                </h6>

                <div className="mt-auto flex justify-between items-center border-t border-gray-200 pt-3">
                  <p className="text-gray-600 text-lg font-semibold">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                    aria-label={`Add ${product.title} to cart`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Shop;
