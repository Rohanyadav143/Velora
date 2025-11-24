import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 pl-10 pr-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* About Velora */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block mb-4">
            About Velora
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Velora is a modern platform connecting recruiters and candidates efficiently.
            Manage your applications, discover jobs, and streamline hiring processes in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block mb-4">
            Quick Links
          </h3>
          <ul className="text-gray-300 space-y-2">
            {["Home", "Jobs", "Applied Job", "About Us", "Contact"].map((link, index) => (
              <li key={index} className="hover:text-orange-500 cursor-pointer transition">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block mb-4">
            Contact Us
          </h3>
          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <span>📍</span> Lucknow, Uttar Pradesh, India
          </p>
          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <span>📞</span> +91 98765XXXXX
          </p>
          <p className="text-gray-300 flex items-center gap-2">
            <span>✉️</span> contact@velora.com
          </p>
        </div>

        {/* Follow + Newsletter */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block mb-4">
            Follow & Subscribe
          </h3>

          {/* Social Icons */}
          <div className="flex gap-4 mb-4 text-xl text-gray-300">
            <span className="cursor-pointer hover:text-blue-600">🔵</span>
            <span className="cursor-pointer hover:text-sky-400">🐦</span>
            <span className="cursor-pointer hover:text-pink-500">📸</span>
            <span className="cursor-pointer hover:text-blue-700">🔗</span>
          </div>

          <p className="text-gray-300 mb-2 text-sm">Subscribe to our newsletter</p>

          {/* ✔ PERFECT RESPONSIVE INPUT + BUTTON */}
          <div className="w-full flex flex-col lg:flex-row gap-2">
            <input
              type="email"
              className="w-full p-2 rounded md:rounded-l text-gray-900 outline-none"
              placeholder="Enter your email"
            />
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded text-white transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-400 text-sm mt-10">
        © 2025 Velora — Crafted with ❤️ for better hiring.
      </div>
    </footer>
  );
};

export default Footer;
