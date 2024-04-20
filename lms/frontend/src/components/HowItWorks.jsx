import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center">
            <div className="bg-indigo-500 h-12 w-12 rounded-full flex justify-center items-center text-white font-semibold text-xl mr-4">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Browse Courses</h3>
              <p className="text-gray-600">
                Explore a wide range of courses on various topics.
              </p>
            </div>
          </div>
          {/* Add more steps here */}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
