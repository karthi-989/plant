import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const products = response.data?.cart?.products;
      setCartItems(Array.isArray(products) ? products : []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/auth/products/search?query=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    }
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <nav className="flex justify-between items-center px-6 py-4 md:px-10 w-full">
        <Link to="/home" className="text-2xl font-bold text-green-600">
          PlantKart
        </Link>

        <ul className="hidden md:flex space-x-6">
          {["Home", "Plants", "Planters", "Essentials", "Services", "Shop"].map(
            (name, index) => (
              <li key={index}>
                <Link
                  to={`/${name.toLowerCase()}`}
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  {name}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center space-x-4 relative">
         
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="hidden md:block px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
           
            {searchResults.length > 0 && (
              <div className="absolute bg-white shadow-md rounded-md mt-2 w-full max-w-xs p-2 z-50">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <span>{product.title}</span>
                    <span className="text-gray-500">${product.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <ShoppingCart
            className="text-gray-600 hover:text-green-600 transition cursor-pointer"
            onClick={() => navigate("/cart")}
          />

         
          <User
            className="text-gray-600 hover:text-green-600 transition cursor-pointer"
            onClick={() => navigate("/login")}
          />

          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white py-4 shadow-md">
          {["Home", "Plants", "Planters", "Essentials", "Services", "Shop"].map(
            (name, index) => (
              <Link
                key={index}
                to={`/${name.toLowerCase()}`}
                className="py-2 text-gray-700 hover:text-green-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
