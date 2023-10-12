import express from "express";
import {
  blogsByUser,
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
  viewBlog,
} from "../Controllers/blog-controller.js";

export const blogRouter = express.Router();

blogRouter.get("/all-blogs", getAllBlogs);

blogRouter.post("/create", createBlog);

blogRouter.put("/update/:id", updateBlog);

blogRouter.get("/:id", viewBlog);

blogRouter.delete("/delete/:id", deleteBlog);

blogRouter.get("/user-blogs/:id", blogsByUser);
