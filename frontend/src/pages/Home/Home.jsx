import React from "react";
import Hero from "./Hero";

const Home = () => {
  return (
    <div className="bg-white container text-primary mt-8 p-8 mx-auto">
      {/* BANNER/HERO */}
      <Hero />

      <hr />

      {/* BLOGS */}
      <div>BLOGS</div>
    </div>
  );
};

export default Home;
