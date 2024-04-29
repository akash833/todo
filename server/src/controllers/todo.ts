import TodoModel from "../models/todo.js";
import { Request, Response } from "express";

export async function getTodos(req: Request, res:Response) {
  try {
    const userId = req.params.userId;
    const todos = await TodoModel.find(
      { createdBy: userId },
      {
        title: true,
        description: true,
        id: "$_id",
        _id: false,
      }
    );

    res.json({
      success: true,
      message: "get successfully",
      result: todos,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
}

export async function createTodo(req: Request, res:Response) {
  try {
    const { title, description, task = "pending" } = req.body as Record<string,string>;
    const userId = req.body.userId;
    if (["done" , "pending" , "later"].includes(task)) {
      throw new Error("task is not valid");
    }

    const todo = await TodoModel.create({
      title,
      description,
      task,
      createdBy: userId,
    });
    await res.json({
      message: "Created successfully",
      result: {
        id: todo._id,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
}

export async function updateTodo(req: Request, res:Response) {
  try {
    const { title, description, task } = req.body;
    const todoId = req.params.todoId;
    if (["done", "pending", "later"].includes(task)) {
      throw new Error("task is not valid");
    }

    await TodoModel.findByIdAndUpdate(
      todoId,
      {
        title,
        description,
        task,
      },
      {
        title: true,
        description: true,
        id: "$_id",
        _id: false,
      }
    );
    await res.json({
      message: "Updated successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
}
export async function deleteTodo(req: Request, res:Response) {
  try {
    const todoId = req.params.todoId;

    await TodoModel.findByIdAndDelete(todoId);
    await res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
}
