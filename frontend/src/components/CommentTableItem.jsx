import React from "react";
import { assets } from "../assets/assets";

const CommentTableItem = ({ comments, getCommentsData }) => {
  console.log("cc", comments);
  const { blog, createdAt, _id } = comments;
  console.log(blog);
  const BlogDate = new Date(createdAt);
  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b>Blog</b> :
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>: {comments.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> :{" "}
        {comments.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comments.isApproved ? (
            <img
              src={assets.tick_icon}
              className="cursor-pointer w-6 hover:scale-110 transition-all "
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full text-center px-3 py-1">
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
