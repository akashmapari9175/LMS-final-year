import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";
import Banner from "../../components/Banner";
import FeaturedCourses from "../../components/FeaturedCourses";
import Testimonials from "../../components/Testimonials";
import HowItWorks from "../../components/HowItWorks";
import Footer from "../../components/Footer";

const Student_Home = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/student-home"
        );
        setCourses(response.data); // Assuming the response.data is an array of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    // Redirect to the course details page
    navigate(`/course-details/${courseId}`);
  };

  return (
    <div>
      <StudentNavbar />
      <Banner />
      <FeaturedCourses courses={courses} onCourseClick={handleCourseClick} />
      <Testimonials />
      <HowItWorks />
      <Footer></Footer>
    </div>
  );
};

export default Student_Home;
