import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Learnify</h2>
            <p className="text-sm">Providing innovative solutions</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end">
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              About Us
            </a>
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              Services
            </a>
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              Contact Us
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
        <hr className="border-gray-700 my-4" />
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Learnify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
