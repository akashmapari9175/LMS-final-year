// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";
// // import InstructorNavbar from "../../components/InstructorNavbar";

// // const Course_Details = () => {
// //   const { courseId } = useParams(); // Extract courseId from URL params
// //   const [lectures, setLectures] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchLectures = async () => {
// //       try {
// //         if (!courseId) {
// //           setError("Invalid courseId provided");
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await axios.get(
// //           `http://localhost:5000/course-details/${courseId}`
// //         );

// //         if (response.data.lectures && response.data.lectures.length > 0) {
// //           setLectures(response.data.lectures);
// //           setLoading(false);
// //           setError("");
// //         } else {
// //           setLectures([]);
// //           setLoading(false);
// //           setError("No lectures found for this course");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching lectures:", error.message);
// //         setLoading(false);
// //         setError("Failed to fetch lectures. Please try again.");
// //       }
// //     };

// //     fetchLectures();
// //   }, [courseId]);

// //   return (
// //     <>
// //       <InstructorNavbar></InstructorNavbar>
// //       <div className="container mx-auto py-8">
// //         <h2 className="text-2xl font-bold mb-4 ml-4">Course Details</h2>

// //         {loading ? (
// //           <p className="text-gray-600">Loading...</p>
// //         ) : error ? (
// //           <p className="text-red-600">{error}</p>
// //         ) : lectures.length > 0 ? (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {lectures.map((lecture) => (
// //               <div
// //                 key={lecture._id}
// //                 className="bg-white rounded-lg shadow-md p-4"
// //               >
// //                 <h3 className="text-lg font-bold mb-2">{lecture.title}</h3>
// //                 <p className="text-gray-700 mb-4">{lecture.description}</p>
// //                 <div className="aspect-w-16 aspect-h-9">
// //                   <video className="w-full h-full object-cover" controls>
// //                     <source src={lecture.videoUrl} type="video/mp4" />
// //                     Your browser does not support the video tag.
// //                   </video>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-600">
// //             No lectures added for this course yet.
// //           </p>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Course_Details;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import InstructorNavbar from "../../components/InstructorNavbar";

// const Course_Details = () => {
//   const { courseId } = useParams(); // Extract courseId from URL params
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
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {lectures.map((lecture) => (
//                 <div
//                   key={lecture._id}
//                   className="bg-white rounded-lg shadow-md p-4"
//                 >
//                   <h3 className="text-lg font-bold mb-2">{lecture.title}</h3>
//                   {/* <p className="text-gray-700 text-justify mb-4">
//                     {lecture.description}
//                   </p> */}

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
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        if (!courseId) {
          setError("Invalid courseId provided");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/course-details/${courseId}`
        );

        if (response.data.lectures && response.data.lectures.length > 0) {
          setLectures(response.data.lectures);
          setLoading(false);
          setError("");
        } else {
          setLectures([]);
          setLoading(false);
          setError("No lectures found for this course");
        }
      } catch (error) {
        console.error("Error fetching lectures:", error.message);
        setLoading(false);
        setError("Failed to fetch lectures. Please try again.");
      }
    };

    fetchLectures();
  }, [courseId]);

  const toggleDescription = (lectureId) => {
    const updatedLectures = lectures.map((lecture) => {
      if (lecture._id === lectureId) {
        return { ...lecture, expanded: !lecture.expanded };
      }
      return lecture;
    });
    setLectures(updatedLectures);
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
        ) : lectures.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold mb-2 ml-4">
              Lectures Added: {lectures.length}
            </h3>
            <div className="grid grid-cols-1 text-justify md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <h3 className="text-lg font-bold mb-2">{lecture.title}</h3>
                  <p
                    className={`text-gray-700 mb-4 ${
                      lecture.expanded
                        ? "block"
                        : "line-clamp-5 overflow-hidden"
                    }`}
                  >
                    {lecture.description}
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
