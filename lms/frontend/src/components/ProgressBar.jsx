import React from "react";

const ProgressBar = ({ totalVideos, watchedVideos }) => {
  const progress = (watchedVideos / totalVideos) * 100;

  return (
    <div>
      <h2 className="text-lg font-semibold  p-4">Course Progress</h2>
      <p className="text-gray-600 mb-2 px-4">
        {watchedVideos} out of {totalVideos} videos watched
      </p>
      <div className="w-full m-4 px-4 bg-gray-200  rounded overflow-hidden">
        <div
          className="bg-blue-500 h-2"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
