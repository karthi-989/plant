import React from "react";
import "./HotSale.css";

const HotSale = () => {
  const products = [
    {
      id: 1,
      name: "Adenium Plant",
      price: 350,
      originalPrice: 450,
      image: "https://5.imimg.com/data5/SELLER/Default/2023/5/311705605/PW/CV/BC/26034153/painter-s-palette-plant-500x500.jpg",
      discount: "25% off",
    },
    {
      id: 2,
      name: "Ficus Twilight",
      price: 350,
      originalPrice: 450,
      image: "https://5.imimg.com/data5/VR/EP/MY-26034153/artificial-plant-500x500.jpg",
      discount: "25% off",
    },
    {
      id: 3,
      name: "Rhoeo Plant",
      price: 350,
      originalPrice: 450,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2KmcLOR3O8myJqQaN5DwYwXycxSXjvLijSXLi-J5GgvS-S-W-_Q6gdSbSrzNO8STP4&usqp=CAU",
      discount: "25% off",
    },
    {
      id: 4,
      name: "Ctenanthe burle",
      price: 350,
      originalPrice: 450,
      image: "https://5.imimg.com/data5/SELLER/Default/2023/4/302796703/JR/NA/TN/26034153/artificial-flower-76-1000x1000.jpg",
      discount: "25% off",
    },
  ];

  return (
    <div className="hot-sale">
      <h2 className="hot-sale-title">Hot Sale</h2>
      <div className="hot-sale-products">
        {products.map((product) => (
          <div className="Product-Card" key={product.id}>
            <div className="Product-Image">
              <img src={product.image} alt={product.name} />
              <span className="Discount-Badge">{product.discount}</span>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                ₹ {product.price} <span className="original-price">₹ {product.originalPrice}</span>
              </p>
              <button className="buy-button">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotSale;
