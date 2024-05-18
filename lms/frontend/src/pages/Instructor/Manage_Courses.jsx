// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import InstructorNavbar from "../../components/InstructorNavbar";
// import { useNavigate } from "react-router-dom";

// const ManageCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const response = await axios.get(
//           "http://localhost:5000/manage-courses",
//           config
//         );
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleAddLecture = (courseId) => {
//     navigate(`/add-lecture/${courseId}`);
//   };

//   const handleDeleteCourse = async (courseId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const confirmed = window.confirm(
//         "Are you sure you want to delete this course?"
//       );

//       if (confirmed) {
//         await axios.delete(
//           `http://localhost:5000/manage-courses/${courseId}`,
//           config
//         );

//         setCourses((prevCourses) =>
//           prevCourses.filter((course) => course._id !== courseId)
//         );

//         alert("Course deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting course:", error);
//     }
//   };

//   const handleViewCourseDetails = (courseId) => {
//     navigate(`/course-details/${courseId}`);
//     console.log(courseId);
//   };

//   return (
//     <>
//       <InstructorNavbar />
//       <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="bg-gray-100 rounded-lg p-4"
//             style={{ cursor: "pointer" }}
//           >
//             <div>
//               <img
//                 src={course.imageUrl}
//                 alt="course thumbnail"
//                 className="mb-4 rounded-lg"
//                 style={{ maxWidth: "100%", height: "auto" }}
//               />
//               <h2 className="text-xl font-bold mb-2">{course.title}</h2>
//               {/* <p className="text-gray-700 mb-2">{course.description}</p> */}

//               <p className="text-gray-700 mb-2">Category: {course.category}</p>
//               <p className="text-gray-700 mb-2">Duration: {course.duration}</p>
//               <p className="text-gray-700 mb-2">Price: ${course.price}</p>
//             </div>
//             <div className="flex space-x-2 mt-4">
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
//                 onClick={() => handleAddLecture(course._id)}
//               >
//                 Add Lectures
//               </button>
//               <button
//                 onClick={() => handleDeleteCourse(course._id)}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
//               >
//                 Delete Course
//               </button>
//               <button
//                 onClick={() => handleViewCourseDetails(course._id)}
//                 className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300"
//               >
//                 Course Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ManageCourses;
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
  };

  const handleEditCourse = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  return (
    <>
      <InstructorNavbar />
      <div className="container mx-auto p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 whitespace-nowrap">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">₹{course.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md transition duration-300 mr-2"
                    onClick={() => handleAddLecture(course._id)}
                  >
                    Add Lectures
                  </button>
                  <button
                    onClick={() => handleEditCourse(course._id)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md transition duration-300 mr-2"
                  >
                    Edit Course
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md transition duration-300 mr-2"
                  >
                    Delete Course
                  </button>
                  <button
                    onClick={() => handleViewCourseDetails(course._id)}
                    className="bg-teal-700 hover:bg-teal-600 text-white py-2 px-3 rounded-md transition duration-300"
                  >
                    Course Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageCourses;
