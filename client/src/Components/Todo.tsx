import { useEffect, useState } from "react";
import axios from "axios";
import List from "../List";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export interface TodoItem {
  title: string;
  description: string;
  id: string;
}

const TodoForm = () => {
  const { userId } = useParams();
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDesc] = useState<string>("");

  const getTodos = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/todo/${userId}`);
      if(!res.data.success){
        return toast("Able to get data")
      }
      
      setTodo(res.data.result);
    } catch (error) {
      console.error('Error fetching user data:', error);
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
    await axios.post("http://localhost:4000/todo",{
      title,
      description,
      userId
    })
    setTitle('');
    setDesc('');
    getTodos();
  }

  const handleUpdate = async (id:string) => {
    await axios.patch(`http://localhost:4000/todo/${id}`,{
      title,
      description
    })
    getTodos();
  }

  const handleDelete = async (id:string) => {
    await axios.delete(`http://localhost:4000/todo/${id}`)
    getTodos()
  }

  return (
    <div className="wrapper">
      <form onSubmit={createTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Todo</button>
      </form>

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