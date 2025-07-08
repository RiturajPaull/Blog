import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const Clear = () => {
    setInput("");
    inputRef.current.value = "";
  };
  return (
    <div className=" mx-8 sm:mx-16 xl:mx-24 relative">
      {/*  Content */}
      <div className="  text-center mt-20 mb-8">
        <div className="inline-flex border item-center justify-content gap-4 px-8 py-2 border-primary/40 bg-primary/10 text-primary rounded-full mb-4 text-sm">
          <p>New: AI feature intregated</p>
          <img src={assets.star_icon} />
        </div>
        <h1 className="text-3xl sm:text-6xl sm:leading-16 font-semibold text-neutral-600">
          Your Own <span className="text-primary">Blogging</span> <br />
          Platform.
        </h1>
        <p className="max-sm:text-xs text-neutral-500 my-6 sm:my-8 max-w-2xl mx-auto">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between border max-w-lg mx-auto max-sm:scale-75 border-gray-300 bg-white rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            required
            className="pl-3 w-full outline-none"
          />
          <button
            type="submit"
            className="py-2 border m-2 px-7 rounded bg-primary text-white cursor-pointer hover:scale-105 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="text-center">
        {input && (
          <button
            onClick={Clear}
            className="border px-4 py-2 rounded bg-primary text-white text-sm hover:scale-105 cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>
      {/* Background image */}
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
