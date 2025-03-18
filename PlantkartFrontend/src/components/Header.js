import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:7001/api/cart/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Ensure response is an array before setting state
      const products = response.data?.cart?.products;
      setCartItems(Array.isArray(products) ? products : []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]); // Reset to an empty array on error
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
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
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="relative">
            <ShoppingCart
              className="text-gray-600 hover:text-green-600 transition cursor-pointer"
              onClick={handleCartClick}
            />
            {cartOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4">
                <h3 className="font-semibold text-lg mb-2">Cart Items</h3>
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex justify-between"
                    >
                      <span>{item.productId.title}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Your cart is empty.</p>
                )}
              </div>
            )}
          </div>

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
