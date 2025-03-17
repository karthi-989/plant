import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BestSelling = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null); // Track clicked product

  const products = [
    {
      title: "Indoor Plants",
      img: "https://img.freepik.com/premium-photo/selective-closeup-green-seedlings-green-sprouts-growing-from-seed_268192-5988.jpg?ga=GA1.1.182082587.1728046188&semt=ais_hybrid",
    },
    {
      title: "Air Purifying Plants",
      img: "https://img.freepik.com/free-photo/still-life-with-indoor-plants_23-2151024954.jpg?ga=GA1.1.182082587.1728046188&semt=ais_hybrid",
    },
    {
      title: "Flowering Plants",
      img: "https://img.freepik.com/free-photo/indoor-plants-studio_23-2151022096.jpg?ga=GA1.1.182082587.1728046188&semt=ais_hybrid",
    },
  ];

  const handleNavigate = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle overlay
  };

  return (
    <div className="py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Best Selling
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer h-[400px]"
            onClick={() => handleClick(index)}
          >
            {/* Product Image */}
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay Content (Visible on Click) */}
            <div
              className={`absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center transition duration-300 ${
                activeIndex === index
                  ? "opacity-100"
                  : "opacity-0 sm:hover:opacity-100"
              }`}
            >
              <h3 className="text-white text-lg font-semibold mb-3">
                {product.title}
              </h3>
              <button
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent bubbling
                  handleNavigate(product.title);
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
