import React, { useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { AxiosToastError } from "../utils/AxiosToastError";
import { API } from "../axios/axios";
import { SummaryApi } from "../api/SummaryAPI";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { setShowLoginPage, loginData, setLoginData, setToken, navigate } =
    useAppContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API({
        ...SummaryApi.adminLogin,
        data: loginData,
      });
      console.log("Response", response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        setToken(responseData.token);
        localStorage.setItem("token", responseData.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${responseData.token}`;
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  console.log("Login Data", loginData);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm flex items-center justify-center">
      <div className="border shadow-md border-gray-200 rounded-lg bg-white mx-5 max-w-5xl sm:mx-auto px-3 py-5 flex flex-col items-center justify-center gap-2">
        <div className=" w-full">
          <img
            src={assets.cross_icon}
            onClick={() => setShowLoginPage(false)}
            className="cursor-pointer hover:scale-105 transition-all duration-500"
          />
        </div>
        <h1 className="text-3xl font-semibold mt-5">
          Admin <span className="text-primary">Login</span>
        </h1>
        <p className="text-lg text-gray-600 w-sm text-center">
          Enter your credentials to access the admin panel
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
            className="border-gray-300 border-b mb-3 px-2 py-3 bg-white/50 rounded-lg outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
            className="border-gray-300 border-b px-2 py-3 bg-white/70 rounded-lg outline-none mb-4"
          />
          <button
            type="submit"
            className="border py-3 bg-primary text-white rounded-full hover:scale-102 transition-all duration-500 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
