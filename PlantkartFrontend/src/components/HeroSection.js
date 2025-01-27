import React from "react";
import "./HeroSection.css";

const categories = [
  { name: "BONSAI", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtcN68RmeyZMh9hLDW_Lci0KaIPVZZjxy4mQ&s" },
  { name: "CACTUS", img: "https://media.istockphoto.com/id/1056600248/photo/house-indoor-plants-collection-succulent-and-cactus-in-different-pots-on-white-background.jpg?s=612x612&w=0&k=20&c=VaPeEhKGPSihTmgsZXSv5z_k5s6kIe59V3zrNf8bIYQ=" },
  { name: "CREEPERS", img: "https://m.media-amazon.com/images/I/61C613Fu+GL._AC_UF1000,1000_QL80_.jpg" },
  { name: "SUCCULENTS", img: "https://www.moonvalleynurseries.com/_next/image?url=https%3A%2F%2Fcdn.mvncorp.dev%2Fmedia%2Fheroes%2Flarge%2FMVN-Succulents-Hero.jpeg&w=3840&q=50" },
  { name: "SEEDS", img: "https://www.anneofgreengardens.com/wp-content/uploads/2015/08/Seeds-Anne-of-Green-Gardens.jpg" },
  { name: "GIFTING", img: "https://www.angroos.com/wp-content/uploads/2023/07/marriage-return-gift-ideas.jpg" },
];

const HeroSection = () => {
  return (
    <section className="hero-section">
     
      <div className="hero-banner">
      </div>

      {/* Categories */}
      <div className="categories-container">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <img src={category.img} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
          </div>
        ))}
        <a href="#see-all" className="see-all-link">
          See all →
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
