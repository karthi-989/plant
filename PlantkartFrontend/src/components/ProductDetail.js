import React, { useState } from 'react';
import './ProductDetail.css';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');

  return (
    <div className="product-detail">
      {/* Top Bar */}
      <div className="top-bar">
        <p>Use code FIRST50 for a 50% discount on your first order!</p>
      </div>

      {/* Product Section */}
      <div className="product-section">
        <div className="product-images">
          <img
            className="main-image"
            src="https://via.placeholder.com/600"
            alt="Hoya Linearis"
          />
          <div className="thumbnail-images">
            <img
              className="thumbnail"
              src="https://via.placeholder.com/100"
              alt="Thumbnail 1"
            />
            <img
              className="thumbnail"
              src="https://via.placeholder.com/100"
              alt="Thumbnail 2"
            />
            <img
              className="thumbnail"
              src="https://via.placeholder.com/100"
              alt="Thumbnail 3"
            />
          </div>
        </div>

        <div className="product-info">
          <h1>Hoya Linearis</h1>
          <p className="price">
            ₹ 350 <span className="original-price">₹ 450</span>
          </p>
          <p className="description">
            With rounded light green and white-striped leaves, the Hoya Linearis is a decorative and unique houseplant.
          </p>

          <div className="purchase-section">
            <div className="quantity">
              <label>Quantity:</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="checkbox">
              <input type="checkbox" id="planter" />
              <label htmlFor="planter">Include Planter</label>
            </div>
          </div>
          <button className="add-to-cart">Add to Cart</button>

          <div className="delivery-section">
            <label htmlFor="pincode">Delivery</label>
            <input
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button className="check-button">Check</button>
            <p className="delivery-info">
              Delivery available for this location. Typically delivered in 5-7 working days.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="tabs">
          <button className="tab active">Care Guide</button>
          <button className="tab">Plant Bio</button>
          <button className="tab">Reviews</button>
        </div>
        <div className="tab-content">
          <h3>Weekly Watering</h3>
          <p>Water weekly, allowing the top 2” of soil to dry out partially.</p>
          <h3>Light Requirements</h3>
          <p>Bright indirect sunlight. Avoid direct sun exposure.</p>
          <h3>Humidity</h3>
          <p>Appreciates being in a humid environment.</p>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="recommendations">
        <h2>You May Also Like...</h2>
        <div className="recommendation-cards">
          <div className="card">
            <img src="https://via.placeholder.com/200" alt="Adenium Plant" />
            <h3>Adenium Plant</h3>
            <p className="price">
              ₹ 350 <span className="original-price">₹ 450</span>
            </p>
            <button className="buy-button">Buy</button>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/200" alt="Ficus Twilight" />
            <h3>Ficus Twilight</h3>
            <p className="price">
              ₹ 350 <span className="original-price">₹ 450</span>
            </p>
            <button className="buy-button">Buy</button>
          </div>
          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
