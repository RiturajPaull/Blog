import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../components/BlogTableItem";
import { API } from "../../axios/axios";
import { SummaryApi } from "../../api/SummaryAPI";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboardData = async () => {
    // setDashboardData(dashboard_data);
    try {
      const response = await API({
        ...SummaryApi.adminGetDashData,
      });
      console.log("Dash data", response);
      const { data: responseData } = response;
      if (responseData.success) {
        setDashboardData(responseData.dashboardData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  console.log("Data", dashboardData);
  return (
    <div className=" bg-primary/5 w-full">
      {/* Upper part */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-start px-6 py-4 md:px-8 gap-3"> */}
      <div className=" flex flex-wrap gap-5 items-center justify-start px-5 py-8">
        <div className="rounded-lg shadow-md  bg-white/50 px-8 py-3 flex items-center justify-center gap-3 hover:scale-105 transition-all duration-600 cursor pointer text-gray-500">
          <img src={assets.dashboard_icon_1} />
          <div className="text-center">
            <p>{dashboardData.blogs}</p>
            <p>Blogs</p>
          </div>
        </div>
        <div className="rounded-lg shadow-md  bg-white/50 px-3 py-3 flex items-center justify-center gap-3  hover:scale-105 transition-all duration-600 cursor pointer text-gray-500">
          <img src={assets.dashboard_icon_2} />
          <div className="text-center">
            <p>{dashboardData.blogs}</p>
            <p>Comments</p>
          </div>
        </div>
        <div className="rounded-lg shadow-md  bg-white/50 px-7 py-3 flex items-center justify-center gap-3 hover:scale-105 transition-all duration-600 cursor pointer text-gray-500">
          <img src={assets.dashboard_icon_3} />
          <div>
            <p>{dashboardData.blogs}</p>
            <p>Drafts</p>
          </div>
        </div>
      </div>
      {/* lower part */}
      <div className="flex flex-col gap-5 px-5">
        <div className=" px-5 py-4 flex items-center justify-start gap-3">
          <img src={assets.dashboard_icon_4} />
          <p>Latest Blogs</p>
        </div>
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
                  fetchDashboardData={fetchDashboardData}
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

export default Dashboard;
