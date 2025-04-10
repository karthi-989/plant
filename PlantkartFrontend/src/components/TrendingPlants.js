import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

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

    alert("Product added to cart!");
  } catch (error) {
    console.error(
      "Error adding product to cart:",
      error.response?.data || error.message
    );
    alert("Failed to add product to cart.");
  }
};

const TrendingPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/auth/product`
        );
        const allPlants = response.data;
        if (Array.isArray(allPlants) && allPlants.length > 0) {
          const randomPlants = allPlants
            .sort(() => 0.5 - Math.random())
            .slice(0, 8);
          setPlants(randomPlants);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Trending Plants</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading plants...</p>
      ) : plants.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plants.map((plant) => (
            <div
              key={plant._id}
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col h-[320px] sm:h-[280px] md:h-[300px] w-full"
            >
              
              <Link to={`/product/${plant._id}`}>
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-[160px] sm:h-[140px] md:h-[160px] object-cover rounded-md mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </Link>

            
              <h6 className="text-lg font-semibold text-center text-gray-800">
                {plant.title}
              </h6>

              
              <div className="mt-auto flex justify-between items-center">
                <p className="text-gray-600 text-lg font-medium">
                  ₹{plant.price}
                </p>
                <button
                  onClick={() => addToCart(plant._id)}
                  className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition-all duration-300"
                  aria-label={`Add ${plant.name} to cart`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No trending plants available.
        </p>
      )}
    </div>
  );
};

export default TrendingPlants;
