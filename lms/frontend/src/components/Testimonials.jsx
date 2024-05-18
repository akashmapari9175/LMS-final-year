import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Testimonials
        </h2>
        <Carousel
          showArrows={true}
          showThumbs={false}
          autoPlay={true}
          interval={5000}
          stopOnHover={true}
          showStatus={false}
          className="max-w-xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <FaQuoteLeft className="text-3xl mb-4 text-gray-400" />
            <p className="text-lg text-gray-800 mb-6 text-center">
              "I absolutely love Learnify! The courses are well-structured and
              taught by knowledgeable instructors."
            </p>
            <p className="text-gray-600 text-center">- John Doe</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <FaQuoteLeft className="text-3xl mb-4 text-gray-400" />
            <p className="text-lg text-gray-800 mb-6 text-center">
              "Learnify has helped me enhance my skills and advance in my
              career. Highly recommended!"
            </p>
            <p className="text-gray-600 text-center">- Jane Smith</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <FaQuoteLeft className="text-3xl mb-4 text-gray-400" />
            <p className="text-lg text-gray-800 mb-6 text-center">
              "The instructors on Learnify are top-notch. I've learned so much
              and enjoyed every minute of it."
            </p>
            <p className="text-gray-600 text-center">- Michael Johnson</p>
          </div>
          {/* Add more testimonials here */}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
