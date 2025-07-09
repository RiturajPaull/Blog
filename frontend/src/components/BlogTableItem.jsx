import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { API } from "../axios/axios";
import { SummaryApi } from "../api/SummaryAPI";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogData, index }) => {
  const { _id, title, createdAt, isPublished } = blog;
  const { token } = useAppContext();
  const BlogDate = new Date(createdAt);

  const unPublish = async () => {
    try {
      const response = await API({
        ...SummaryApi.togglePublish,
        data: {
          id: _id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response", response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        await fetchBlogData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      const response = await API({
        ...SummaryApi.deleteBlogsById,
        data: {
          id: _id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Blog Deleted");
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        await fetchBlogData();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchBlogData();
  // });

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
        <p
          onClick={unPublish}
          className="border px-2 rounded text-sm cursor-pointer"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </p>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          className="w-7 cursor-pointer hover:scale-105 border border-red-300 rounded-full hover:border-red-600 transition-all duration-300"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
