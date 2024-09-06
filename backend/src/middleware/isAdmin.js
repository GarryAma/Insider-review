const isAdmin = (request, response, next) => {
  if (request.role !== "admin") {
    return response.status(403).json({
      success: "false",
      message:
        "You are no allowed to perfom this action.Please try to login as an admin",
    });
  }
  next();
};

module.exports = isAdmin;
