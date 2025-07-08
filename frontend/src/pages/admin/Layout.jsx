import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="border flex items-center justify-between py-4 px-5 border-gray-300 border-b">
        <img
          src={assets.logo}
          className="w-35 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button className=" px-6 rounded-full bg-primary text-white py-2 cursor-pointer hover:scale-105 transition-all duration-600">
          Logout
        </button>
      </div>
      <div className="flex justify-between gap-4 h-[743px]">
        <Sidebar />

        <Outlet />
      </div>
    </>
  );
};

export default Layout;
