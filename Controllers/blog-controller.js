import Blog from "../Models/Blog.js";
import User from "../Models/User.js";

export const getAllBlogs = async (req, res, next) => {
  let allBlogs;
  try {
    allBlogs = await Blog.find().populate("user", "name");
  } catch (error) {
    console.log(error);
  }
  if (!allBlogs) {
    return res.status(400).json({ message: "no blogs found" });
  }
  return res.status(200).json({ allBlogs });
};

export const createBlog = async (req, res) => {
  // console.log(req.body);
  const { title, description, image, user, createdOn } = req.body;

  let newImageURL;
  let st = image.indexOf("d/") + 2;
  let end = image.slice(st).indexOf("/");
  const imageID = image.substring(st, st + end);
  newImageURL = `https://drive.google.com/uc?export=view&id=${imageID}`;

  // let createdDate;
  // console.log(new Date(createdOn).());

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return res.status(400).json("Try again later.");
  }
  if (!existingUser) {
    return res.status(400).json("No user found.");
  }

  const blog = new Blog({
    title,
    description,
    image: newImageURL,
    user,
    createdOn,
  });

  try {
    // await blog.save();
    await blog.save();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Can't create blog at this moment." });
  }
  return res.status(201).json({ message: "Created Successfully" });
};

export const viewBlog = async (req, res) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId).populate("user", "name");
  } catch (error) {
    // console.log(error);
    return res.status(404).json({ message: "blog not found." });
  }
  if (!blog) {
    return res.status(404).json({ message: "blog not found." });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res) => {
  // console.log(req.body);
  const blogId = req.params.id;
  const { title, description, user } = req.body;
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (error) {
    return res.status(404).json({ message: "blog not found." });
  }
  if (!blog) {
    return res.status(404).json({ message: "blog not found." });
  }
  if (blog.user != user) {
    // console.log(blog.user);
    return res.status(404).json({ message: "user mismatch." });
  }
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    // console.log(error);
    return res.status(200).json({ message: "Operation failed." });
  }
  return res.status(200).json({ message: "Updated Successfully." });
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    await Blog.findByIdAndDelete(blogId);
  } catch (error) {
    // console.log(error);
    return res.status(200).json({ message: "Operation failed." });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};

export const blogsByUser = async (req, res, next) => {
  const user = req.params.id;
  let userBlogs;
  try {
    userBlogs = await Blog.find({ user });
  } catch (error) {
    console.log(error);
  }
  if (!userBlogs) {
    return res.status(400).json({ message: "no blogs found!!!" });
  }
  return res.status(200).json({ userBlogs });
};
