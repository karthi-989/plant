import React from "react";
import "./Planters.css";

const Planters = () => {
  const products = [
    {
      name: "Tale Pot",
      price: 350,
      originalPrice: 450,
      discount: "25% off",
      image: "https://www.theplantshop.in/cdn/shop/files/wonder-planters-125-size-set-of-5-141868.jpg?v=1714058297&width=1946",
    },
    {
      name: "Ice Cream Pot",
      price: 350,
      originalPrice: 450,
      discount: "25% off",
      image: "https://m.media-amazon.com/images/I/71-2xw9GlmL.jpg",
    },
    {
      name: "Beige Fracture",
      price: 350,
      originalPrice: 450,
      discount: "25% off",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMmO_nJQUfHaZLupFRgrst0vRg3JzaiBKjqsu3yseopbgfd2UrDDWzs4nPf0xuaU95kMc&usqp=CAU",
    },
    {
      name: "Mint Fusion",
      price: 350,
      originalPrice: 450,
      discount: "25% off",
      image: "https://plantlane.com/cdn/shop/files/DSC09758_533x.jpg?v=1712320644",
    },
  ];

  return (
    <div className="planters">
      <h2 className="Planters-title">Planters</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <span className="product-discount">{product.discount}</span>
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                ₹ {product.price}{" "}
                <span className="original-price">₹ {product.originalPrice}</span>
              </p>
              <button className="buy-btn">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planters;
