import TodoModel from "../models/todo.js";
// Always use Async await and try catch

export async function getTodos(req, res) {
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

export async function createTodo(req, res) {
  try {
    const { title, description, task = "pending" } = req.body;

    const todo = await TodoModel.create({
      title,
      description,
      task,
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

export async function updateTodo(req, res) {
  try {
    const { title, description, task } = req.body;
    const todoId = req.params.todoId;
    if (["done" | "pending" | "later"].includes(task)) {
      throw new Exception("task is not valid");
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
export async function deleteTodo(req, res) {
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
