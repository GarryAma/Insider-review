import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="bg-white w-[75%] sm:w-[50%] mx-auto p-8 mt-36 rounded-sm shadow-xl text-xs md:text-sm">
      <h2 className="font-semibold pt-5">Please Register</h2>
      <form className="space-y-5 ms-auto pt-8">
        <input
          type="text"
          value={username}
          className="w-full focus:border-indigo-600 border outline-none bg-bgPrimary  px-5 py-2 rounded-md shadow-md"
          placeholder="Username"
          required
        />
        <input
          type="text"
          value={email}
          className="w-full focus:border-indigo-600 border outline-none bg-bgPrimary  px-5 py-2 rounded-md shadow-md"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          className="w-full focus:border-indigo-600 border outline-none bg-bgPrimary  px-5 py-2 rounded-md shadow-md"
          placeholder="Password"
          required
        />
        {message && <p className="text-red-500">message</p>}

        <button className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-2 rounded-md transition-all duration-300">
          Login
        </button>
      </form>

      <div className="mt-5 flex space-x-1 justify-center text-xs sm:text-sm">
        <p className="italic text-slate-700">Already have an account?</p>
        <Link to={"/login"} className="text-indigo-800 italic">
          👉 Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
