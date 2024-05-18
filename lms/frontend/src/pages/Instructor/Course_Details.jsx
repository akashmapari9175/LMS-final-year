// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import InstructorNavbar from "../../components/InstructorNavbar";
// import Toaster from "../../components/Toaster"; // Import your toaster component
// import Loader from "../../components/Loader";

// const Course_Details = () => {
//   const { courseId } = useParams();
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [toast, setToast] = useState(null); // State for toaster message

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         if (!courseId) {
//           setError("Invalid courseId provided");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:5000/course-details/${courseId}`
//         );

//         if (response.data.sections && response.data.sections.length > 0) {
//           setSections(response.data.sections);
//           setLoading(false);
//           setError("");
//         } else {
//           setSections([]);
//           setLoading(false);
//           setError("No lectures found for this course");
//         }
//       } catch (error) {
//         console.error("Error fetching course details:", error.message);
//         setLoading(false);
//         setError("Failed to fetch course details. Please try again.");
//       }
//     };

//     fetchCourseDetails();
//   }, [courseId]);

//   const toggleDescription = (lectureId) => {
//     const updatedSections = sections.map((section) => {
//       const updatedLectures = section.lectures.map((lecture) => {
//         if (lecture._id === lectureId) {
//           return { ...lecture, expanded: !lecture.expanded };
//         }
//         return lecture;
//       });
//       return { ...section, lectures: updatedLectures };
//     });
//     setSections(updatedSections);
//   };

//   const handleDeleteLecture = async (lectureId) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/course-details/${lectureId}`
//       );

//       // Assuming the lecture is deleted successfully, update the UI
//       const updatedSections = sections.map((section) => {
//         const updatedLectures = section.lectures.filter(
//           (lecture) => lecture._id !== lectureId
//         );
//         return { ...section, lectures: updatedLectures };
//       });
//       setSections(updatedSections);

//       // Show a success message using the toaster component
//       setToast({ message: response.data.message, type: "success" });
//     } catch (error) {
//       console.error("Error deleting lecture:", error.message);
//       // Show an error message using the toaster component
//       setToast({
//         message: "Failed to delete lecture. Please try again.",
//         type: "error",
//       });
//     }
//   };

//   return (
//     <>
//       <InstructorNavbar />
//       <div className="container mx-auto py-8">
//         <h2 className="text-2xl font-bold mb-4 ml-4">Course Details</h2>

//         {loading ? (
//           <Loader />
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
//         ) : sections.length > 0 ? (
//           <div>
//             {sections.map((section, index) => (
//               <div key={index}>
//                 <h3 className="text-xl font-bold  ml-4">
//                   {section.name} ({section.lectures.length} Lectures)
//                 </h3>
//                 <div className="grid grid-cols-1 text-justify md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {section.lectures.map((lecture) => (
//                     <div
//                       key={lecture._id}
//                       className="bg-white rounded-lg shadow-md p-4"
//                     >
//                       <h3 className="text-lg font-bold mb-2">
//                         Topic: {lecture.title}
//                       </h3>
//                       <p
//                         className={`text-gray-700 mb-4 ${
//                           lecture.expanded
//                             ? "block"
//                             : "line-clamp-5 overflow-hidden"
//                         }`}
//                       >
//                         Description: {lecture.description}
//                       </p>
//                       <button
//                         className="text-blue-500 hover:underline"
//                         onClick={() => toggleDescription(lecture._id)}
//                       >
//                         {lecture.expanded ? "Read less..." : "Read more..."}
//                       </button>
//                       <div className="aspect-w-16 aspect-h-9">
//                         <video className="w-full h-full object-cover" controls>
//                           <source src={lecture.videoUrl} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                       </div>
//                       <button
//                         className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
//                         onClick={() =>
//                           window.confirm(
//                             "Are you sure you want to delete this lecture?"
//                           ) && handleDeleteLecture(lecture._id)
//                         }
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">
//             No lectures added for this course yet.
//           </p>
//         )}
//       </div>
//       {toast && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </>
//   );
// };

// export default Course_Details;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import InstructorNavbar from "../../components/InstructorNavbar";
import Toaster from "../../components/Toaster";
import Loader from "../../components/Loader";

const Course_Details = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        if (!courseId) {
          setError("Invalid courseId provided");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/course-details/${courseId}`
        );

        if (response.data.sections && response.data.sections.length > 0) {
          setSections(response.data.sections);
          setLoading(false);
          setError("");
        } else {
          setSections([]);
          setLoading(false);
          setError("No lectures found for this course");
        }
      } catch (error) {
        console.error("Error fetching course details:", error.message);
        setLoading(false);
        setError("Failed to fetch course details. Please try again.");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleDeleteLecture = async (lectureId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/course-details/${lectureId}`
      );

      const updatedSections = sections.map((section) => {
        const updatedLectures = section.lectures.filter(
          (lecture) => lecture._id !== lectureId
        );
        return { ...section, lectures: updatedLectures };
      });
      setSections(updatedSections);

      setToast({ message: response.data.message, type: "success" });
    } catch (error) {
      console.error("Error deleting lecture:", error.message);
      setToast({
        message: "Failed to delete lecture. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <>
      <InstructorNavbar />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 ml-4">Course Details</h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : sections.length > 0 ? (
          <div>
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold ml-4">
                  Section Name: {section.name} ({section.lectures.length}{" "}
                  Lectures)
                </h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Index
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lecture Topic
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {section.lectures.map((lecture, lectureIndex) => (
                      <tr
                        key={lecture._id}
                        onClick={() => setSelectedLecture(lecture)}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}.{lectureIndex + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lecture.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lecture.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="ml-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this lecture?"
                                )
                              ) {
                                handleDeleteLecture(lecture._id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No lectures added for this course yet.
          </p>
        )}
      </div>
      {selectedLecture && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center
          "
          onClick={() => setSelectedLecture(null)}
        >
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-2">
              Lecture Topic: {selectedLecture.title}
            </h3>
            <video
              className="w-[80vw] h-[500px] object-cover"
              controls
              src={selectedLecture.videoUrl}
            />
          </div>
        </div>
      )}
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Course_Details;
