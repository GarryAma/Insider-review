const express = require("express");
const Comment = require("../model/comment.model");

const router = express.Router();

//CREATE A COMMENT
router.post("/post-comment", async (request, response) => {
  try {
    const newComment = new Comment({ ...request.body });
    await newComment.save();

    response.status(200).json({
      message: "comment has been created successfully",
      comment: newComment,
    });
  } catch (error) {
    response.status(500).json({ message: "Error creating new comment" });
    console.log(`create-comment error :: ${error} `);
  }
});

//COUNT ALL COMMENTS
router.get("/total-comments", async (request, response) => {
  try {
    const totalComments = await Comment.countDocuments({});
    response
      .status(200)
      .json({
        message: "Total comments successfully retrieved",
        totalComments,
      });
  } catch (error) {
    response.status(500).json({ message: "Error calculate all comments" });
    console.log(`calculate-comment error :: ${error} `);
  }
});

module.exports = router;
