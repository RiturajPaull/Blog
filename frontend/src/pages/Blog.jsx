import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Moment from "moment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import axios from "axios";

import { API } from "../axios/axios";
import { SummaryApi } from "../api/SummaryAPI";
const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({
    name: "",
    comment: "",
  });

  const url = import.meta.env.VITE_SERVER_URL;
  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`${url}/api/image/${id}`);
      console.log("Id data", response);
      const { data: responseData } = response;
      setBlogData(responseData.blog);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchComments = async () => {
    // setComments(comments_data);
    try {
      const response = await API({
        ...SummaryApi.getBlogComment,
        data: {
          blogId: id,
        },
      });
      console.log("Blog Comments", response);
      const { data: responseData } = response;
      if (responseData.success) {
        setComments(responseData.comment);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return blogData ? (
    <div className="relative">
      <Navbar />
      <img
        src={assets.gradientBackground}
        className=" absolute -top-50 -z-1 opacity-50"
      />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary font-semibold mb-5 text-lg">
          Published on {Moment(blogData.createdAt).format("MMMM Do YYYY")}{" "}
        </p>
        <h1 className="max-w-3xl mx-auto text-3xl sm:text-5xl font-semibold text-gray-700  mb-5">
          {blogData.title}
        </h1>
        <p className="text-gray-500 mb-5 text-lg">{blogData.subTitle}</p>
        <p className="max-w-[150px] mx-auto font-semibold py-1 rounded-full border border-primary/80 bg-primary/20 text-primary ">
          Michael Brown
        </p>
      </div>
      {/* image section */}
      <div className="max-w-5xl mx-5 md:mx-auto my-10">
        <img src={blogData.image} className="rounded-3xl mb-5" />
        <div
          dangerouslySetInnerHTML={{ __html: blogData.description }}
          className="mx-5 sm:mx-10 rich-text"
        ></div>
        {/* Comments */}
        <div className="max-w-5xl mx-5 md:mx-auto mt-20 font-semibold">
          <p className="mb-10">Comments ({comments.length})</p>
          <div className="flex flex-col gap-5 relative">
            {comments.map((item, index) => (
              <div
                key={index}
                className="border bg-primary/2 border-primary/10 max-w-xl p-4 rounded text-gray-600 "
              >
                <div className="flex gap-2 items-center mb-2">
                  <img src={assets.user_icon} className="w-6" />
                  <p>{item.name}</p>
                </div>
                <p className="max-w-sm ml-8 text-sm font-medium">
                  {item.content}
                </p>
                <div className="text-end font-medium text-sm">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Comments Box */}
        <div className=" flex flex-col gap-5 mx-5 sm:mx-10 xl:mx-auto mt-26 mb-30">
          <p className="font-semibold text-lg">Add Your Comment</p>
          <form className="flex flex-col items-start max-w-xl gap-8">
            <input
              name="name"
              value={data.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="w-full outline-none border border-gray-400 px-2.5 py-3 rounded-md text-lg"
            />
            <textarea
              name="comment"
              value={data.comment}
              onChange={handleChange}
              type="text"
              placeholder="Comment"
              className="w-full border outline-none text-lg border-gray-400 px-2.5 py-3 min-h-[210px] rounded"
            />
            <button
              type="submit"
              className="border cursor-pointer hover:scale-105 transition-all duration-190 outline-none px-8 py-3 bg-primary border-primary/50 rounded text-white"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Social Media */}
        <div className="mx-5 max-w-5xl sm:mx-10 ">
          <p className="font-semibold mb-3">
            Share this atricle on social media
          </p>
          <div className="flex">
            <img
              src={assets.facebook_icon}
              className="hover:scale-105 transition-all cursor-pointer"
            />
            <img
              src={assets.twitter_icon}
              className="hover:scale-105 transition-all cursor-pointer"
            />
            <img
              src={assets.googleplus_icon}
              className="hover:scale-105 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <h1>
      <Loader />
    </h1>
  );
};

export default Blog;
