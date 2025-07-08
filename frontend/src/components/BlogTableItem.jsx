import React from "react";
import { assets } from "../assets/assets";

const BlogTableItem = ({ blog, fetchDashboardData, index }) => {
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  return (
    <tr className="border-b border-gray-300">
      <th className=" px-5 sm:px-8">{index}</th>
      <td className="text-md px-4 py-4 sm:py-5 max-sm:w-full">{title}</td>
      <td className=" max-sm:hidden px-5 text-left">
        {BlogDate.toDateString()}
      </td>
      <td className="max-sm:hidden px-3">
        <p
          className={`${
            isPublished
              ? "border-green-400 text-green-500 bg-green-200"
              : "text-red-500 border-red-400 bg-red-200"
          } border px-2 py-1 rounded-full text-center`}
        >
          {isPublished ? "Published" : "UnPublished"}
        </p>
      </td>
      <td className="px-5 flex items-center gap-4 justify-center pt-5">
        <p className="border px-2 rounded text-sm cursor-pointer">
          {isPublished ? "Unpublish" : "Publish"}
        </p>
        <img
          src={assets.cross_icon}
          className="w-7 cursor-pointer hover:scale-105 border border-red-300 rounded-full hover:border-red-600 transition-all duration-300"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
