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
  isVerified: {
    type: "boolean",
    default: false,
  },
  isAdmin: {
    type: "boolean",
    default: false,
  },
  forgotPasswordToken: { type: "string", default: undefined },
  forgotPasswordTokenExpiry: { type: "date", default: undefined },
  verifyToken: { type: "string", default: undefined },
  verifyTokenExpiry: { type: "date", default: undefined },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
