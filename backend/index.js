const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

//routes
const blogRoutes = require("./src/routes/blog.route");
app.use("/api/blogs", blogRoutes);

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
