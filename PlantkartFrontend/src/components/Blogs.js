import React from "react";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "8 Best Low Maintenance Plants For a Busy Home",
      image:
        "https://img.freepik.com/free-photo/close-up-person-s-hand-holding-plant-with-gardening-equipments-flower-peat-pot-peat-tray-wooden-table_23-2148044577.jpg?t=st=1736170865~exp=1736174465~hmac=667d46b4da09c9c736a6400538be6775d522003a7beaad8215016a2822eb1beb&w=1380",
    },
    {
      id: 2,
      title: "Air Purifying Plants You Should Take Home Today",
      image:
        "https://img.freepik.com/free-photo/high-angle-man-working-eco-friendly-wind-power-project-with-papers-pencil_23-2148847791.jpg?t=st=1736170938~exp=1736174538~hmac=a059ec6ba39ef419d10707b973fc33912427dcbf0795a9f19bca2acc8620f582&w=900",
    },
    {
      id: 3,
      title: "The Best Indoor Plants for a Healthier Home",
      image:
        "https://blog.woodenstreet.com/images/data/image_upload/1685795038Blog-banner.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
     
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Blogs
      </h2>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
           
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />

           
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {blog.title}
              </h3>
              <button className="mt-2 bg-white text-gray-800 px-4 py-2 rounded-md font-medium transition hover:bg-gray-300">
                Read
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
