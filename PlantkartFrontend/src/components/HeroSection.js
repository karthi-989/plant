import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const categories = [
  {
    name: "BONSAI",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtcN68RmeyZMh9hLDW_Lci0KaIPVZZjxy4mQ&s",
  },
  {
    name: "CACTUS",
    img: "https://media.istockphoto.com/id/1056600248/photo/house-indoor-plants-collection-succulent-and-cactus-in-different-pots-on-white-background.jpg?s=612x612&w=0&k=20&c=VaPeEhKGPSihTmgsZXSv5z_k5s6kIe59V3zrNf8bIYQ=",
  },
  {
    name: "CREEPERS",
    img: "https://m.media-amazon.com/images/I/61C613Fu+GL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    name: "SUCCULENTS",
    img: "https://www.moonvalleynurseries.com/_next/image?url=https%3A%2F%2Fcdn.mvncorp.dev%2Fmedia%2Fheroes%2Flarge%2FMVN-Succulents-Hero.jpeg&w=3840&q=50",
  },
  {
    name: "SEEDS",
    img: "https://www.anneofgreengardens.com/wp-content/uploads/2015/08/Seeds-Anne-of-Green-Gardens.jpg",
  },
  {
    name: "GIFTING",
    img: "https://www.angroos.com/wp-content/uploads/2023/07/marriage-return-gift-ideas.jpg",
  },
];

const HeroSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Navigate to shop page with category parameter
  const handleNavigate = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-10 bg-gray-100 px-4">
      {/* Hero Banner */}


      {/* Categories */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-2 sm:px-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={() => handleNavigate(category.name)}
          >
            {/* Category Image */}
            <img
              src={category.img}
              alt={category.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-full"
            />
            
            {/* Category Name */}
            <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-gray-700">
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {/* "See All" Button */}
      <div className="text-center mt-8">
        <a
          href="/shop"
          className="text-green-600 font-semibold text-lg hover:underline"
          onClick={(e) => e.stopPropagation()} // Prevent click event bubbling
        >
          See all →
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
