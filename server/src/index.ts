import express from "express";
const app = express();
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;

import connectDb from "./config/database.js";
connectDb();
import router from "./routes/todo.js";
import userRouter from "./routes/user.js";

app.use(cors());

app.use(express.json());

app.use("/", userRouter);
app.use("/todo", router);

app.listen(PORT, () => {
  console.log(`Server is listen at ${PORT}`);
});
