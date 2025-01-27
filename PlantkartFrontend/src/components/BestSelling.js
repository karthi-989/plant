import React from "react";
import "./BestSelling.css";

const BestSelling = () => {
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

  return (
    <div className="best-selling">
      <h2 className="best-selling-title">Best Selling</h2>
      <div className="product-cards">
        {products.map((product, index) => (
          <div className="card" key={index}>
            <img src={product.img} alt={product.title} className="card-image" />
            <div className="card-overlay">
              <h3 className="card-title">{product.title}</h3>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
