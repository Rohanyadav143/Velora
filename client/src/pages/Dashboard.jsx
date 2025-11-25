import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="shadow py-4 bg-white">
        <div className="px-6 2xl:px-20 flex justify-between items-center">
          <img
            onClick={() => navigate('/')}
            className="max-sm:w-32 cursor-pointer w-24 rounded"
            src={assets.logo}
            alt="Logo"
          />
          <div className="flex items-center gap-4 relative">
            <p className="max-sm:hidden text-gray-700 font-medium">Welcome, Rohan</p>
            <div className="relative group">
              <img className="w-10 h-10 border rounded-full cursor-pointer" src={assets.company_icon} alt="Profile" />
              <div className="absolute hidden group-hover:block top-12 right-0 z-20 text-black rounded shadow-lg">
                <ul className="bg-white rounded-md border text-sm w-32">
                  <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="min-h-screen w-64 bg-white border-r shadow-sm hidden sm:block">
          <ul className="flex flex-col pt-6">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 gap-3 text-gray-700 hover:bg-blue-50 rounded-l-md transition ${
                  isActive ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold' : ''
                }`
              }
              to="/dashboard/add-job"
            >
              <img className="w-5 h-5" src={assets.add_icon} alt="Add Job" />
              <span>Add Job</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 gap-3 text-gray-700 hover:bg-blue-50 rounded-l-md transition ${
                  isActive ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold' : ''
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img className="w-5 h-5" src={assets.home_icon} alt="Manage Jobs" />
              <span>Manage Jobs</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 gap-3 text-gray-700 hover:bg-blue-50 rounded-l-md transition ${
                  isActive ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold' : ''
                }`
              }
              to="/dashboard/view-applications"
            >
              <img className="w-5 h-5" src={assets.person_tick_icon} alt="View Applications" />
              <span>View Applications</span>
            </NavLink>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 sm:p-10 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
