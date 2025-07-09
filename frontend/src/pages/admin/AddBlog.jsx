import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { API } from "../../axios/axios";
import { SummaryApi } from "../../api/SummaryAPI";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";
const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { token } = useAppContext();

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        isPublished,
        category,
      };
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);
      const response = await API({
        ...SummaryApi.uploadBlog,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Uploaded Blog", response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setIsPublished(false);
        quillRef.current.root.innerHTML = null;
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    // initialte quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter the title");
    try {
      setLoading(true);
      const response = await API({
        ...SummaryApi.generate,
        data: {
          prompt: title,
        },
      });
      console.log("AI response", response);
      const { data: responseData } = response;
      if (responseData.success) {
        quillRef.current.root.innerHTML = parse(responseData.response);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full  max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          value={title}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          value={subTitle}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            disabled={loading}
            type="button"
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
            onClick={generateContent}
          >
            {loading ? "Generating...." : "Generate with AI"}
          </button>
        </div>
        <p className=" mt-4">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="border px-5 py-3 text-md mt-4 border-gray-400 rounded"
        >
          <option>Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className=" mt-4 flex items-center gap-4 py-3">
          <p>Publish Now</p>
          <input
            onChange={(e) => setIsPublished(e.target.checked)}
            type="checkbox"
            checked={isPublished}
            className=" block cursor-pointer"
          />
        </div>
        <button
          disabled={isAdding}
          type="submit"
          className="block border mt-4 px-15 py-2 rounded text-lg bg-primary text-white"
        >
          {isAdding ? "Adding blog....." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
