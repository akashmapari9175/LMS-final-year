import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Edit_Course = () => {
  const { id } = useParams(); // Assuming you're using useParams to retrieve the course ID from the URL
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to fetch course. Please try again.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/courses/${id}`, course);
      alert("Course updated successfully");
      navigate("/manage-courses");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium mb-1">
            Course Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={course.title || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-medium mb-1">
            Course Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={course.description || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="text-lg font-medium mb-1">
            Course Category:
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={course.category || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="duration" className="text-lg font-medium mb-1">
            Course Duration:
          </label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={course.duration || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-lg font-medium mb-1">
            Course Price:
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={course.price || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="prerequisites" className="text-lg font-medium mb-1">
            Course Prerequisites:
          </label>
          <input
            type="text"
            name="prerequisites"
            id="prerequisites"
            value={course.prerequisites || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-lg font-medium mb-1">
            Course Image URL:
          </label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={course.imageUrl || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default Edit_Course;
