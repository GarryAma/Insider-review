const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

//other way to define a schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//BEST PRACTICE WHEN YOU WANT TO HASH THE PASSWORD(IN THE SCHEMA)
UserSchema.pre("save", async function (next) {
  //"this" -> user object above
  const user = this;

  //we use "password" not user.password , because "password" is the name of the field, user.password it the current value
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

const User = model("User", UserSchema);

module.exports = User;
