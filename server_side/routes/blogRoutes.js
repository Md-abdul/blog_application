const express = require("express");
const multer = require("multer");
const blogRoutes = express.Router();
const { blogModel } = require("../model/blog.model");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "masaiII");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Authentication failed" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

blogRoutes.post(
  "/addblog",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    const { title, content, tags } = req.body;
    const userId = req.user.authorID;

    if (!title || !content || !tags) {
      return res
        .status(400)
        .send({ message: "Title, content, and tags are required." });
    }

    if (!req.file) {
      return res.status(400).send({ message: "An image is required." });
    }

    try {
      const newBlog = new blogModel({
        title,
        content,
        tags,
        user: userId,
        image: `/uploads/${req.file.filename}`,
      });
      await newBlog.save();
      res
        .status(201)
        .send({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Failed to create blog", error: error.message });
    }
  }
);

blogRoutes.get("/allblogs", async (req, res) => {
  const { page = 1, limit = 10, tag, authorId } = req.query;

  const query = {};
  if (tag) query.tags = tag;
  if (authorId) query.user = authorId;

  try {
    const blogs = await blogModel
      .find(query)
      .populate("user", "name email")
      .limit(Number(limit));

    res.status(200).send(blogs);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch blogs", error: error.message });
  }
});

blogRoutes.get("/oneblog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id).populate("user", "name email");

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send(blog);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch the blog", error: error.message });
  }
});

blogRoutes.get("/myblogs", authenticate, async (req, res) => {
  const userId = req.user.authorID;

  try {
    const myBlogs = await blogModel.find({ user: userId });
    res.status(200).send(myBlogs);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch user's blogs", error: error.message });
  }
});

blogRoutes.put("/updateblog/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  const userId = req.user.authorID;

  try {
    const blog = await blogModel.findOne({ _id: id, user: userId });
    if (!blog) {
      return res
        .status(404)
        .send({ message: "Blog not found or not authorized" });
    }
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;

    await blog.save();
    res.status(200).send({ message: "Blog updated successfully", blog });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to update blog", error: error.message });
  }
});

blogRoutes.delete("/deleteblog/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.authorID;

  try {
    const blog = await blogModel.findOneAndDelete({ _id: id, user: userId });
    if (!blog) {
      return res
        .status(404)
        .send({ message: "Blog not found or not authorized" });
    }
    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to delete blog", error: error.message });
  }
});

module.exports = { blogRoutes };
