import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {

  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titliRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titliRef.current.value,
      location: locationRef.current.value
    });
    setIsSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-blue-900 text-white py-16 text-center mx-2 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
          Over 10,000+ Jobs Awaiting Your Application
        </h2>

        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-6">
          Get personalized job recommendations from top companies. Your next career move is just a search away!
        </p>

        {/* FEATURE HIGHLIGHTS */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10 px-4 max-w-2xl mx-auto text-sm sm:text-base font-medium">
          <p>🚀 Fast Application Process</p>
          <p>💼 Verified Companies Only</p>
          <p>📈 Career Growth Opportunities</p>
        </div>

        {/* SEARCH BOX */}
        <div className="flex items-center justify-between bg-white rounded-xl text-gray-700 max-w-2xl pl-4 mx-4 sm:mx-auto shadow-md">

          {/* Job Search */}
          <div className="flex items-center flex-1">
            <img className="h-4 sm:h-5 opacity-60" src={assets.search_icon} alt="search" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-3 rounded outline-none w-full"
              ref={titliRef}
            />
          </div>

          {/* Location Search */}
          <div className="flex items-center flex-1 border-l border-gray-300 pl-4">
            <img className="h-4 sm:h-5 opacity-60" src={assets.location_icon} alt="location" />
            <input
              type="text"
              placeholder="Location"
              className="max-sm:text-xs p-3 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={onSearch}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-xl text-white font-medium transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* TRUSTED COMPANIES */}
      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex flex-col sm:flex-row justify-center items-center gap-4">
        <p className="font-medium text-gray-700">Trusted by Leading Companies:</p>
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap items-center">
          <img className="h-6 opacity-80" src={assets.microsoft_logo} alt="Microsoft" />
          <img className="h-6 opacity-80" src={assets.walmart_logo} alt="Walmart" />
          <img className="h-6 opacity-80" src={assets.samsung_logo} alt="Samsung" />
          <img className="h-6 opacity-80" src={assets.amazon_logo} alt="Amazon" />
          <img className="h-6 opacity-80" src={assets.accenture_logo} alt="Accenture" />
          <img className="h-6 opacity-80" src={assets.adobe_logo} alt="Adobe" />
        </div>
      </div>

      {/* ADDITIONAL CALL-TO-ACTION */}
      <div className="text-center mt-10 px-4">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Not sure where to start?
        </h3>
        <p className="text-gray-600 text-sm md:text-base mb-4">
          Explore career guides, resume tips, and industry insights to make your application stand out.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-medium transition">
          Learn More
        </button>
      </div>

    </div>
  );
};

export default Hero;
