import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Razorpay from "razorpay";

const FeaturedCourses = ({ courses, onCourseClick }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [visibleCourses, setVisibleCourses] = useState(6);

  const handleEnrollClick = async (course) => {
    if (!token || token === "") {
      navigate("/login");
      return;
    }

    const options = {
      key: "rzp_test_MwBYvXJj2YnCla",
      amount: course.price * 100,
      currency: "INR",
      name: "Learnify",
      description: course.title,
      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);

        const courseId = course._id;

        axios
          .post(
            "http://localhost:5000/api/enroll", // Ensure this matches your backend URL
            { courseId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            const data = res.data;
            if (data.message === "Enrollment successful") {
              navigate(`/student/enrolled-courses`);
            } else {
              console.error("Enrollment failed:", data.message);
            }
          })
          .catch((error) => {
            console.error("Error enrolling:", error);
          });
      },
      prefill: {
        name: "Pranav Malwad",
        email: "malwadpranav@gmail.com",
        contact: "8830943122",
      },
      theme: {
        color: "#3c83f6",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      alert("Payment Failed!");
      console.log(response.error);
    });

    rzp.open();
  };

  const handleLoadMore = () => {
    setVisibleCourses((prevVisibleCourses) => prevVisibleCourses + 6);
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
            style={{ height: "420px" }}
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
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-800 mr-2">{course.rating}</span>
                <span className="text-gray-600">
                  ({course.students} students)
                </span>
              </div>
              <p className="text-gray-600 mb-2">Price: ₹{course.price}</p>
              <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => onCourseClick(course._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 mr-2"
                >
                  View Course
                </button>

                <button
                  onClick={() => handleEnrollClick(course)}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Enroll Now
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
