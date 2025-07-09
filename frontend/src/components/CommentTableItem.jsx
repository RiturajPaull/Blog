import React from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { API } from "../axios/axios";
import { SummaryApi } from "../api/SummaryAPI";
const CommentTableItem = ({ comments, getCommentsData }) => {
  console.log("cc", comments);
  const { blog, createdAt, _id } = comments;
  console.log(blog);
  const BlogDate = new Date(createdAt);

  const approveComment = async () => {
    try {
      const response = await API({
        ...SummaryApi.adminApproveComment,
        data: {
          id: _id,
        },
      });
      console.log("Approve comment", response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        await getCommentsData();
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const deleteComment = async () => {
    const confirm = window.confirm("Are you sure ?");
    if (!confirm) return;
    try {
      const response = await API({
        ...SummaryApi.adminDeleteComment,
        data: {
          id: _id,
        },
      });
      console.log("Delete comment", response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        await getCommentsData();
      }
    } catch (error) {
      toast.error(error);
    }
  };

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
              onClick={approveComment}
              src={assets.tick_icon}
              className="cursor-pointer w-6 hover:scale-110 transition-all "
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full text-center px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
