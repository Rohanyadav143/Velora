import React from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {
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
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 border-b text-center max-md:hidden">
                  {index + 1}
                </td>
                <td className="py-3 px-4 border-b flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full max-sm:hidden"
                    src={applicant.imgSrc}
                    alt={applicant.name}
                  />
                  <span>{applicant.name}</span>
                </td>
                <td className="py-3 px-4 border-b max-sm:hidden">
                  {applicant.jobTitle}
                </td>
                <td className="py-3 px-4 border-b max-md:hidden">
                  {applicant.location}
                </td>
                <td className="py-3 px-4 border-b">
                  <a
                    href={applicant.resumeLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center hover:bg-blue-100 transition"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="Download" />
                  </a>
                </td>
                <td className="py-3 px-4 border-b">
                  <div className="relative inline-block text-left group">
                    <button className="text-gray-500 font-bold px-3 py-1 hover:bg-gray-100 rounded">
                      ...
                    </button>
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-10">
                      <button className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100">
                        Accept
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                        Reject
                      </button>
                    </div>
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
