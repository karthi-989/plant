import React from "react";
import "./LandscapeGardening.css";

const LandscapeGardening = () => {
  return (
    <div className="landscape-gardening-container">
      <div className="text-content">
        <h2 className="title">Landscape Gardening</h2>
        <p className="description">
          Whether it is growing your own food or setting up your roof-top garden, we provide the highest quality landscaping services, contributing to a greener world and substantial living!
        </p>
        <p className="availability">
          *Service only available in Telangana and Andhra Pradesh.
        </p>
        <button className="book-button">Book Now!</button>
      </div>
      <div className="image-content">
        <img
          src="https://www.saveur.com/uploads/2023/05/00-LEAD-4-Homeacres-no-dig-garden-10th-September-2022-by-Charles-D-scaled.jpg?auto=webp&auto=webp&optimize=high&quality=70&width=1440" // Replace with your image URL
          alt="Landscape Gardening"
          className="gardening-image"
        />
      </div>
    </div>
  );
};

export default LandscapeGardening;
