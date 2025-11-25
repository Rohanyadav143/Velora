import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-white py-14 px-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* About Velora */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-indigo-500 inline-block pb-1 mb-4">
            About Velora
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Velora is a modern job platform that connects candidates and recruiters with ease.
            Explore opportunities and streamline hiring effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-indigo-500 inline-block pb-1 mb-4">
            Quick Links
          </h3>
          <ul className="text-gray-400 space-y-2">
            {["Home", "Jobs", "Applied Job", "About Us", "Contact"].map((link, index) => (
              <li
                key={index}
                className="hover:text-indigo-400 cursor-pointer transition-all duration-200"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-indigo-500 inline-block pb-1 mb-4">
            Contact Us
          </h3>

          <p className="text-gray-400 mb-2 flex items-center gap-2">
            <span>📍</span> Lucknow, Uttar Pradesh, India
          </p>
          <p className="text-gray-400 mb-2 flex items-center gap-2">
            <span>📞</span> +91 98765XXXXX
          </p>
          <p className="text-gray-400 flex items-center gap-2">
            <span>✉️</span> contact@velora.com
          </p>
        </div>

        {/* Follow & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-indigo-500 inline-block pb-1 mb-4">
            Follow & Subscribe
          </h3>

          <div className="flex gap-5 mb-5 text-2xl text-gray-400">
            <span className="hover:text-blue-500 cursor-pointer transition">🔵</span>
            <span className="hover:text-sky-400 cursor-pointer transition">🐦</span>
            <span className="hover:text-pink-500 cursor-pointer transition">📸</span>
            <span className="hover:text-blue-700 cursor-pointer transition">🔗</span>
          </div>

          <p className="text-gray-400 mb-3 text-sm">Subscribe to our newsletter</p>

          <div className="w-full flex flex-col lg:flex-row gap-2">
            <input
              type="email"
              className="w-full p-2 rounded text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded transition text-white font-medium">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-800 pt-6">
        © 2025 Velora — Crafted with 💙 for better hiring.
      </div>
    </footer>
  );
};

export default Footer;
