import express from "express";
import { forgetPassword, loginUser, signupUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);
userRouter.post("/forgetPassword", forgetPassword);

export default userRouter;
