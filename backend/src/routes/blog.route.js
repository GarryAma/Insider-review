const express = require("express");
const Blog = require("../model/blog.model");

const router = express.Router();

//GET ALL BLOGS
router.get("/", async (request, response) => {
  try {
    //adding query to find specific data
    const { search, category, location } = request.query;

    let query = {};

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      query = { ...query, category };
    }

    if (location) {
      query = { ...query.location };
    }

    const allBlogs = await Blog.find(query).sort({ createdAt: -1 });
    response
      .status(200)
      .json({ message: "Posts retrieved successfully", posts: allBlogs });
  } catch (error) {
    console.log(`get-all-posts error :: ${error} `);
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

//GET SINGLE BLOG BY ID
router.get("/:id", async (request, response) => {
  try {
    const { id: postId } = request.params;
    const postById = await Blog.findById(postId);

    if (!postById) {
      return response.status(404).json({ message: "Post not found" });
    }

    //*******NOT DONE! => NEED FETCH RELATED COMMENT TO THE POST*********

    response.status(200).json({
      message: "Post by id has been successfully retrieved",
      post: postById,
    });
  } catch (error) {
    console.log(`get-single-post error :: ${error} `);
    response.status(500).json({ message: "Error getting single post" });
  }
});

//UPDATE POST/BLOG
router.patch("/update-post/:id", async (request, response) => {
  try {
    const { id: postId } = request.params;
    const updatedBlog = await Blog.findByIdAndUpdate(
      postId,
      { ...request.body },
      { new: true }
    );
    console.log(updatedBlog);
  } catch (error) {
    console.log(`update-post error :: ${error} `);
    response.status(500).json({ message: "Error updating post" });
  }
});

module.exports = router;
