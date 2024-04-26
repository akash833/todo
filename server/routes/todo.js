import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/:userId", getTodos);
router.post("/", createTodo);
router.patch("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

export default router;
