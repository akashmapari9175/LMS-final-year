// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import StudentNavbar from "../../components/StudentNavbar";
// import Loader from "../../components/Loader";
// import { RxCross2 } from "react-icons/rx";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { FaCheckDouble } from "react-icons/fa";

// const Course_Details = () => {
//   const { courseId } = useParams();
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedLecture, setSelectedLecture] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [showCertificate, setShowCertificate] = useState(false);

//   useEffect(() => {
//     if (progress === 100) {
//       setShowCertificate(true);
//     }
//   }, [progress]);

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         if (!courseId) {
//           setError("Invalid courseId provided");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:5000/student/course-details/${courseId}`
//         );

//         if (response.data.sections && response.data.sections.length > 0) {
//           setSections(response.data.sections);
//           setLoading(false);
//           setError("");
//           calculateProgress(response.data.sections);
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

//   const handleLectureClick = (lecture) => {
//     setSelectedLecture(lecture);
//   };

//   const handleClosePopup = async () => {
//     try {
//       await axios.post("http://localhost:5000/update-progress", {
//         courseId: courseId,
//         progress: progress + 1,
//       });
//       setProgress(progress + 1);
//     } catch (error) {
//       console.error("Error updating progress:", error.message);
//     }

//     setSelectedLecture(null);
//   };

//   // const markLectureAsWatched = (lectureId) => {
//   //   localStorage.setItem(`${lectureId}-watched`, "true");
//   //   calculateProgress(sections);
//   // };

//   const markLectureAsWatched = (lectureId) => {
//     const userId = getUserId(); // Replace this with your function to get the user ID
//     const userProgress = JSON.parse(localStorage.getItem(userId)) || {}; // Retrieve user's progress from localStorage or initialize an empty object
//     userProgress[lectureId] = true; // Mark the lecture as watched for the user
//     localStorage.setItem(userId, JSON.stringify(userProgress)); // Save updated user progress to localStorage
//     calculateProgress(sections);
//   };

//   const calculateProgress = (sections) => {
//     let totalLectures = 0;
//     let watchedLectures = 0;

//     sections.forEach((section) => {
//       totalLectures += section.lectures.length;
//       section.lectures.forEach((lecture) => {
//         if (localStorage.getItem(`${lecture._id}-watched`) === "true") {
//           watchedLectures++;
//         }
//       });
//     });

//     const newProgress =
//       totalLectures === 0 ? 0 : (watchedLectures / totalLectures) * 100;
//     setProgress(newProgress);
//   };

//   return (
//     <>
//       <StudentNavbar />
//       <div className="flex">
//         <div className="container mx-auto py-8">
//           <h2 className="text-2xl font-bold mb-4 ml-4">Course Details</h2>
//           <div className="flex items-center justify-center">
//             <div style={{ width: 200, height: 200, color: "green" }}>
//               <CircularProgressbar
//                 className="custom-progress-bar" // Apply a custom class name
//                 value={progress}
//                 text={`${progress.toFixed(2)}%`}
//               />
//             </div>
//           </div>

//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : sections.length > 0 ? (
//             <div>
//               {sections.map((section, index) => (
//                 <div key={index}>
//                   <h3 className="text-xl font-bold ml-4">
//                     Section Name: {section.name} ({section.lectures.length}{" "}
//                     Lectures)
//                   </h3>
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           style={{ width: "10%" }}
//                         >
//                           Index
//                         </th>
//                         <th
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           style={{ width: "30%" }}
//                         >
//                           Lecture Topic
//                         </th>
//                         <th
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           style={{ width: "60%" }}
//                         >
//                           Description
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {section.lectures.map((lecture, lectureIndex) => (
//                         <tr
//                           key={lecture._id}
//                           onClick={() => handleLectureClick(lecture)}
//                           className="cursor-pointer hover:bg-gray-50"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {index + 1}.{lectureIndex + 1}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {lecture.title}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {lecture.description}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {localStorage.getItem(`${lecture._id}-watched`) ===
//                             "true" ? (
//                               <FaCheckDouble style={{ color: "green" }} />
//                             ) : (
//                               <button
//                                 className="text-blue-500 hover:text-blue-700"
//                                 onClick={() =>
//                                   markLectureAsWatched(lecture._id)
//                                 }
//                               >
//                                 Mark as Watched
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600">
//               No lectures added for this course yet.
//             </p>
//           )}

//           {progress === 100 && (
//             <div className="bg-white rounded-lg shadow-md p-4">
//               {/* Certificate content */}
//               <h2>Certificate of Completion</h2>
//               <p>
//                 Congratulations! You have completed all lectures in this course.
//               </p>
//               {/* Add student name and completion date here */}
//             </div>
//           )}
//         </div>
//       </div>
//       {/* </div> */}

//       {selectedLecture && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h3 className="text-lg font-bold mb-2">
//               Lecture Topic: {selectedLecture.title}
//             </h3>
//             <video
//               className="w-[80vw] h-[500px] object-cover"
//               controls
//               src={selectedLecture.videoUrl}
//             />
//             <button
//               className="absolute top-0 right-0 p-2 m-2 text-white bg-red-500  hover:bg-red-600"
//               onClick={handleClosePopup}
//             >
//               <RxCross2 />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Course_Details;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";
// // import StudentNavbar from "../../components/StudentNavbar";
// // import Loader from "../../components/Loader";
// // import { RxCross2 } from "react-icons/rx";
// // import { CircularProgressbar } from "react-circular-progressbar";
// // import "react-circular-progressbar/dist/styles.css";
// // import { FaCheckDouble } from "react-icons/fa";

// // const Course_Details = () => {
// //   const { courseId } = useParams();
// //   const [sections, setSections] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [selectedLecture, setSelectedLecture] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const [showCertificate, setShowCertificate] = useState(false);

// //   useEffect(() => {
// //     if (progress === 100) {
// //       setShowCertificate(true);
// //     }
// //   }, [progress]);

// //   useEffect(() => {
// //     const fetchCourseDetails = async () => {
// //       try {
// //         if (!courseId) {
// //           setError("Invalid courseId provided");
// //           setLoading(false);
// //           return;
// //         }

// //         // Get authentication token from localStorage
// //         const token = localStorage.getItem("authToken");

// //         const response = await axios.get(
// //           `http://localhost:5000/student/course-details/${courseId}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         if (response.data.sections && response.data.sections.length > 0) {
// //           setSections(response.data.sections);
// //           setLoading(false);
// //           setError("");
// //           calculateProgress(response.data.sections);
// //         } else {
// //           setSections([]);
// //           setLoading(false);
// //           setError("No lectures found for this course");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching course details:", error.message);
// //         setLoading(false);
// //         setError("Failed to fetch course details. Please try again.");
// //       }
// //     };

// //     fetchCourseDetails();
// //   }, [courseId]);

// //   const handleLectureClick = (lecture) => {
// //     setSelectedLecture(lecture);
// //   };

// //   const handleClosePopup = async () => {
// //     try {
// //       const token = localStorage.getItem("authToken");

// //       await axios.post(
// //         "http://localhost:5000/update-progress",
// //         {
// //           courseId: courseId,
// //           lectureId: selectedLecture._id,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       calculateProgress(sections);
// //     } catch (error) {
// //       console.error("Error updating progress:", error.message);
// //     }

// //     setSelectedLecture(null);
// //   };

// //   const markLectureAsWatched = async (lectureId) => {
// //     try {
// //       const token = localStorage.getItem("authToken");

// //       await axios.post(
// //         "http://localhost:5000/update-progress",
// //         {
// //           courseId: courseId,
// //           lectureId: lectureId,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       calculateProgress(sections);
// //     } catch (error) {
// //       console.error("Error updating progress:", error.message);
// //     }
// //   };

// //   const calculateProgress = (sections) => {
// //     let totalLectures = 0;
// //     let watchedLectures = 0;

// //     sections.forEach((section) => {
// //       totalLectures += section.lectures.length;
// //       section.lectures.forEach((lecture) => {
// //         if (lecture.isWatched) {
// //           watchedLectures++;
// //         }
// //       });
// //     });

// //     const newProgress =
// //       totalLectures === 0 ? 0 : (watchedLectures / totalLectures) * 100;
// //     setProgress(newProgress);
// //   };

// //   return (
// //     <>
// //       <StudentNavbar />
// //       <div className="flex">
// //         <div className="container mx-auto py-8">
// //           <h2 className="text-2xl font-bold mb-4 ml-4">Course Details</h2>
// //           <div className="flex items-center justify-center">
// //             <div style={{ width: 200, height: 200, color: "green" }}>
// //               <CircularProgressbar
// //                 className="custom-progress-bar"
// //                 value={progress}
// //                 text={`${progress.toFixed(2)}%`}
// //               />
// //             </div>
// //           </div>

// //           {loading ? (
// //             <Loader />
// //           ) : error ? (
// //             <p className="text-red-600">{error}</p>
// //           ) : sections.length > 0 ? (
// //             <div>
// //               {sections.map((section, index) => (
// //                 <div key={index}>
// //                   <h3 className="text-xl font-bold ml-4">
// //                     Section Name: {section.name} ({section.lectures.length}{" "}
// //                     Lectures)
// //                   </h3>
// //                   <table className="min-w-full divide-y divide-gray-200">
// //                     <thead className="bg-gray-50">
// //                       <tr>
// //                         <th
// //                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
// //                           style={{ width: "10%" }}
// //                         >
// //                           Index
// //                         </th>
// //                         <th
// //                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
// //                           style={{ width: "30%" }}
// //                         >
// //                           Lecture Topic
// //                         </th>
// //                         <th
// //                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
// //                           style={{ width: "60%" }}
// //                         >
// //                           Description
// //                         </th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {section.lectures.map((lecture, lectureIndex) => (
// //                         <tr
// //                           key={lecture._id}
// //                           onClick={() => handleLectureClick(lecture)}
// //                           className="cursor-pointer hover:bg-gray-50"
// //                         >
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="text-sm text-gray-900">
// //                               {index + 1}.{lectureIndex + 1}
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="text-sm text-gray-900">
// //                               {lecture.title}
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="text-sm text-gray-900">
// //                               {lecture.description}
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             {lecture.isWatched ? (
// //                               <FaCheckDouble style={{ color: "green" }} />
// //                             ) : (
// //                               <button
// //                                 className="text-blue-500 hover:text-blue-700"
// //                                 onClick={() =>
// //                                   markLectureAsWatched(lecture._id)
// //                                 }
// //                               >
// //                                 Mark Mark as Watched
// //                               </button>
// //                             )}
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p className="text-gray-600">
// //               No lectures added for this course yet.
// //             </p>
// //           )}

// //           {progress === 100 && (
// //             <div className="bg-white rounded-lg shadow-md p-4">
// //               <h2>Certificate of Completion</h2>
// //               <p>
// //                 Congratulations! You have completed all lectures in this course.
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {selectedLecture && (
// //         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
// //           <div className="bg-white rounded-lg shadow-md p-4">
// //             <h3 className="text-lg font-bold mb-2">
// //               Lecture Topic: {selectedLecture.title}
// //             </h3>
// //             <video
// //               className="w-[80vw] h-[500px] object-cover"
// //               controls
// //               src={selectedLecture.videoUrl}
// //             />
// //             <button
// //               className="absolute top-0 right-0 p-2 m-2 text-white bg-red-500  hover:bg-red-600"
// //               onClick={handleClosePopup}
// //             >
// //               <RxCross2 />
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Course_Details;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import Loader from "../../components/Loader";
import { RxCross2 } from "react-icons/rx";
import { FaCheckDouble } from "react-icons/fa";

const Course_Details = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
          `http://localhost:5000/student/course-details/${courseId}`
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

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleClosePopup = async () => {
    setSelectedLecture(null);
  };

  const markLectureAsWatched = (lectureId) => {
    // Logic to mark lecture as watched
  };

  return (
    <>
      <StudentNavbar />
      <div className="flex">
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
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{ width: "10%" }}
                        >
                          Index
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{ width: "30%" }}
                        >
                          Lecture Topic
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          style={{ width: "60%" }}
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {section.lectures.map((lecture, lectureIndex) => (
                        <tr
                          key={lecture._id}
                          onClick={() => handleLectureClick(lecture)}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {index + 1}.{lectureIndex + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lecture.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lecture.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {localStorage.getItem(`${lecture._id}-watched`) ===
                            "true" ? (
                              <FaCheckDouble style={{ color: "green" }} />
                            ) : (
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() =>
                                  markLectureAsWatched(lecture._id)
                                }
                              >
                                Mark as Watched
                              </button>
                            )}
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

          {selectedLecture && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-bold mb-2">
                  Lecture Topic: {selectedLecture.title}
                </h3>
                <video
                  className="w-[80vw] h-[500px] object-cover"
                  controls
                  src={selectedLecture.videoUrl}
                />
                <button
                  className="absolute top-0 right-0 p-2 m-2 text-white bg-red-500  hover:bg-red-600"
                  onClick={handleClosePopup}
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Course_Details;
