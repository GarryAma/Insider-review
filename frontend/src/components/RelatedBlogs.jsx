import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchRelatedBlogsQuery } from "../redux/services/blogsApi";

const RelatedBlogs = () => {
  const { id } = useParams();

  const {
    data: relatedBlogs = {},
    isLoading,
    error,
  } = useFetchRelatedBlogsQuery(id);
  console.log(relatedBlogs); // ga bakal error,karena akses .post dari initial empty object still valid

  return (
    <div>
      <h3 className="text-xs sm:text-sm md:text-md p-8">Related Blogs</h3>
      <hr />

      {relatedBlogs.post?.length <= 0 ? (
        <div className="p-6">No related blogs</div>
      ) : (
        <div className="p-1">
          {relatedBlogs.post?.map((singleRelatedBlog, index) => (
            <Link to={`/blog/${singleRelatedBlog._id}`} key={index}>
              <div className="flex flex-col sm:flex-row sm:items-center  shadow-sm gap-4 p-2">
                <div className="w-[40px] h-[40px] flex-shrink-0">
                  <img
                    src={singleRelatedBlog.coverImg}
                    alt=""
                    className="h-full w-full rounded-full ring-1 ring-blue-400"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm text-blue-900 font-semibold">
                    {singleRelatedBlog.title}
                  </h4>
                  <p className="text-xs sm:text-xs md:text-xs ">
                    {singleRelatedBlog.description.substring(0, 40)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedBlogs;
