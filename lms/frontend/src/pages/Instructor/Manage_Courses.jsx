import React, { useState, useEffect } from "react";
import axios from "axios";
import InstructorNavbar from "../../components/InstructorNavbar";
import { useNavigate } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/manage-courses",
          config
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddLecture = (courseId) => {
    navigate(`/add-lecture/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const confirmed = window.confirm(
        "Are you sure you want to delete this course?"
      );

      if (confirmed) {
        await axios.delete(
          `http://localhost:5000/manage-courses/${courseId}`,
          config
        );

        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );

        alert("Course deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleViewCourseDetails = (courseId) => {
    navigate(`/course-details/${courseId}`);
    console.log(courseId);
  };

  return (
    <>
      <InstructorNavbar />
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-gray-100 rounded-lg p-4"
            style={{ cursor: "pointer" }}
          >
            <div>
              <img
                src={course.imageUrl}
                alt="course thumbnail"
                className="mb-4 rounded-lg"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              {/* <p className="text-gray-700 mb-2">{course.description}</p> */}

              <p className="text-gray-700 mb-2">Category: {course.category}</p>
              <p className="text-gray-700 mb-2">Duration: {course.duration}</p>
              <p className="text-gray-700 mb-2">Price: ${course.price}</p>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
                onClick={() => handleAddLecture(course._id)}
              >
                Add Lectures
              </button>
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Delete Course
              </button>
              <button
                onClick={() => handleViewCourseDetails(course._id)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Course Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageCourses;
