import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CommentInput = () => {
  const { id } = useParams();
  const [comments, setComments] = useState("");

  return (
    <div>
      <h4 className="font-medium my-4 sm:text-sm md:text-md text-xs">
        Shot a comment
      </h4>
      <form>
        <textarea
          style={{ width: "100%", padding: "10px" }}
          rows={10}
          name="text"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Share your knowledge about Javascript"
          className="focus:ring-green-900 focus:ring-1 focus:outline-none border bg-slate-50 sm:text-sm md:text-md text-xs"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white rounded-md text-sm p-2 hover:bg-blue-900 hover:font-medium transition-all duration-200"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
