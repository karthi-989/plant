import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Header from "../components/Header"; // Import Header component
import axios from "axios";
import Footer from "./Footer";

const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    console.log("Token being used:", token); // Debugging

    const response = await axios.post(
      "http://localhost:7001/api/cart/add",
      { productId, quantity: 1 },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure correct format
        },
      }
    );

  } catch (error) {
    console.error(
      "Error adding product to cart:",
      error.response?.data || error.message
    );
    alert("Failed to add product to cart.");
  }
};

const Shop = () => {
  const location = useLocation(); // Get current URL
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category"); // Get category from URL

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:7001/api/auth/product");
      const data = await response.json();
      setProducts(data);

      if (selectedCategory) {
        const formattedCategory =
          selectedCategory.charAt(0).toUpperCase() +
          selectedCategory.slice(1).toLowerCase();

        setFilteredProducts(
          data.filter((product) => product.category === formattedCategory)
        );
      } else {
        setFilteredProducts(data); // Show all products if no category is selected
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [selectedCategory]);
 // Run effect when category changes

  return (
    <div className="m-0 font-sans">
      <Header /> {/* Navbar/Header */}
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col h-[300px] w-full sm:h-[250px] sm:w-[180px] md:w-[220px]" // Adjust height and width for mobile
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[150px] sm:h-[120px] md:h-[140px] object-cover rounded-md mb-4"
                />

                {/* Product Title */}
                <h6 className="text-lg font-bold text-center mb-2">
                  {product.title}
                </h6>

                {/* Price and Add to Cart Button */}
                <div className="mt-auto flex justify-between items-center">
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
      <Footer/>
    </div>
    
  );
};

export default Shop;
