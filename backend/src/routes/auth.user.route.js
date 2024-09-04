const express = require("express");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");

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
    // console.log(user);
    //if no user
    if (!user) return response.status(404).json({ message: "user not found" });

    //exclude the password
    const { password: pass, ...rest } = user[0]._doc;
    // console.log(rest);

    const isMatch = await bcrypt.compare(password, user[0]._doc.password);

    if (!isMatch)
      return response.status(401).json({ message: "Invalid credentials" });

    //generate token
    const token = await generateToken(rest._id);

    //save it into cookies
    response.cookie("token", token, {
      httpOnly: true, //=> only http://localhost:8000/api/auth/login || NOT https://localhost....
      sameSite: "strict",
      secure: true,
    });

    response
      .status(200)
      .json({ message: "Login successfully", user: rest, token });
  } catch (error) {
    response.status(500).json({ message: "Error user login" });
    console.log(`login-failed error :: ${error} `);
  }
});

//USER LOGOUT
router.post("/logout", async (request, response) => {
  try {
    response.clearCookie("token");
    response.status(200).json({ message: "You are logged out successfully" });
  } catch (error) {
    response.status(500).json({ message: "Error user logout" });
    console.log(`logout-failed error :: ${error} `);
  }
});

module.exports = router;
