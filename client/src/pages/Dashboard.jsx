import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setShowRecruiterLogin } = useContext(AppContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // If companyData is not available, show login prompt
  if (!companyData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 gap-4">
        <p className="text-xl font-semibold">Please Login...</p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowRecruiterLogin(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Recruiter Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  // Function to logout for company
  const logout = () => {
    localStorage.removeItem("companyToken"); // remove token
    setShowRecruiterLogin(false); // close modal if open
    navigate("/"); // redirect to home page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="shadow py-4 bg-white">
        <div className="px-6 2xl:px-20 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="max-sm:w-32 cursor-pointer w-24 rounded"
            src={assets.logo}
            alt="Logo"
          />

          {companyData && (
            <div className="flex items-center gap-4 relative">
              <p className="max-sm:hidden text-gray-700 font-medium">
                Welcome, {companyData.name}
              </p>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <img
                  className="w-10 h-10 border rounded-full cursor-pointer"
                  src={companyData.image}
                  alt="Profile"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                {dropdownOpen && (
                  <div className="absolute top-12 right-0 w-32 bg-white border rounded shadow-lg z-50">
                    <ul className="text-sm">
                      <li
                        onClick={logout}
                        className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="min-h-screen w-64 bg-white border-r shadow-sm hidden sm:block">
          <ul className="flex flex-col pt-6">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 gap-3 text-gray-700 hover:bg-blue-50 rounded-l-md transition ${
                  isActive
                    ? "bg-blue-100 border-l-4 border-blue-500 font-semibold"
                    : ""
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
                  isActive
                    ? "bg-blue-100 border-l-4 border-blue-500 font-semibold"
                    : ""
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img
                className="w-5 h-5"
                src={assets.home_icon}
                alt="Manage Jobs"
              />
              <span>Manage Jobs</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 gap-3 text-gray-700 hover:bg-blue-50 rounded-l-md transition ${
                  isActive
                    ? "bg-blue-100 border-l-4 border-blue-500 font-semibold"
                    : ""
                }`
              }
              to="/dashboard/view-applications"
            >
              <img
                className="w-5 h-5"
                src={assets.person_tick_icon}
                alt="View Applications"
              />
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
