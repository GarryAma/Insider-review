const express = require("express");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

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

//LOGIN
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    // find the user
    const user = await User.find({ email });
    console.log(user[0]._doc);

    //if no user
    if (!user) return response.status(404).json({ message: "user not found" });

    //exclude the password
    const { password: pass, ...rest } = user[0]._doc;
    console.log(rest);

    const isMatch = await bcrypt.compare(password, user[0]._doc.password);

    if (!isMatch)
      return response.status(401).json({ message: "Invalid credentials" });

    response.status(200).json({ message: "Login successfully", user: rest });
  } catch (error) {
    response.status(500).json({ message: "Error user login" });
    console.log(`login-failed error :: ${error} `);
  }
});

module.exports = router;
