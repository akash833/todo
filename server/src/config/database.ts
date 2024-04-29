import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todos");
  } catch (err) {
    console.log("Uable to connect database");
  }
};

export default connectDb;
