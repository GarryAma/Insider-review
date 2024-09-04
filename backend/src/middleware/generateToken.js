const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const JWT_SECRET = process.env.SECRET;

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found! :: generating token");
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    console.log(`Error generating token :: ${error}`);
    throw error;
  }
};

module.exports = generateToken;
