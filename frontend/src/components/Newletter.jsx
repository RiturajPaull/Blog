import React from "react";

const Newletter = () => {
  return (
    <div className=" mt-24 mx-8 sm:mx-10 md:mx-24 flex flex-col items-center gap-2 mb-35">
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
        Never Miss a Blog!
      </h1>
      <p className="text-gray-500 text-lg mt-2 mb-5">
        Subscribe to get the latest blog, new Tech and exclusive news.
      </p>
      <form className="flex rounded  items-center justify-between w-full max-w-2xl h-12 md:h-15">
        <input
          type="text"
          placeholder="Enter your email id"
          className="border  outline-none  border-gray-300 rounded-md h-full w-full pl-2 rounded-r-none border-r"
        />
        <button className="px-10 bg-primary/90 text-white h-full rounded-md rounded-l-none cursor-pointer">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newletter;
