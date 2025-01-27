import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-logo">
          <img
            src="https://pbs.twimg.com/profile_images/811635929374806016/KGnTw0BJ_400x400.jpg" // Replace with your logo URL
            alt="PlantKart Logo"
          />
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Bulk Order</li>
              <li>Gifts</li>
              <li>Organic Garden</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li>T&C</li>
              <li>Privacy Policy</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Cancellation</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>FAQs</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div className="footer-badge">
          <img
            src="https://media.istockphoto.com/id/1225603023/vector/100-satisfaction-guaranteed-stamp-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=-7f2yh9JdOBIO7pYMrhVQuqjuOBV43KmeY-toHyKZMk=" // Replace with your badge URL
            alt="Satisfaction Guaranteed"
          />
        </div>
        <div className="footer-social">
        <p>© 2024 Plan A Plant | All Rights Reserved</p>
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
      
      </div>
      <div className="footer">
  <div className="footer-bottom">
    <p>We facilitate your payments through trusted gateways</p>
    <div className="payment-icons">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6YnQoM78NCEw3f--iWcGhpQFjBxfo9k6fw&s" alt="Visa" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="MasterCard" />
      <img src="https://static.businessworld.in/American-Express-Color_20241008185737_original_image_48.webp" alt="Amex" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4MYyLYM7pbec94UuMZKSUY9GxNrRL4_HlQ&s" alt="RuPay" />
    </div>
  </div>
</div>

      
    </footer>
    
  );
};

export default Footer;
