import React, { useState } from "react";
import SearchBlog from "./SearchBlog";
import { useFetchBlogsQuery } from "../../redux/services/blogsApi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });
  //   console.log(query);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => setQuery({ search, category });

  //   GETTING DATA BY USING REDUX
  // default value for blogs is {} because we are expecting object from the backend with message property and posts property
  const { data: blogs = {}, error, isLoading } = useFetchBlogsQuery(query);
  //   console.log(blogs.posts);

  return (
    <div className="mt-8 container mx-auto">
      <SearchBlog
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        search={search}
      />

      {error && (
        <div>
          <span>{error.toString()}</span>
        </div>
      )}
      {isLoading && (
        <div>
          <span>Loading ... </span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {blogs.posts?.map((singleBlog, index) => (
          <div key={index} className="border shadow-md">
            <Link key={index} to={`blog/${singleBlog._id}`}>
              <img
                src={singleBlog.coverImg}
                alt={singleBlog.coverImg}
                className="w-full sm:h-48 h-72"
              />
              <h2 className="p-4 text-xs sm:text-sm md:text-md lg:text-lg">
                {singleBlog.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <div>Blogs cards</div>
    </div>
  );
};

export default Blogs;
