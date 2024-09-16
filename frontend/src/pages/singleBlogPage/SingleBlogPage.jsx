import React from "react";
import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "../../redux/services/blogsApi";
import SingleBlogCard from "./SingleBlogCard";
import CommentsCard from "../../components/CommentsCard";
import RelatedBlogs from "../../components/RelatedBlogs";

const SingleBlogPage = () => {
  const { id } = useParams();

  //GETTING DATA FROM REDUX
  const { data: blog = {}, error, isLoading } = useFetchBlogByIdQuery(id);
  console.log(blog);

  return (
    <div className="text-primary container mx-auto mt-6">
      <div>
        {isLoading && <div>Loading ... </div>}
        {error && <div>{error.toString()}</div>}
        {blog?.post && (
          <div>
            <div className="flex flex-col lg:flex-row justify-between items-start md:gap-10 gap-8 m-1">
              <div className="lg:w-2/3 w-full border">
                <SingleBlogCard blog={blog?.post} />
                <CommentsCard comments={blog.comment} />
              </div>
              <div className="bg-white lg:w-1/3 w-full">
                <RelatedBlogs />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBlogPage;
