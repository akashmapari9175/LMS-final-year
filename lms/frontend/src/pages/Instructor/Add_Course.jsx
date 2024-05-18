import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import InstructorNavbar from "../../components/InstructorNavbar";
import Loader from "../../components/Loader";
import Toaster from "../../components/Toaster";

const Add_Course = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    prerequisites: "",
    imageUrl: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue = name === "category" ? value.toLowerCase() : value;
    setCourseData({ ...courseData, [name]: normalizedValue });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "thumbnail_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddthfysqt/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url;

      const updatedCourseData = { ...courseData, imageUrl };

      const token = localStorage.getItem("token"); // Get JWT token from local storage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const courseCreationResponse = await axios.post(
        "http://localhost:5000/create-course",
        updatedCourseData,
        config
      );

      console.log("Course added successfully:", courseCreationResponse.data);
      // alert("Course Successfully Created!");
      setToast({ message: "Course Successfully Created!", type: "success" });
      setCourseData({
        title: "",
        description: "",
        category: "",
        duration: "",
        price: "",
        prerequisites: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error adding course:", error.message);
      // alert("Failed to create course. Please try again.");
      setToast({
        message: "Failed to create course. Please try again.",
        type: "error",
      });
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
            <h1 className="text-3xl text-center font-bold text-blue-600 mb-8">
              Add New Course
            </h1>

            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              encType="multipart/form-data"
            >
              {/* Course Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={courseData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter course title"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Enter course description"
                />
              </div>

              {/* Course Category */}
              {/* <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={courseData.category}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter course category"
                />
              </div> */}

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={courseData.category}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter course category"
                />
              </div>

              {/* Course Duration */}
              <div className="mb-4">
                <label
                  htmlFor="duration"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={courseData.duration}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter course duration"
                />
              </div>

              {/* Course Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={courseData.price}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter course price"
                />
              </div>

              {/* Course Prerequisites */}
              <div className="mb-4">
                <label
                  htmlFor="prerequisites"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course Prerequisites
                </label>
                <textarea
                  id="prerequisites"
                  name="prerequisites"
                  value={courseData.prerequisites}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Enter course prerequisites"
                />
              </div>

              {/* Course Image */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="input-field"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition duration-300"
              >
                Add Course
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Add_Course;
