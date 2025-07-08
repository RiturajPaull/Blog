import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();
  return (
    // individual card
    <div
      className="cursor-pointer w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/50 transition-all duration-300"
      onClick={() => {
        navigate(`/blog/${_id}`);
      }}
    >
      <img src={image} className="aspect-video " />
      <p className="inline-block ml-4 mt-4 px-5 py-1 border rounded-full border-primary/20 bg-primary/30 text-primary text-sm">
        {category}
      </p>
      <div className="p-5">
        <h5 className="font-medium mb-2 text-gray-900">{title}</h5>
        <p
          className="text-gray-600 text-sm mb-3"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 65) }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
