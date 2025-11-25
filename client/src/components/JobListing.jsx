import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCatogries] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filteredjob, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCatogries((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [selectedCategories, selectedLocation, searchFilter, jobs]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      
      {/* Side Bar */}
      <div className="w-full lg:w-1/4 bg-white px-6 py-6 rounded-2xl">
        
        {/* Current Search */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-semibold text-lg mb-4">Current Search</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 px-4 py-1.5 rounded-full text-blue-700">
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer w-4 h-4"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2 bg-red-100 border border-red-200 px-4 py-1.5 rounded-full text-red-700">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer w-4 h-4"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-2 rounded-full border border-gray-300 lg:hidden mb-6 hover:bg-gray-100 transition"
        >
          {showFilter ? "Close Filters" : "Show Filters"}
        </button>

        {/* Category Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-semibold text-lg mb-3">Filter by Categories</h4>
          <ul className="space-y-3 text-gray-700">
            {JobCategories.map((category, index) => (
              <li className="flex items-center gap-3" key={index}>
                <input
                  className="scale-125 mt-1"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                <span className="hover:text-blue-600 transition">{category}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-semibold text-lg mb-3 mt-6">Filter by Location</h4>
          <ul className="space-y-3 text-gray-700">
            {JobLocations.map((location, index) => (
              <li className="flex items-center gap-3" key={index}>
                <input
                  className="scale-125 mt-1"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocation.includes(location)}
                />
                <span className="hover:text-blue-600 transition">{location}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listing */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-semibold text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8 text-gray-600">Find your dream job from top companies</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredjob
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* Pagination */}
        {filteredjob.length > 0 && (
          <div className="flex items-center justify-center space-x-4 mt-10">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <img src={assets.left_arrow_icon} alt="prev" className="w-5 h-5" />
            </button>

            {Array.from({ length: Math.ceil(filteredjob.length / 6) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                    currentPage === index + 1
                      ? "bg-blue-100 text-blue-600 border-blue-200"
                      : "border-gray-300 text-gray-500 hover:bg-gray-100"
                  } transition`}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage(
                  Math.min(currentPage + 1, Math.ceil(filteredjob.length / 6))
                )
              }
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <img src={assets.right_arrow_icon} alt="next" className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
