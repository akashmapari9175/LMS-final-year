import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import star icon for rating

const CourseSlider = ({ courses, onCourseClick }) => {
  const navigate = useNavigate();

  const handleEnrollClick = async (courseId) => {
    navigate(`/payment/${courseId}`);
  };

  // Create a Set to store unique course IDs
  const uniqueCourseIds = new Set();

  // Filter out duplicate courses and store their IDs in the Set
  const uniqueCourses = courses.filter((course) => {
    if (uniqueCourseIds.has(course._id)) {
      return false; // Skip if the course ID is already in the Set
    } else {
      uniqueCourseIds.add(course._id);
      return true; // Include the course if it's unique
    }
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 ml-8">Featured Courses</h2>
      <Slider {...settings}>
        {/* Render unique courses */}
        {uniqueCourses.map((course) => (
          <div key={course._id} className="p-4">
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ height: "420px" }} // Set a fixed height for the card
            >
              <div className="w-full  h-40 overflow-hidden">
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
                  <FaStar className="text-yellow-500 mr-1" />{" "}
                  {/* Rating Icon */}
                  <span className="text-gray-800 mr-2">{course.rating}</span>
                  <span className="text-gray-600">
                    ({course.students} students)
                  </span>
                </div>
                <p className="text-gray-600 mb-2">Price: ₹{course.price}</p>
                <p className="text-gray-600 mb-2">
                  Duration: {course.duration}
                </p>
                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => onCourseClick(course._id)}
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseSlider;
