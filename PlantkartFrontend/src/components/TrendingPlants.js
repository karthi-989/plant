import React from "react";
import { Link } from "react-router-dom";
import "./TrendingPlants.css";

const TrendingPlants = () => {
  const products = [
    { name: 'Jade Terrarium', price: 350, image: 'https://m.media-amazon.com/images/I/61jQElOCBYL.AC_UF1000,1000_QL80.jpg'},
    { name: 'Ficus Benjamina', price: 350, image: 'https://myplantshop.me/cdn/shop/files/ficus_benjamina_01.jpg?v=1730720407' },
    { name: 'Syngonium Plant', price: 350, image: 'https://shrigramorganics.com/wp-content/uploads/2020/06/31-08-2019money1.jpg' },
    { name: 'Chlorophytum Lemon', price: 350, image: 'https://trivandrumnursery.com/img/p/2/5/4/254-large_default.jpg' },
    { name: 'Aloe Rauhii', price: 350, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OwC3tKg3msumwDCasMC-vh3WLWEIBQWjjw&s' },
    { name: 'Areca Palm', price: 350, image: 'https://cdn.shopify.com/s/files/1/0553/5711/2435/files/Areca-Palm-plant_480x480.jpg?v=1722232962' },
    { name: 'Sansevieria Black', price: 350, image: 'https://i0.wp.com/plantzone.in/wp-content/uploads/2024/05/3-28.jpg' },
    { name: 'Syngonium Plant', price: 350, image: 'https://theaffordableorganicstore.com/wp-content/uploads/2022/01/Products-20.jpg' },
  ];

  return (
    <div className="featured-section">
      <h2 className="featured-title">Trending Plants</h2>
      <div className="featured-grid">
        {products.map((product, index) => (
          <div className="featured-card" key={index}>
            <img src={product.image} alt={product.name} className="featured-image" />
            <div className="featured-info">
              <h3 className="featured-name">{product.name}</h3>
              <p className="featured-price">₹{product.price}</p>
              <Link to="/CartItem">
        <button className="featured-button">Buy</button>
      </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPlants;
