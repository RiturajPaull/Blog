import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/BlogTableItem";
import { dashboard_data } from "../../assets/assets";

const ListBlog = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashData = () => {
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchDashData();
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
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  blog={blog}
                  key={blog._id}
                  fetchDashboardData={fetchDashData}
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
