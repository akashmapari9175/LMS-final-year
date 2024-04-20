import React from "react";

const Testimonials = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          What Our Learners Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial Card Component */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              "I've learned so much from this platform. Highly recommended!"
            </p>
            <p className="font-semibold">- John Doe</p>
          </div>
          {/* Add more testimonial cards here */}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
