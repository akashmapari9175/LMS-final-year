import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri"; // Import hamburger menu icon

const Navbar = ({ onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    onCategorySelect(selectedCategory);
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl font-bold">
                Learnify
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center flex-grow">
            <div className="ml-4 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/aboutus"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                to="/contactus"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </Link>
              <div className="relative">
                <select
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="block appearance-none w-full bg-transparent text-white py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-gray-500"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-gray-800">
                    categories
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-gray-800"
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 8.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu visibility
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <RiMenu4Line className="h-6 w-6" /> {/* Hamburger menu icon */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-gray-800"
          id="mobile-menu"
        >
          <div className="flex flex-col justify-center h-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/aboutus"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About Us
              </Link>
              <Link
                to="/contactus"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
