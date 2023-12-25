import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: [true, "Please enter a username"],
    unique: true,
  },
  email: {
    type: "string",
    required: [true, "Please enter a email address"],
    unique: true,
  },
  password: {
    type: "string",
    required: [true, "Please enter a password"],
  },
  isVarified: {
    type: "boolean",
    default: false,
  },
  isAdmin: {
    type: "boolean",
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  varifyToken: String,
  varifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
