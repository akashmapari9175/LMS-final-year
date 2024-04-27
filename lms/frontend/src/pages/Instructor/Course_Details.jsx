// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import InstructorNavbar from "../../components/InstructorNavbar";

// const Course_Details = () => {
//   const { courseId } = useParams();
//   const [lectures, setLectures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLectures = async () => {
//       try {
//         if (!courseId) {
//           setError("Invalid courseId provided");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:5000/course-details/${courseId}`
//         );

//         if (response.data.lectures && response.data.lectures.length > 0) {
//           setLectures(response.data.lectures);
//           setLoading(false);
//           setError("");
//         } else {
//           setLectures([]);
//           setLoading(false);
//           setError("No lectures found for this course");
//         }
//       } catch (error) {
//         console.error("Error fetching lectures:", error.message);
//         setLoading(false);
//         setError("Failed to fetch lectures. Please try again.");
//       }
//     };

//     fetchLectures();
//   }, [courseId]);

//   const toggleDescription = (lectureId) => {
//     const updatedLectures = lectures.map((lecture) => {
//       if (lecture._id === lectureId) {
//         return { ...lecture, expanded: !lecture.expanded };
//       }
//       return lecture;
//     });
//     setLectures(updatedLectures);
//   };

//   return (
//     <>
//       <InstructorNavbar />
//       <div className="container mx-auto py-8">
//         <h2 className="text-2xl font-bold mb-4 ml-4">Course Details</h2>

//         {loading ? (
//           <p className="text-gray-600">Loading...</p>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
//         ) : lectures.length > 0 ? (
//           <div>
//             <h3 className="text-xl font-bold mb-2 ml-4">
//               Lectures Added: {lectures.length}
//             </h3>
//             <div className="grid grid-cols-1 text-justify md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {lectures.map((lecture) => (
//                 <div
//                   key={lecture._id}
//                   className="bg-white rounded-lg shadow-md p-4"
//                 >
//                   <h3 className="text-lg font-bold mb-2">{lecture.title}</h3>
//                   <p
//                     className={`text-gray-700 mb-4 ${
//                       lecture.expanded
//                         ? "block"
//                         : "line-clamp-5 overflow-hidden"
//                     }`}
//                   >
//                     {lecture.description}
//                   </p>
//                   <button
//                     className="text-blue-500 hover:underline"
//                     onClick={() => toggleDescription(lecture._id)}
//                   >
//                     {lecture.expanded ? "Read less..." : "Read more..."}
//                   </button>
//                   <div className="aspect-w-16 aspect-h-9">
//                     <video className="w-full h-full object-cover" controls>
//                       <source src={lecture.videoUrl} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-600">
//             No lectures added for this course yet.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Course_Details;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import InstructorNavbar from "../../components/InstructorNavbar";

const Course_Details = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const toggleDescription = (lectureId) => {
    const updatedSections = sections.map((section) => {
      const updatedLectures = section.lectures.map((lecture) => {
        if (lecture._id === lectureId) {
          return { ...lecture, expanded: !lecture.expanded };
        }
        return lecture;
      });
      return { ...section, lectures: updatedLectures };
    });
    setSections(updatedSections);
  };

  return (
    <>
      <InstructorNavbar />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 ml-4">Course Details</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : sections.length > 0 ? (
          <div>
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold  ml-4">
                  Section Name: {section.name} ({section.lectures.length}{" "}
                  Lectures)
                </h3>
                <div className="grid grid-cols-1 text-justify md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.lectures.map((lecture) => (
                    <div
                      key={lecture._id}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <h3 className="text-lg font-bold mb-2">
                        Lecture Topic: {lecture.title}
                      </h3>
                      <p
                        className={`text-gray-700 mb-4 ${
                          lecture.expanded
                            ? "block"
                            : "line-clamp-5 overflow-hidden"
                        }`}
                      >
                        Description: {lecture.description}
                      </p>
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => toggleDescription(lecture._id)}
                      >
                        {lecture.expanded ? "Read less..." : "Read more..."}
                      </button>
                      <div className="aspect-w-16 aspect-h-9">
                        <video className="w-full h-full object-cover" controls>
                          <source src={lecture.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No lectures added for this course yet.
          </p>
        )}
      </div>
    </>
  );
};

export default Course_Details;
