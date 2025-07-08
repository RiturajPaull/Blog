import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="w-full bg-primary/8.5">
      {/* QuickBlog img and link part */}
      <div className="flex flex-col md:flex-row gap-8 border-gray-400 border-b items-start justify-center py-5 px-3 text-gray-500">
        <div className=" w-full">
          <img src={assets.logo} className="w-40 sm:w-50" />
          <p className=" max-w-[410px] mt-6 text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>
        <div className="flex flex-wrap w-full justify-between gap-5">
          {footer_data.map((item, indx) => {
            return (
              <div key={indx}>
                <h3 className="font-semibold text-black">{item.title}</h3>
                <ul>
                  {item.links.map((link, id) => (
                    <li key={id}>
                      <a href="#"> {link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-6 text-center text-gray-400 text-lg pb-10">
        Copyright 2025 QuickBlog Rituraj.dev - All Rightd Reserved
      </p>
    </div>
  );
};

export default Footer;
