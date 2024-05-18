import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import star icon for rating

const FeaturedCourses = ({ courses, onCourseClick }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [visibleCourses, setVisibleCourses] = useState(6); // Number of courses to display initially

  const handleEnrollClick = async (courseId) => {
    navigate(`/payment/${courseId}`);
  };

  const handleLoadMore = () => {
    setVisibleCourses((prevVisibleCourses) => prevVisibleCourses + 6); // Load 6 more courses
  };

  return (
    <div className="container mx-auto py-8" id="featured-courses">
      <h2 className="text-2xl font-bold mb-4 ml-8">Recently Added</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 p-8 lg:grid-cols-3 gap-8">
        {courses.slice(0, visibleCourses).map((course) => (
          <motion.div
            key={course._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ height: "420px" }} // Set a fixed height for the card
          >
            <div className="w-full h-40 overflow-hidden">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-lg font-bold mb-2 truncate-2-lines">
                {course.title}
              </h3>
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-1" /> {/* Rating Icon */}
                <span className="text-gray-800 mr-2">{course.rating}</span>
                <span className="text-gray-600">
                  ({course.students} students)
                </span>
              </div>
              <p className="text-gray-600 mb-2">Price: ₹{course.price}</p>
              <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => {
                    onCourseClick(course._id);
                    {
                      !token ? navigate("/login") : console.log("hello world");
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  View Course
                </button>
                <button
                  onClick={() => handleEnrollClick(course._id)}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Enroll
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {visibleCourses < courses.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className=" text-black border-2 py-2 px-4 rounded-md transition duration-300"
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCourses;
