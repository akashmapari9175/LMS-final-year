import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || token === "") {
      navigate("/login");
      return;
    }

    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/enrolled-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        // Optionally handle error or show a message to the user
      }
    };

    fetchEnrolledCourses();
  }, [token, navigate]);

  const handleCourseClick = (courseId) => {
    navigate(`/student/course-details/${courseId}`);
  };

  return (
    <>
      <StudentNavbar></StudentNavbar>
      <div className="container mx-auto py-8" id="enrolled-courses">
        <h2 className="text-2xl font-bold mb-4 ml-6">Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mt-4">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
                <p className="text-gray-600">Price: ₹{course.price}</p>
                <p className="text-gray-600">Duration: {course.duration}</p>

                <button
                  onClick={() => handleCourseClick(course._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 mr-2 mt-2"
                >
                  View Course
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              You have not enrolled in any courses yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrolledCourses;
