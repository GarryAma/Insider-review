import React from "react";
import Hero from "./Hero";
import Blogs from "../blogs/Blogs";

const Home = () => {
  return (
    <div className="bg-white container text-primary mt-8 p-8 mx-auto">
      {/* BANNER/HERO */}
      <Hero />

      {/* BLOGS */}
      <Blogs />
    </div>
  );
};

export default Home;
