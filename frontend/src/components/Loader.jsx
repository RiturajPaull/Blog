import React from "react";

const Loader = () => {
  return (
    <div className="border-6 flex items-center justify-center h-screen">
      <div className="border-4 text-gray-500 animate-spin h-20 w-20 border-t-white  rounded-full "></div>
    </div>
  );
};

export default Loader;
