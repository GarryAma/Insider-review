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
    //user will be MONGOOSE OBJECT || convert it to normal js object if destructured required.
    const user = await User.findOne({ email });

    //if no user
    if (!user) return response.status(404).json({ message: "user not found" });

    //exclude the password
    const { password: userPassword, ...userData } = user.toObject();
    // console.log(userData);

    const isMatch = await bcrypt.compare(password, userPassword);

    if (!isMatch)
      return response.status(401).json({ message: "Invalid credentials" });

    //generate token
    const token = await generateToken(userData._id);

    //save it into cookies
    response.cookie("token", token, {
      httpOnly: true, //=> only http://localhost:8000/api/auth/login || NOT https://localhost....
      sameSite: "strict",
      secure: true,
    });

    response
      .status(200)
      .json({ message: "Login successfully", user: userData, token });
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

//GET ALL USERS
router.get("/users", async (request, response) => {
  try {
    const users = await User.find({}, "_id email username");
    response
      .status(200)
      .json({ message: "users has been successfully fetched", users });
  } catch (error) {
    response.status(500).json({ message: "Error fetching users details" });
    console.log(`fetching users-failed error :: ${error} `);
  }
});

//DELETE A USER
router.delete("/users/:id", async (request, response) => {
  try {
    const { id: userId } = request.params;

    //deleteOne -> accepting object query
    //findByIdAndDelete -> accepting single value not object
    const deletedUser = await User.deleteOne({ _id: userId });

    if (deletedUser.deletedCount === 0)
      return response
        .status(404)
        .json({ message: "User not found or has been deleted" });

    response
      .status(200)
      .json({ message: "User has been deleted successfully", deletedUser });
  } catch (error) {
    response.status(500).json({ message: "Error delete users details" });
    console.log(`delete users-failed error :: ${error} `);
  }
});

//UPDATE USER ROLE
router.patch("/users/:id", async (request, response) => {
  try {
    const { id: userId } = request.params;
    const { role } = request.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );
    response.status(200).json({
      message: "User's role has been updated successfully",
      updatedUser,
    });
  } catch (error) {
    response.status(500).json({ message: "Error updating users details" });
    console.log(`update users-failed error :: ${error} `);
  }
});

module.exports = router;
