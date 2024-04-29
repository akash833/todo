import bcrypt  from 'bcrypt';
import UserModel from "../models/user.js";
import { Request, Response } from "express";
import { sendEmail } from '../helper/sendEmail.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }
    const jwtKey = process.env.JWT_KEY as string;
    const token = jwt.sign({userId:user._id},jwtKey, { expiresIn: '1d' })

    res.cookie('Bearer token:', token);
  
    res.json({
      success: true,
      message: "Successfully login",
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: "Server error",
    });
  }
}

export async function signupUser(req: Request, res: Response) {
  try {
    const { username,email, password } = req.body;
    const user = await UserModel.findOne({ 
      $or: [
        {username},
        {email}
      ]
    });
    if (user) {
      return res.json({
        success: false,
        message: "user already exist",
      });
    }

    const bcyptPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: bcyptPassword,
    });

    const jwtKey = process.env.JWT_KEY as string;
    const token = jwt.sign({userId: newUser._id},jwtKey, { expiresIn: '1d' })

    res.cookie('Bearer token:', token);

    res.json({
      success: true,
      message: "Successfully Singup",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
}

export async function forgetPassword(req: Request, res: Response){
  try{
    const { username } = req.body;

    const user = await UserModel.findOne({ 
      $or : [
        {username:username},
        {email:username}
      ]
     });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    await sendEmail(user.email);

  }catch(err){
    res.json({
      success: false,
      message: "Server error",
    });
  }
}
