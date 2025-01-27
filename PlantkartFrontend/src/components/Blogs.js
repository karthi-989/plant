import React from "react";
import "./Blogs.css";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "8 Best Low Maintenance Plants For a Busy Home",
      image: "https://img.freepik.com/free-photo/close-up-person-s-hand-holding-plant-with-gardening-equipments-flower-peat-pot-peat-tray-wooden-table_23-2148044577.jpg?t=st=1736170865~exp=1736174465~hmac=667d46b4da09c9c736a6400538be6775d522003a7beaad8215016a2822eb1beb&w=1380", // Replace with actual image URL
    },
    {
      id: 2,
      title: "Air Purifying Plants You Should Take Home Today",
      image: "https://img.freepik.com/free-photo/high-angle-man-working-eco-friendly-wind-power-project-with-papers-pencil_23-2148847791.jpg?t=st=1736170938~exp=1736174538~hmac=a059ec6ba39ef419d10707b973fc33912427dcbf0795a9f19bca2acc8620f582&w=900", // Replace with actual image URL
    },
  ];

  return (
    <div className="blogs-section">
      <h2 className="blogs-title">Blogs</h2>
      <div className="blogs-container">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-overlay">
              <h3 className="blog-title">{blog.title}</h3>
              <button className="read-btn">Read</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
