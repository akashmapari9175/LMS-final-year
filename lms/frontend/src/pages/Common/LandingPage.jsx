import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import Counter from "../../components/Counter";
import FeaturedCourses from "../../components/FeaturedCourses";
import HowItWorks from "../../components/HowItWorks";
import Testimonial from "../../components/Testimonials";
import Footer from "../../components/Footer";
import axios from "axios";
import CourseSlider from "../../components/CourseSlider";
import OfferBanner from "../../components/OfferBanner";

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Add selectedCategory state

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCategorySelect = async (selectedCategory) => {
    setSelectedCategory(selectedCategory); // Update selectedCategory state
    try {
      const response = await axios.post(
        "http://localhost:5000/courses/filter",
        {
          selectedCategory,
        }
      );
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error filtering courses:", error);
    }
  };

  const handleCourseClick = (courseId) => {
    // Redirect to the course details page
    // navigate(`/course-details/${courseId}`);
  };

  return (
    <div>
      <OfferBanner></OfferBanner>
      <Navbar categories={categories} onCategorySelect={handleCategorySelect} />
      <Banner />
      <CourseSlider
        courses={filteredCourses}
        onCourseClick={handleCourseClick}
        selectedCategory={selectedCategory}
      ></CourseSlider>
      <FeaturedCourses
        courses={filteredCourses}
        onCourseClick={handleCourseClick}
        selectedCategory={selectedCategory}
      />
      <Counter />
      <HowItWorks></HowItWorks>
      <Testimonial></Testimonial>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
