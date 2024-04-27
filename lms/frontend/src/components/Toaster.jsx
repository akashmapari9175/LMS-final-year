import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Toaster = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Auto hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className={`fixed  bottom-0 left-0 right-0 p-4 z-50 w-[400px]  m-2   ${
            type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex justify-between items-center">
            <p>{message}</p>
            <button onClick={handleClose}>&times;</button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Toaster;
