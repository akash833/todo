import { useEffect, useState } from "react";
import axios from "axios";
import List from "../List";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Todo.css";
import { Button, Popover, TextField, Typography } from "@mui/material";
export interface TodoItem {
  title: string;
  description: string;
  id: string;
}

const TodoForm = () => {
  const { userId } = useParams();
  const [todo, setTodo] = useState<TodoItem[]>([
    {
      title: "This is a Title",
      description: "This is a Description",
      id: "2",
    },
  ]);
  const [title, setTitle] = useState<string>("");
  const [description, setDesc] = useState<string>("");

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getTodos = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/todo/${userId}`);
      if (!res.data.success) {
        return toast("Able to get data");
      }

      setTodo(res.data.result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getTodos();
    return () => {
      // Any cleanup logic here
    };
  }, [userId]);

  const createTodo = async (e: any) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/todo", {
      title,
      description,
      userId,
    });
    setTitle("");
    setDesc("");
    getTodos();
    handleClose();
  };

  const handleUpdate = async (id: string) => {
    await axios.patch(`http://localhost:4000/todo/${id}`, {
      title,
      description,
    });
    getTodos();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:4000/todo/${id}`);
    getTodos();
  };

  return (
    <div className="wrapper">
      <div className="header">
        <div className="app">Todo App</div>
        <div className="add">
          <Button variant="contained" color="success" onClick={handleClick}>
            Add Todo
          </Button>
        </div>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="none"
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            minWidth: "10%",
            overflowY: "auto",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            paddingTop: "5px",
          },
        }}
      >
        <Typography className="formWrapper">
          <form onSubmit={createTodo} className="form">
            <div className="addTask">Add Task</div>
            <div className="inputField">
              <TextField
                label="Title"
                variant="standard"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: "100%" }}
              />
            </div>
            <div className="inputField">
              <TextField
                multiline
                rows={6}
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                required
                sx={{ width: "100%" }}
              />
            </div>
            <div className="btn">
              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                Add Todo
              </Button>
            </div>
          </form>
        </Typography>
      </Popover>

      {todo.map((item) => (
        <List
          item={item}
          handleDelete={() => handleDelete(item.id)}
          handleUpdate={() => handleUpdate(item.id)}
        />
      ))}
    </div>
  );
};

export default TodoForm;
