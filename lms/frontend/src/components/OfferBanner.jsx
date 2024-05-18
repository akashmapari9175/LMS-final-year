import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const OfferBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="bg-yellow-300 text-gray-800 flex justify-center items-center p-4 relative border border-yellow-500 rounded-lg shadow-lg ">
        <div className="flex justify-between items-center w-full max-w-5xl">
          <p className="m-0 text-lg">
            🎉 Special Offer! Enroll now and get 50% off on all courses! Use
            code:
            <span className="font-bold"> LEARN5000</span>
          </p>

          <button className="ml-4 text-xl text-gray-700" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
      </div>
    )
  );
};

export default OfferBanner;
