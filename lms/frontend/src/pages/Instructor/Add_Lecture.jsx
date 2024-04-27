// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import InstructorNavbar from "../../components/InstructorNavbar";

// const AddLecture = () => {
//   const { courseId } = useParams(); // Retrieve courseId from URL params

//   const [lectureData, setLectureData] = useState({
//     title: "",
//     description: "",
//     videoUrl: "",
//     courseId: courseId, // Set courseId from URL params
//   });

//   const token = localStorage.getItem("token");
//   const [videoFile, setVideoFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLectureData({ ...lectureData, [name]: value });
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setVideoFile(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile || !courseId) {
//       console.error("No video selected or courseId missing");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", videoFile);
//     formData.append("upload_preset", "videos_preset");

//     try {
//       // Upload video to Cloudinary
//       const cloudinaryRes = await axios.post(
//         `https://api.cloudinary.com/v1_1/ddthfysqt/video/upload`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const videoUrl = cloudinaryRes.data.secure_url;

//       // Prepare lecture data to send to the backend
//       const lectureDataToSend = {
//         title: lectureData.title,
//         description: lectureData.description,
//         videoUrl: videoUrl,
//         courseId: courseId,
//       };

//       // Send lecture data to the backend
//       const backendRes = await axios.post(
//         `http://localhost:5000/add-lecture/${courseId}`,
//         lectureDataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Lecture added successfully:", backendRes.data);

//       // Reset form state after successful submission
//       setLectureData({
//         title: "",
//         description: "",
//         videoUrl: "",
//         courseId: courseId,
//       });
//       setVideoFile(null);

//       alert("Lecture added successfully!");
//     } catch (error) {
//       console.error("Error adding lecture:", error.message);
//       alert("Failed to add lecture. Please try again.");
//     }
//   };

//   return (
//     <>
//       <InstructorNavbar />
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//         className="container mx-auto my-10"
//       >
//         <h1 className="text-3xl text-center font-bold mb-8">Add New Lecture</h1>
//         <form
//           onSubmit={handleSubmit}
//           className="max-w-lg mx-auto"
//           encType="multipart/form-data"
//         >
//           {/* Lecture Title */}
//           <div className="mb-4">
//             <label htmlFor="title" className="input-label">
//               Lecture Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={lectureData.title}
//               onChange={handleChange}
//               className="input-field"
//               required
//             />
//           </div>

//           {/* Lecture Description */}
//           <div className="mb-4">
//             <label htmlFor="description" className="input-label">
//               Lecture Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={lectureData.description}
//               onChange={handleChange}
//               className="input-field"
//               rows="4"
//               required
//             />
//           </div>

//           {/* Lecture Video */}
//           <div className="mb-4">
//             <label htmlFor="video" className="input-label">
//               Lecture Video
//             </label>
//             <input
//               type="file"
//               id="video"
//               name="video"
//               onChange={handleVideoChange}
//               accept="video/*"
//               className="input-field"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
//           >
//             Add Lecture
//           </motion.button>
//         </form>
//       </motion.div>
//     </>
//   );
// };

// export default AddLecture;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import InstructorNavbar from "../../components/InstructorNavbar";
import Loader from "../../components/Loader";
import Toaster from "../../components/Toaster";

const AddLecture = () => {
  const { courseId } = useParams(); // Retrieve courseId from URL params

  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    section: "", // New field for section
    courseId: courseId,
  });

  const token = localStorage.getItem("token");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData({ ...lectureData, [name]: value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !courseId) {
      console.error("No video selected or courseId missing");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", "videos_preset");

    try {
      // Upload video to Cloudinary
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/ddthfysqt/video/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const videoUrl = cloudinaryRes.data.secure_url;

      // Prepare lecture data to send to the backend
      const lectureDataToSend = {
        title: lectureData.title,
        description: lectureData.description,
        videoUrl: videoUrl,
        courseId: courseId,
        section: lectureData.section, // Include section in lecture data
      };

      // Send lecture data to the backend
      const backendRes = await axios.post(
        `http://localhost:5000/add-lecture/${courseId}`,
        lectureDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Lecture added successfully:", backendRes.data);

      // Reset form state after successful submission
      setLectureData({
        title: "",
        description: "",
        videoUrl: "",
        section: "", // Reset section field
        courseId: courseId,
      });
      setVideoFile(null);
      setToast({ message: "Lecture added successfully!", type: "success" });
      // alert("Lecture added successfully!");
    } catch (error) {
      console.error("Error adding lecture:", error.message);
      setToast({
        message: "Failed to add lecture. Please try again.",
        type: "error",
      });
      // alert("Failed to add lecture. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <InstructorNavbar />
          {toast && (
            <Toaster
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto my-10"
          >
            <h1 className="text-3xl text-center font-bold mb-8">
              Add New Lecture
            </h1>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto"
              encType="multipart/form-data"
            >
              {/* Lecture Title */}
              <div className="mb-4">
                <label htmlFor="title" className="input-label">
                  Lecture Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={lectureData.title}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              {/* Lecture Description */}
              <div className="mb-4">
                <label htmlFor="description" className="input-label">
                  Lecture Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={lectureData.description}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  required
                />
              </div>

              {/* Lecture Video */}
              <div className="mb-4">
                <label htmlFor="video" className="input-label">
                  Lecture Video
                </label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  onChange={handleVideoChange}
                  accept="video/*"
                  className="input-field"
                  required
                />
              </div>

              {/* Section */}
              <div className="mb-4">
                <label htmlFor="section" className="input-label">
                  Section
                </label>
                <input
                  type="text"
                  id="section"
                  name="section"
                  value={lectureData.section}
                  onChange={handleChange}
                  placeholder="Section"
                  className="input-field"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add Lecture
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </>
  );
};

export default AddLecture;
