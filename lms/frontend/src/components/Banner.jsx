import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const handleBannerButtonClick = (e) => {};
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 py-16 px-6 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to Your Learnify
      </h1>
      <p className="text-lg text-white mb-8 opacity-0 animate-fade-in-up">
        Start your learning journey today!
      </p>
      {/* <button
        onClick={handleBannerButtonClick}
        className="bg-white text-blue-500 hover:bg-blue-400 text-lg font-semibold px-8 py-3 rounded-full shadow-md transition duration-300 transform hover:scale-105"
      >
        Explore Courses
      </button> */}

      <a href="#featured-courses">
        <button className="bg-white text-blue-500 hover:bg-blue-400 text-lg font-semibold px-8 py-3 rounded-full shadow-md transition duration-300 transform hover:scale-105">
          Explore Courses
        </button>
      </a>
    </div>
  );
};

export default Banner;
