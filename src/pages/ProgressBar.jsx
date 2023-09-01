import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative w-full h-8 bg-gray-300 rounded overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full animate-ping bg-teal-500"
        style={{ width: `${progress}%` }}
      ></div>
      <div
        className="absolute top-0 left-0 h-full bg-teal-500"
        style={{
          width: `${progress}%`,
          transition: "width 1.4s ease-in-out",
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-900 font-bold">
        {progress}% Wait a minut
      </div>
    </div>
  );
};

export default ProgressBar;
