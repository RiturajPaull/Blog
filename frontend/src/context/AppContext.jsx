import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../axios/axios";
// import { SummaryApi } from "../api/SummaryAPI";
import { AxiosToastError } from "../utils/AxiosToastError";
import axios from "axios";
import { SummaryApi } from "../api/SummaryAPI";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showLoginPage, setShowLoginPage] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await API({
        ...SummaryApi.allBlogs,
      });
      console.log("All Blogs fetched", response);
      const { data: responseData } = response;
      console.log(responseData);
      if (responseData.success) {
        console.log(responseData.blog);
        setBlogs(responseData.blog);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);
  useEffect(() => {
    console.log("Blogs state in context:", blogs); // 👈 Check if blogs state updates
  }, [blogs]);
  const value = {
    showLoginPage,
    setShowLoginPage,
    loginData,
    setLoginData,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    navigate,
    fetchBlogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
