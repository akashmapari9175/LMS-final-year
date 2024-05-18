import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StudentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-indigo-400 text-white text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link
              to="/auth/student-home"
              className="text-white text-xl font-bold"
            >
              Learnify
            </Link>
          </div>

          {/* Navigation links in the center */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <Link to="/auth/student-home" className="nav-link mx-4">
              Home
            </Link>
            <Link to="/profile" className="nav-link mx-4">
              Profile
            </Link>
            <Link to="/student/enrolled-courses" className="nav-link mx-4">
              Enrolled Courses
            </Link>
          </div>

          {/* Logout button on the right (responsive) */}
          <div className="md:flex md:items-center md:ml-4">
            <button
              onClick={handleLogout}
              className="hidden md:block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Logout
            </button>
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-block md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive mobile menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/auth/student-home"
              className="nav-link"
              onClick={toggleNavbar}
            >
              Home
            </Link>
            <Link to="/profile" className="nav-link" onClick={toggleNavbar}>
              Profile
            </Link>
            <Link
              to="/student/enrolled-courses"
              className="nav-link"
              onClick={toggleNavbar}
            >
              Enrolled Courses
            </Link>
            <button
              onClick={handleLogout}
              className="nav-link block w-full text-left mt-1 py-2 px-3 text-red-500 hover:bg-gray-700 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
