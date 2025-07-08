import React, { useState } from "react";
import { assets } from "../assets/assets";
import Login from "./Login";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { setShowLoginPage, showLoginPage, navigate, token } = useAppContext();

  return (
    <div className="py-5 mx-8 sm:mx-20 xl:mx-32 ">
      <div className="flex justify-between items-center cirsor-pointer">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          className="w-32 sm:w-44 xl:w-60"
        />
        <button
          // onClick={() => setShowLoginPage(!showLoginPage)}
          onClick={() => navigate("/admin")}
          className="flex bg-primary justify-center items-center text-white text-sm gap-2 px-10 py-3 rounded-full cursor-pointer"
        >
          {token ? "Dashboard" : "Login"}
          <img src={assets.arrow} className="w-3" />
        </button>
      </div>
      {showLoginPage && <Login />}
    </div>
  );
};

export default Navbar;
