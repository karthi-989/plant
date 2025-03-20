import React from "react";

const CelebsYouLove = () => {
  const celebData = [
    [
      { id: 1, name: "Celeb 1", img: "https://cdn.hosted-assets.com/nourishingneighbors/ul/q_auto/9DEY071R/c89e77/c89e77-iStock-1364679535.jpg" },
      { id: 2, name: "Celeb 2", img: "https://www.bootstrapfarmer.com/cdn/shop/articles/MarketGardening.jpg?v=1724348108" },
      { id: 3, name: "Celeb 3", img: "" },
    ],
    [
      { id: 4, name: "Celeb 4", img: "https://media.greenmatters.com/brand-img/T3qIg8gIM/0x0/why-gardening-is-important5-1607990477433.jpg" },
      { id: 5, name: "Celeb 5", img: "https://static.toiimg.com/thumb/msid-75650552,imgsize-277329,width-400,resizemode-4/75650552.jpg" },
      { id: 6, name: "Celeb 6", img: "https://www.thrive.org.uk/files/images/Gardening-advice/_large/Ad-image-2.jpg" },
      { id: 7, name: "Celeb 7", img: "https://media.greenmatters.com/brand-img/T3qIg8gIM/0x0/why-gardening-is-important5-1607990477433.jpg" },
    ],
  ];

  return (
    <div className="bg-[#f0f8f1] py-12 px-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Celebs You Love, Love Us</h2>

      <div className="space-y-6">
        {celebData.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className={`grid gap-6 justify-center ${
              rowIndex === 0 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
            }`}
          >
            {row.map((celeb) => (
              <div 
                key={celeb.id} 
                className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src={celeb.img} 
                  alt={celeb.name} 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">{celeb.name}</p>
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
