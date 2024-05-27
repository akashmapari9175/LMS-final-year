import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:5000/api/course/${courseId}`
        );
        const courseData = courseResponse.data;
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleEnrollClick = () => {
    navigate("/login");
  };

  // Check if lectures and objectives are available
  const lectures = course.lectures || [];
  const objectives = course.objectives || [
    "Understand the basics of React and Tailwind CSS",
    "Build responsive web applications",
    "Apply Tailwind CSS utility classes effectively",
    "Create reusable React components",
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <div
          className="relative bg-cover bg-center h-64"
          style={{ backgroundImage: `url(${course.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute bottom-0 p-4 text-white">
            <h1 className="text-4xl font-bold">{course.title}</h1>
          </div>
        </div>

        <div className="mt-8">
          <span className="text-lg font-semibold mr-2">Description:</span>
          <div
            className="text-gray-700 mb-4 "
            dangerouslySetInnerHTML={{ __html: course.description }}
          ></div>
          <div className="flex items-center mb-4">
            <span className="text-lg font-semibold mr-2">Category:</span>
            <span className="text-lg">{course.category}</span>
          </div>
          <span className="text-lg font-semibold mr-2">Prerequisites:</span>
          <div
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: course.prerequisites }}
          ></div>

          <div className="flex items-center mb-4">
            <span className="text-lg font-semibold mr-2">Duration:</span>
            <span className="text-lg">{course.duration}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-lg font-semibold mr-2">Price:</span>
            <span className="text-lg">Rs.{course.price}</span>
          </div>
          <button
            onClick={handleEnrollClick}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
          >
            Enroll Now
          </button>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <ul className="list-disc pl-5">
              {lectures.map((lecture, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{lecture.title}</span>{" "}
                  {lecture.duration}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Course Objectives</h2>
            <ul className="list-disc pl-5">
              {objectives.map((objective, index) => (
                <li key={index} className="mb-2">
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
