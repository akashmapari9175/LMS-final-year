import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaUserGraduate, FaBook } from "react-icons/fa";

const Counter = () => {
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorsResponse = await axios.get(
          "http://localhost:5000/instructor/count"
        );
        setInstructorsCount(instructorsResponse.data.count);

        const studentsResponse = await axios.get(
          "http://localhost:5000/student/count"
        );
        setStudentsCount(studentsResponse.data.count);

        const coursesResponse = await axios.get(
          "http://localhost:5000/course/count"
        );
        setCoursesCount(coursesResponse.data.count);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-16 md:py-24 px-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-20 ml-8 text-center ">
        Learnify Growth in the Last 2 Months
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CounterCard
          icon={<FaChalkboardTeacher size={40} color="#6366F1" />}
          title="Instructors"
          count={instructorsCount}
        />
        <CounterCard
          icon={<FaUserGraduate size={40} color="#10B981" />}
          title="Students"
          count={studentsCount}
        />
        <CounterCard
          icon={<FaBook size={40} color="#EF4444" />}
          title="Courses"
          count={coursesCount}
        />
      </div>
    </div>
  );
};

const CounterCard = ({ icon, title, count }) => {
  return (
    <motion.div
      className="counter-card bg-white border border-gray-300 rounded-md shadow-md p-6 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
      <p className="text-3xl font-bold text-center">{count}</p>
    </motion.div>
  );
};

export default Counter;
