const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: String,
  coverImg: String,
  category: String,
  author: String, //=> this will be modified after user created, author will come from user model
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
