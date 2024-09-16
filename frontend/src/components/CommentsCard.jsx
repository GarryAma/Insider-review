import React from "react";
import { BiSolidConfused } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { formatDate } from "../utils/formatDate";
import CommentInput from "./CommentInput";

const CommentsCard = ({ comments }) => {
  return (
    <div className="my-6 bg-white p-8">
      <div>
        {comments?.length > 0 ? (
          <div>
            <h3>All Comments</h3>
            <div>
              {comments.map((singleComment, index) => (
                <div key={index}>
                  <div>
                    <RxAvatar className="w-14 h-14" />
                    <div>
                      <p className="text-blue-500">
                        {comments?.user?.username}
                      </p>
                      <p className="italic">
                        {formatDate(singleComment.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* COMMENT DETAILS */}
                  <div className="text-gray-600 mt-5 border p-8">
                    <p className="sm:w-4/5">{singleComment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="font-medium"> No comments yet.. </span>
            <BiSolidConfused className="text-red-500" />
          </div>
        )}
      </div>

      {/* COMMENT INPUT  */}
      <CommentInput />
    </div>
  );
};

export default CommentsCard;
