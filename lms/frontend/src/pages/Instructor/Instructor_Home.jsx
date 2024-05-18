import React from "react";
import InstructorNavbar from "../../components/InstructorNavbar";
import Banner from "../../components/Banner";
import Testimonials from "../../components/Testimonials";
import HowItWorks from "../../components/HowItWorks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Instructor_Dashboard from "./Instructor_Dashboard";
const Instructor_Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/auth/Instructor-home");
    }
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <InstructorNavbar></InstructorNavbar>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <Footer></Footer>
      <Instructor_Dashboard></Instructor_Dashboard>
    </div>
  );
};

export default Instructor_Home;
