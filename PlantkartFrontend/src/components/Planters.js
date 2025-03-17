import React, { useEffect, useState } from "react";
import axios from "axios";

const Planters = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPlanters();
  }, []);

  const fetchPlanters = async () => {
    try {
      const response = await axios.get(
        "http://your-backend-url.com/api/products?category=planter"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching planters:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("http://your-backend-url.com/api/cart", {
        productId,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-6">Planters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {product.discount || "10% off"}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-700">
                ₹ {product.price}{" "}
                <span className="line-through text-gray-400">
                  ₹ {product.originalPrice || product.price * 1.2}
                </span>
              </p>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Buy
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => addToCart(product._id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planters;
