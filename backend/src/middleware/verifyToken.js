const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET;

const verifyToken = (request, response, next) => {
  try {
    // const token = request.headers["authorization"].split(" ")[1];
    const token = request.cookies.token;
    if (!token)
      return response.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.userId)
      return response.status(401).json({ message: "User with invalid token" });

    request.userId = decoded.userId;
    request.role = decoded.role;

    // response.status(200).json({ message: `${token}` });
    next();
  } catch (error) {
    console.log(`Verify token error :: ${error}`);
    response.status(201).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
