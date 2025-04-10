import React from "react";

const LandscapeGardening = () => {
  return (
    <div className="mt-12 md:mt-18 flex flex-col md:flex-row items-center justify-between p-5 bg-[#eefbf0] rounded-xl shadow-lg gap-5 max-w-5xl mx-auto transition-transform duration-200 hover:shadow-xl hover:-translate-y-1">
      
      <div className="flex-1 max-w-lg text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2b5329] mb-2">
          Landscape Gardening
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-3">
          Whether it is growing your own food or setting up your roof-top
          garden, we provide the highest quality landscaping services,
          contributing to a greener world and sustainable living!
        </p>
        <p className="text-sm text-red-600 italic mb-4">
          *Service only available in Telangana and Andhra Pradesh.
        </p>
        <button className="bg-[#5dbb63] text-white px-6 py-3 rounded-lg font-semibold uppercase hover:bg-[#4fa956] transition-transform duration-200 transform hover:scale-105 w-full md:w-auto">
          Book Now!
        </button>
      </div>

      
      <div className="flex-1 flex justify-center">
        <img
          src="https://www.saveur.com/uploads/2023/05/00-LEAD-4-Homeacres-no-dig-garden-10th-September-2022-by-Charles-D-scaled.jpg?auto=webp&auto=webp&optimize=high&quality=70&width=1440"
          alt="Landscape Gardening"
          className="w-full md:w-auto h-60 md:h-72 object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default LandscapeGardening;
