import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
