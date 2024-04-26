import mongoose from "mongoose";
import todoModel from "../models/todo.js";

export async function getTodos(req, res) {
  const todos = await todoModel.find({});
  res.json({
    success: true,
    message: "get successfully",
    result: todos,
  });
}

export async function getTodoById(req, res) {
  const todoId = req.params.todoId;
  const todo = await todoModel.findById(todoId);
  res.json({
    success: true,
    message: "get successfully",
    result: todo,
  });
}

export async function createTodo(req, res) {
  const { title, description, task } = req.body;
  if (["done" | "pending" | "later"].includes(task)) {
    throw new Exception("task is not valid");
  }

  const todo = await todoModel.create({
    title,
    description,
    task,
  });
  await res.json({
    message: "Created successfully",
    result: todo,
  });
}

export async function updateTodo(req, res) {
  const { title, description, task } = req.body;
  const todoId = req.params.todoId;
  if (["done" | "pending" | "later"].includes(task)) {
    throw new Exception("task is not valid");
  }

  await todoModel.findByIdAndUpdate(todoId, {
    title,
    description,
    task,
  });
  await res.json({
    message: "Updated successfully",
  });
}
export async function deleteTodo(req, res) {
  const todoId = req.params.todoId;

  await todoModel.findByIdAndDelete(todoId);
  await res.json({
    message: "Deleted successfully",
  });
}
