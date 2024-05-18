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
    <div className="bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
          Learnify Growth in the Last 2 Months
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-x-28">
          <CounterCard
            icon={<FaChalkboardTeacher size={40} color="#FCD34D" />}
            title="Instructors"
            count={instructorsCount}
          />
          <CounterCard
            icon={<FaUserGraduate size={40} color="#6EE7B7" />}
            title="Students"
            count={studentsCount}
          />
          <CounterCard
            icon={<FaBook size={40} color="#FF7E7E" />}
            title="Courses"
            count={coursesCount}
          />
        </div>
      </div>
    </div>
  );
};

const CounterCard = ({ icon, title, count }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center text-white cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{count}</p>
    </motion.div>
  );
};

export default Counter;
