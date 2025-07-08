import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Sidebar = () => {
  return (
    <div className="w-13 sm:w-60 border border-t-0 space-y-3 border-gray-300 text-gray-700">
      <NavLink
        end={true}
        to="/admin"
        id="dashboard"
        className={({
          isActive,
        }) => `flex items-center gap-3  px-4 justify-start
           ${isActive && " bg-primary/30 border-r-6 border-primary"}`}
      >
        <img src={assets.home_icon} className="min-w-5 py-4" />
        <p className="hidden sm:block">Dashboard</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/add-blogs"
        // className="flex items-center gap-3  px-4 justify-start"
        className={({
          isActive,
        }) => `flex items-center gap-3  px-4 justify-start
           ${isActive && " bg-primary/30 border-r-6 border-primary"}`}
      >
        <img src={assets.add_icon} className="min-w-5 py-4" />
        <p className="hidden sm:block">Add blogs</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/blog-list"
        // className="flex items-center gap-3  px-4 justify-start"
        className={({
          isActive,
        }) => `flex items-center gap-3  px-4 justify-start
           ${isActive && " bg-primary/30 border-r-6 border-primary"}`}
      >
        <img src={assets.blog_icon} className="w-7 py-4" />
        <p className="hidden sm:block">Blogs list</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/comments"
        // className="flex items-center gap-3  px-4 justify-start"
        className={({
          isActive,
        }) => `flex items-center gap-3  px-4 justify-start
           ${isActive && " bg-primary/30 border-r-6 border-primary"}`}
      >
        <img src={assets.comment_icon} className="w-7 py-4" />
        <p className="hidden sm:block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
