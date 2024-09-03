const express = require("express");
const User = require("../model/user.model");

const router = express.Router();

//REGISTER NEW USER
router.post("/register", async (request, response) => {
  try {
    const { username, password, email } = request.body;
    const user = new User({ email, password, username });
    await user.save();

    response
      .status(200)
      .json({ message: "User has been registered successfully", user });
  } catch (error) {
    response.status(500).json({ message: "Error register new user" });
    console.log(`registration-failed error :: ${error} `);
  }
});

module.exports = router;
