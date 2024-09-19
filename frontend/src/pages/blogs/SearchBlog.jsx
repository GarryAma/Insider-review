import React from "react";

const SearchBlog = ({ search, handleSearchChange, handleSearchSubmit }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };
  return (
    <div className="w-full flex flex-col sm:flex-row sm:space-x-4 gap-y-2">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        placeholder="Search Topics..."
        className="border p-2 sm:w-[85%] focus:border-slate-500 outline-none sm:text-sm text-xs"
      />
      <button
        onClick={handleSearchSubmit}
        className="sm:w-[15%] border  text-white bg-[rgb(71,147,233)] hover:bg-blue-500 hover:font-semibold p-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlog;
