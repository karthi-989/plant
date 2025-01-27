import React from 'react';
import '../components/Header.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
let navigate = useNavigate();
  return (
    <header>
      {/* Top Bar for Announcement */}
      <div className="top-bar">
        <p>Use code FIRST50 for a 50% discount on your first order!</p>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <img src="" alt="Logo" className="logo-image" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/plants">Plants</Link>
          </li>
          <li>
            <Link to="/planters">Planters</Link>
          </li>
          <li>
            <Link to="/essentials">Essentials</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
        <div className="nav-actions">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="icon-button">
            <span role="img" aria-label="Cart">
              🛒
            </span>
          </button>
          
            <button className="icon-button" onClick={()=>navigate('/login)')} >
              <span role="img" aria-label="Profile">
                👤
              </span>
            </button>
          
        </div>
      </nav>

      {/* Background Section */}
      <div className="background-section">
        <h1 className="main-title">Plan a Plant</h1>
      </div>
    </header>
  );
};

export default Header;
