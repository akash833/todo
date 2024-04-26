import express from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/", getTodos);
router.get("/:todoId", getTodoById);
router.post("/", createTodo);
router.patch("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

export default router;
