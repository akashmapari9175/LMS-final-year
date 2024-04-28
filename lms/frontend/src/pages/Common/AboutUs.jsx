import React from "react";
import Navbar from "../../components/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">About Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              Learnify is your ultimate destination for online learning. We
              strive to provide high-quality educational content across various
              domains to help learners worldwide achieve their goals and unlock
              their potential.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Our Mission
              </h2>
              <p className="text-gray-600">
                Our mission is to make quality education accessible to everyone,
                regardless of their background or location. We believe that
                education has the power to transform lives, and we're committed
                to empowering learners worldwide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Our Vision
              </h2>
              <p className="text-gray-600">
                Our vision is to create a global community of lifelong learners
                who are passionate about acquiring knowledge and skills. We
                envision a future where learning is seamless, engaging, and
                enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
