import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
      <div className="animate-spin rounded-full border-2 border-t-8 border-blue-500 h-32 w-32 bg-transparent"></div>
      <p className="m-4 text-center font-bold text-lg text-white">
        Uploading lecture... Please do not close the tab or window.
      </p>
    </div>
  );
};

export default Loader;
