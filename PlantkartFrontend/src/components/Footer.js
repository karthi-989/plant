import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-300 py-6 position-fixed">
     
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
        <div className="flex flex-col items-center lg:items-start">
          <img
            src="https://pbs.twimg.com/profile_images/811635929374806016/KGnTw0BJ_400x400.jpg"
            alt="PlantKart Logo"
            className="w-20 h-20 rounded-full border-2 border-green-400 shadow-lg"
          />
        </div>

      
        <div className="hidden md:block">
          <h4 className="text-white font-semibold text-md mb-3">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-green-400 cursor-pointer">About Us</li>
            <li className="hover:text-green-400 cursor-pointer">Bulk Order</li>
            <li className="hover:text-green-400 cursor-pointer">Gifts</li>
            <li className="hover:text-green-400 cursor-pointer">
              Organic Garden
            </li>
          </ul>
        </div>

       
        <div className="hidden md:block">
          <h4 className="text-white font-semibold text-md mb-3">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-green-400 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-green-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-green-400 cursor-pointer">Returns</li>
            <li className="hover:text-green-400 cursor-pointer">Shipping</li>
          </ul>
        </div>

       
        <div className="hidden md:block">
          <h4 className="text-white font-semibold text-md mb-3">Support</h4>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-green-400 cursor-pointer">FAQs</li>
            <li className="hover:text-green-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>
      </div>

    
      <div className="border-t border-gray-700 mt-4 pt-3 flex flex-col items-center space-y-3">
        <p className="text-xs">© 2024 Plan A Plant | All Rights Reserved</p>
        <div className="flex space-x-4">
          <FaFacebookF className="text-lg hover:text-green-400 cursor-pointer transition-all" />
          <FaTwitter className="text-lg hover:text-green-400 cursor-pointer transition-all" />
          <FaInstagram className="text-lg hover:text-green-400 cursor-pointer transition-all" />
        </div>
      </div>

     
      <div className="mt-4 flex flex-col items-center">
        <p className="text-gray-400 text-xs mb-2">Secure Payments</p>
        <div className="flex space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6YnQoM78NCEw3f--iWcGhpQFjBxfo9k6fw&s"
            alt="Visa"
            className="w-12 h-7 object-cover"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"
            alt="MasterCard"
            className="w-12 h-7 object-cover"
          />
          <img
            src="https://static.businessworld.in/American-Express-Color_20241008185737_original_image_48.webp"
            alt="Amex"
            className="w-12 h-7 object-cover"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4MYyLYM7pbec94UuMZKSUY9GxNrRL4_HlQ&s"
            alt="RuPay"
            className="w-12 h-7 object-cover"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
