import express from "express";
import {
  adminLogin,
  approveCommentByid,
  deleteCommentById,
  getAllBlogAdmin,
  getAllComments,
  getDashboardData,
} from "../controller/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/all-blog", getAllBlogAdmin);
adminRouter.get("/all-comment", getAllComments);
adminRouter.get("/dash-data", getDashboardData);
adminRouter.post("/delete-comment", deleteCommentById);
adminRouter.post("/approve-comment", approveCommentByid);

export default adminRouter;
