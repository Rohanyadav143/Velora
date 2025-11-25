import React from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="container p-6 max-w-6xl mx-auto">
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200 text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-3 px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 border-b text-center">Applicants</th>
              <th className="py-3 px-4 border-b text-center">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 border-b max-sm:hidden">{index + 1}</td>
                <td className="py-3 px-4 border-b font-medium">{job.title}</td>
                <td className="py-3 px-4 border-b max-sm:hidden">{moment(job.date).format('ll')}</td>
                <td className="py-3 px-4 border-b max-sm:hidden">{job.location}</td>
                <td className="py-3 px-4 border-b text-center">{job.applicants}</td>
                <td className="py-3 px-4 border-b text-center">
                  <input className="scale-125 cursor-pointer" type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-5 rounded-lg"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
