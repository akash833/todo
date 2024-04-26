import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    const isPasswordValid = await bcrypt.compare(user.password, password);
    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.json({
      success: true,
      message: "Successfully login",
      result: {
        username: user.username,
        userId: user._id,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
}

export async function signupUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.json({
        success: false,
        message: "username already exist",
      });
    }

    const bcyptPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      password: bcyptPassword,
    });

    res.json({
      success: true,
      message: "Successfully Singup",
      result: {
        username: newUser.username,
        userId: newUser._id,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
}
