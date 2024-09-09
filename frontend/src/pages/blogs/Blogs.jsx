import React, { useState } from "react";
import SearchBlog from "./SearchBlog";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });
  console.log(query);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => setQuery({ search, category });

  return (
    <div className="mt-8 container mx-auto">
      <SearchBlog
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        search={search}
      />

      <div>Blogs cards</div>
    </div>
  );
};

export default Blogs;
