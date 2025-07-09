import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/BlogTableItem";
import { blog_data } from "../../assets/assets";
import { API } from "../../axios/axios";
import { SummaryApi } from "../../api/SummaryAPI";
const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogData = async () => {
    try {
      const response = await API({
        ...SummaryApi.adminAllBlogs,
      });
      // console.log("All Blogs", response);
      const { data: responseData } = response;
      if (responseData.success) {
        setBlogs(responseData.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);
  return (
    <div className="w-full px-10 py-15">
      <div className="h-full">
        <p className="pb-5 text-lg">All Blogs</p>
        <div className=" relative max-w-4xl overflow-x-auto shadow-md rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-gray-500">
            <thead className="text-md text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 text-gray-500">
                  #
                </th>
                <th scope="col" className="px-2 py-4 text-gray-500 ">
                  Blog Title
                </th>
                <th
                  scope="col"
                  className="px-2 py-4 text-gray-500 max-sm:hidden "
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-2 py-4 text-gray-500 max-sm:hidden"
                >
                  Status
                </th>
                <th scope="col" className="px-2 py-4 text-gray-500 xl:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <BlogTableItem
                  blog={blog}
                  key={blog._id}
                  fetchBlogData={fetchBlogData}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
