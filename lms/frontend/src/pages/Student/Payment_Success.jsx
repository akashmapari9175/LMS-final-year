import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const Payment_Success = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold mb-4">Payment Successful!</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
          <div>
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-[200px] m-4"
            />
          </div>
          <div className="p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-700 mb-4">{course.description}</p>

            <div className="flex justify-between">
              <p className="text-gray-600">Duration: {course.duration}</p>
              <p className="text-gray-600 text-xl font-bold">
                Price: ₹{course.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment_Success;
