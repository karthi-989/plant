import React from 'react';
import '../components/Shop.css';

const products = [
  { name: 'Jade Terrarium', price: 350, image: 'https://m.media-amazon.com/images/I/61jQElOCBYL.AC_UF1000,1000_QL80.jpg'},
  { name: 'Ficus Benjamina', price: 350, image: 'https://myplantshop.me/cdn/shop/files/ficus_benjamina_01.jpg?v=1730720407' },
  { name: 'Syngonium Plant', price: 350, image: 'https://shrigramorganics.com/wp-content/uploads/2020/06/31-08-2019money1.jpg' },
  { name: 'Chlorophytum Lemon', price: 350, image: 'https://trivandrumnursery.com/img/p/2/5/4/254-large_default.jpg' },
  { name: 'Aloe Rauhii', price: 350, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OwC3tKg3msumwDCasMC-vh3WLWEIBQWjjw&s' },
  { name: 'Areca Palm', price: 350, image: 'https://cdn.shopify.com/s/files/1/0553/5711/2435/files/Areca-Palm-plant_480x480.jpg?v=1722232962' },
  { name: 'Sansevieria Black', price: 350, image: 'https://i0.wp.com/plantzone.in/wp-content/uploads/2024/05/3-28.jpg' },
  { name: 'Syngonium Plant', price: 350, image: 'https://theaffordableorganicstore.com/wp-content/uploads/2022/01/Products-20.jpg' },
  { name: 'Cactus Peruvianus', price: 350, image: 'https://www.cactusoutlet.com/cdn/shop/products/CM-Peruvian-Apple-Product-Main-V1.0_240x.jpg?v=1634200267' },
  { name: 'Rose', price: 150, image: 'https://nurserylive.com/cdn/shop/products/nurserylive-g-plants-rose-dark-pink-plant-in-grower-round-black-pot-922015_600x600.jpg?v=1679751054' },
];

const Shop = () => {
  return (
    <div className="shop-wrapper">
      <aside className="shop-sidebar">
        <h3>All Categories</h3>
        <ul className="category-list">
          <li>Indoor Plants</li>
          <li>Outdoor Plants</li>
          <li>Medicinal Plants</li>
          <li>Others</li>
        </ul>
        <h3>Price</h3>
        <input type="range" className="price-range" />
        <h3>Include</h3>
        <ul className="filter-list">
          <li>
            <label>
              <input type="checkbox" /> Planter
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" /> Combo
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" /> Flowers
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" /> Service
            </label>
          </li>
        </ul>
      </aside>

      <main className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">₹ {product.price}</p>
            <button className="buy-button">Buy</button>
          </div>
        ))}
        <div className="load-more">
          <button className="load-more-button">Load more</button>
        </div>
      </main>
    </div>
  );
};

export default Shop;
