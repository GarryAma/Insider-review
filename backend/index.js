require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./src/routes/blog.route");
const commentRoute = require("./src/routes/comment.route");
const authRouter = require("./src/routes/auth.user.route");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoute);
app.use("/api/auth/", authRouter);

const main = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URL);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const connect = async () => {
  try {
    const response = await main();
    console.log("MONGODB CONNECTED");
    app.get("/", (request, response) => {
      response.send("Insider Review server is running");
    });
  } catch (error) {
    console.log("SOMETHING WRONG WITH THE CONNECTION");
    console.log(error);
  }
};

connect();

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
