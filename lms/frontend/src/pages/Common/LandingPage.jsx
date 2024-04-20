import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

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
      {/* Your landing page content goes here */}
    </div>
  );
};

export default LandingPage;
