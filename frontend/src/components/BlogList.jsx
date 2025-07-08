import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <div className="flex gap-4 items-center justify-center sm:gap-8 my-10 relative ">
        {blogCategories.map((item, index) => {
          return (
            <div key={index} className="relative">
              <button
                onClick={() => setMenu(item)}
                className={`${
                  menu === item ? "text-white px-4 pt-0.5" : "text-gray-500"
                } cursor-pointer`}
              >
                {item}
                {menu === item && (
                  <motion.div
                    layoutId="underline"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    className="absolute bg-primary top-0 left-0 right-0 -z-1 h-7 rounded-full"
                  ></motion.div>
                )}
              </button>
            </div>
          );
        })}
      </div>
      {/* Blog Item */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-8 sm:mx-16 xl:mx-24  gap-8 px-2 py-4">
        {filteredBlogs()
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
