import React from "react";
import "../components/CelebsYouLove.css"; // Import the CSS file

const CelebsYouLove = () => {
  const celebData = [
    // First row (3 images)
    [
      { id: 1, name: "Celeb 1", img: "https://cdn.hosted-assets.com/nourishingneighbors/ul/q_auto/9DEY071R/c89e77/c89e77-iStock-1364679535.jpg" },
      { id: 2, name: "Celeb 2", img: "https://www.bootstrapfarmer.com/cdn/shop/articles/MarketGardening.jpg?v=1724348108" },
      { id: 3, name: "Celeb 3", img: "https://www.gut-haidehof.de/assets/Uploads/40__ResizedImageWzYwMCw0MDBd.jpg" },
    ],
    // Second row (4 images)
    [
      { id: 4, name: "Celeb 4", img: "https://media.greenmatters.com/brand-img/T3qIg8gIM/0x0/why-gardening-is-important5-1607990477433.jpg" },
      { id: 5, name: "Celeb 5", img: "https://static.toiimg.com/thumb/msid-75650552,imgsize-277329,width-400,resizemode-4/75650552.jpg" },
      { id: 6, name: "Celeb 6", img: "https://www.thrive.org.uk/files/images/Gardening-advice/_large/Ad-image-2.jpg" },
      { id: 7, name: "Celeb 7", img: "https://media.greenmatters.com/brand-img/T3qIg8gIM/0x0/why-gardening-is-important5-1607990477433.jpg" },
    ],
  ];

  return (
    <div className="celebs-container">
      <h2 className="celebs-heading">Celebs You Love, Love Us</h2>
      <div className="celebs-grid">
        {celebData.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="row">
            {row.map((celeb) => (
              <div key={celeb.id} className="celeb-card">
                <img src={celeb.img} alt={celeb.name} className="celeb-image" />
                <div className="celeb-overlay">
                  <p className="celeb-name">{celeb.name}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelebsYouLove;
