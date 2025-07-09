import React, { useEffect, useState } from "react";
import { assets, comments_data } from "../../assets/assets";
import CommentTableItem from "../../components/CommentTableItem";
import { API } from "../../axios/axios";
import { SummaryApi } from "../../api/SummaryAPI";
// import CommentTableItem from "../../components/CommentTableItem";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const getCommentsData = async () => {
    // setComments(comments_data);
    try {
      const response = await API({
        ...SummaryApi.adminAllComments,
      });
      console.log("All Comments", response);
      const { data: responseData } = response;
      if (responseData.success) {
        setComments(responseData.comment);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommentsData();
  }, []);
  console.log("Comments Blog", comments.blog?.title);
  return (
    <div className="w-full px-10 py-10">
      <div className=" flex items-center justify-between ">
        <p className="text-lg">Comments</p>
        <div className="flex items-center  gap-4">
          <p
            onClick={() => setFilter("Approved")}
            // onClick={filterComment}
            className={`${
              filter === "Approved" && "border-primary text-primary"
            } border px-3 rounded-xl text-sm cursor-pointer hover:scale-105 } border px-4 rounded-xl text-sm cursor-pointer hover:scale-105`}
          >
            Approved
          </p>
          <p
            onClick={() => setFilter("Not Approved")}
            className={`${
              filter === "Not Approved" && "border-primary text-primary"
            } border px-3 rounded-xl text-sm cursor-pointer hover:scale-105`}
          >
            Not Approved
          </p>
        </div>
      </div>
      <div className="border">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comments={comment}
                  getCommentsData={getCommentsData}
                  index={index + 1}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
