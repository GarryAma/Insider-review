import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/insider-review.png";
import { IoMenuSharp } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const navList = [
  { name: "Home", path: "/" },
  { name: "About Me", path: "/about-me" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Contact Me", path: "/contact-me" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  return (
    <header className="bg-white py-2 relative ">
      <nav className="container mx-auto flex justify-between px-5">
        <Link to={"/"}>
          <img src={logo} alt="" className="h-[60px] w-[80px]" />
        </Link>
        <ul className="sm:flex hidden items-center gap-8 text-sm ">
          {navList.map((single, index) => {
            return (
              <li key={index} className="sm:text-xs">
                <NavLink
                  to={single.path}
                  key={index}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {single.name}
                </NavLink>
              </li>
            );
          })}
          <li>
            <NavLink to={"/login"} className={"text-xs"}>
              Login
            </NavLink>
          </li>
        </ul>
        {/* TOGGLE MENU */}
        <div className="flex items-center justify-center sm:hidden">
          <button className="hover:text-blue-600" onClick={toggleMenu}>
            {isMenuOpen ? <IoIosClose size={35} /> : <IoMenuSharp size={25} />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <ul
        className={`flex flex-col space-y-8 absolute bg-gray-800  w-full text-center transition-all duration-300 text-white p-3 z-10 ${
          isMenuOpen ? "right-0 opacity-100" : "-right-[100%] opacity-0"
        }`}
      >
        {navList.map((single, index) => {
          return (
            <li key={index}>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to={single.path}
                key={index}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="text-xs sm:text-sm">•· {single.name}</span>
              </NavLink>
            </li>
          );
        })}
        <li>
          <NavLink to={"/login"} className={"text-xs"}>
            •· Login
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
