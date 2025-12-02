import React, { useState, useRef, useEffect } from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {

  // State to track which dropdown is open (by index)
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefs.current.every(ref => ref && !ref.contains(event.target))) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200 text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left max-md:hidden">#</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-3 px-4 text-left max-md:hidden">Location</th>
              <th className="py-3 px-4 text-left">Resume</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">

                <td className="py-3 px-4 border-b max-md:hidden">{index + 1}</td>

                <td className="py-3 px-4 border-b flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full max-sm:hidden"
                    src={applicant.imgSrc}
                    alt={applicant.name}
                  />
                  {applicant.name}
                </td>

                <td className="py-3 px-4 border-b max-sm:hidden">{applicant.jobTitle}</td>
                <td className="py-3 px-4 border-b max-md:hidden">{applicant.location}</td>

                <td className="py-3 px-4 border-b">
                  <a
                    href={applicant.resumeLink}
                    target="_blank"
                    className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex items-center gap-2 hover:bg-blue-100"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="download" />
                  </a>
                </td>

                {/* CLICK DROPDOWN */}
                <td className="py-3 px-4 border-b">
                  <div className="relative" ref={el => dropdownRefs.current[index] = el}>
                    <button
                      className="px-3 py-1 text-gray-500 font-bold hover:bg-gray-100 rounded"
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                    >
                      ...
                    </button>

                    {openDropdown === index && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-white border rounded shadow-lg z-50 pointer-events-auto">
                        <button className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100">
                          Accept
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
