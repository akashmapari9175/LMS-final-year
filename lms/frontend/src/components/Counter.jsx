import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { FaChalkboardTeacher, FaUserGraduate, FaBook } from "react-icons/fa";

const Counter = () => {
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);

  const controls = useAnimation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorsResponse = await axios.get(
          "http://localhost:5000/instructor/count"
        );
        animateCount(instructorsResponse.data.count, setInstructorsCount);

        const studentsResponse = await axios.get(
          "http://localhost:5000/student/count"
        );
        animateCount(studentsResponse.data.count, setStudentsCount);

        const coursesResponse = await axios.get(
          "http://localhost:5000/course/count"
        );
        animateCount(coursesResponse.data.count, setCoursesCount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  const animateCount = (count, setter) => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        repeat: 0,
      },
    });
    setTimeout(() => {
      setter(count);
    }, 500);
  };

  return (
    <div className="container mx-auto h-[500px] flex flex-col justify-center items-center bg-gray-100">
      <h1 className="my-16 text-2xl ">Learnify Growth in last 2 months</h1>
      <div className="grid grid-cols-3 gap-8">
        <motion.div
          className="counter-card flex flex-col items-center justify-center text-2xl bg-white border border-gray-300 rounded-md shadow-md p-4 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // animate={controls}
        >
          <FaChalkboardTeacher size={40} color="#6366F1" />
          <h2 className="counter-title text-lg font-bold mb-2">Instructors</h2>
          <p className="counter-number text-3xl">{instructorsCount}</p>
        </motion.div>
        <motion.div
          className="counter-card flex flex-col items-center justify-center text-2xl bg-white border border-gray-300 rounded-md shadow-md p-4 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // animate={controls}
        >
          <FaUserGraduate size={40} color="#10B981" />
          <h2 className="counter-title text-lg font-bold mb-2">Students</h2>
          <p className="counter-number text-3xl">{studentsCount}</p>
        </motion.div>
        <motion.div
          className="counter-card flex flex-col items-center justify-center text-2xl bg-white border border-gray-300 rounded-md shadow-md p-4 cursor-pointer w-[300px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // animate={controls}
        >
          <FaBook size={40} color="#EF4444" />
          <h2 className="counter-title text-lg font-bold mb-2">Courses</h2>
          <p className="counter-number text-3xl">{coursesCount}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Counter;
