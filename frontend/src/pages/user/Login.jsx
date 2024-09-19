import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/services/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  console.log(loginLoading);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    // console.log(data);
    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
    } catch (error) {
      setMessage("Please provide valid credentials");
      console.log(error.message);
    }
  };

  return (
    <div className="bg-white w-[75%] sm:w-[50%] mx-auto p-8 mt-36 rounded-sm shadow-xl text-xs md:text-sm">
      <h2 className="font-semibold pt-5">Please Login</h2>
      <form onSubmit={handleLogin} className="space-y-5 ms-auto pt-8">
        <input
          type="text"
          value={email}
          className="w-full focus:border-indigo-600 border outline-none bg-bgPrimary  px-5 py-2 rounded-md shadow-md"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          className="w-full focus:border-indigo-600 border outline-none bg-bgPrimary  px-5 py-2 rounded-md shadow-md"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {message && <p className="text-red-500">{message}</p>}

        <button
          disabled={loginLoading}
          className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-2 rounded-md transition-all duration-300"
        >
          Login
        </button>
      </form>

      <div className="mt-5 flex space-x-1 justify-center text-xs sm:text-sm">
        <p className="italic text-slate-700">Dont have an account?</p>
        <Link to={"/register"} className="text-indigo-800 italic">
          👉 Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
