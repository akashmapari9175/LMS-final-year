import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Home from "../Home";

const LandingPage = () => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <Navbar />

      <Home></Home>
    </div>
  );
};

export default LandingPage;
