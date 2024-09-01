const express = require("express");
const Blog = require("../model/blog.model");

const router = express.Router();

//GET ALL BLOGS
router.get("/", async (request, response) => {
  try {
    const allBlogs = await Blog.find();
    response
      .status(200)
      .json({ message: "Posts retrieved successfully", posts: allBlogs });
  } catch (error) {
    console.log(`get-posts error :: ${error} `);
    response.status(500).json({ message: "Error getting posts" });
  }
});

//CREATE A BLOG POST
router.post("/create-post", async (request, response) => {
  try {
    const newPost = new Blog({ ...request.body });
    await newPost.save();
    response
      .status(200)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log(`create-post error :: ${error} `);
    response.status(500).json({ message: "Error creating post" });
  }
});

module.exports = router;
