import express from "express";
const app = express();
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;

import connectDb from "./config/database.js";
import router from "./routes/todo.js";
connectDb();

app.use(cors());

app.use(express.json());

app.use("/todo", router);

app.listen(PORT, () => {
  console.log(`Server is listen at ${PORT}`);
});
