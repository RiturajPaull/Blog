import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  geminiAi,
  getAllBlogs,
  getBlogById,
  getIndividualBlogComment,
  togglePublish,
} from "../controller/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/get", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggleStatus", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comment", getIndividualBlogComment);
blogRouter.post("/gemini", geminiAi);
export default blogRouter;
