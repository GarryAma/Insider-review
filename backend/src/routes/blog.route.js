const express = require("express");
const Blog = require("../model/blog.model");
const Comment = require("../model/comment.model");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

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

    const allBlogs = await Blog.find(query)
      .populate("author", "email") //read:: because of author schema has ref to User, we have an access to Users's email.
      .sort({ createdAt: -1, _id: -1 });

    // console.log(allBlogs);
    response
      .status(200)
      .json({ message: "Posts retrieved successfully", posts: allBlogs });
  } catch (error) {
    console.log(`get-all-posts error :: ${error} `);
    response.status(500).json({ message: "Error getting posts" });
  }
});

//CREATE A BLOG POST
router.post("/create-post", verifyToken, isAdmin, async (request, response) => {
  try {
    const newPost = new Blog({ ...request.body, author: request.userId }); // author: request.userId will be added when token verified
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

    //*******NOT DONE!ITS DONE NOW!! => NEED FETCH RELATED COMMENT TO THE POST*********
    const comments = await Comment.find({ postId }).populate(
      //populate means take "user property" from Comment and i want only show username and email
      "user",
      "username email"
    );

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
router.patch("/update-post/:id", verifyToken, async (request, response) => {
  try {
    const { id: postId } = request.params;
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      { ...request.body },
      { new: true }
    );
    if (!updatedPost) {
      return response.status(404).json({ message: "Post not found" });
    }
    response
      .status(200)
      .json({ message: "Post has been updated successfully" });
  } catch (error) {
    console.log(`update-post error :: ${error} `);
    response.status(500).json({ message: "Error updating post" });
  }
});

//DELETE A BLOG POST
router.delete("/:id", verifyToken, async (request, response) => {
  try {
    const { id: postId } = request.params;

    const deletedPost = await Blog.findByIdAndDelete(postId);
    if (!deletedPost) {
      return response.status(404).json({ message: "Post not found" });
    }
    //DELETE RELATED COMMENT
    await Comment.deleteMany({ postId });

    response.status(200).json({
      message: "Post has been successfully deleted",
      post: deletedPost,
    });
  } catch (error) {
    console.log(`delete-post error :: ${error} `);
    response.status(500).json({ message: "Error deleting post" });
  }
});

//FIND RELATED POST
router.get("/related/:id", async (request, response) => {
  try {
    const { id: postId } = request.params;

    if (!postId) {
      return response.status(400).json({ message: "Post id is required" });
    }

    const blog = await Blog.findById(postId);

    if (!blog) {
      return response.status(404).json({ message: "Post is not found" });
    }

    const titleRegex = new RegExp(blog.title.split(" ").join("|"), "i");
    console.log(titleRegex);
    const relatedQuery = {
      _id: { $ne: postId }, //=> exclude the current id of the post
      title: { $regex: titleRegex },
      // content: { $regex: titleRegex },
    };
    const relatedPost = await Blog.find(relatedQuery);
    response
      .status(200)
      .json({ message: "related post found", post: relatedPost });
  } catch (error) {
    console.log(`related-post error :: ${error} `);
    response.status(500).json({ message: "Error fetching related post" });
  }
});

module.exports = router;
