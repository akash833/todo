import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  task: { type: String, enum: ["done", "pending", "later"] },
  createdBy: { type: mongoose.Types.ObjectId },
  createdOn: { type: Date, default: Date.now() },
});

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;
