import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const res = await axios.post(`http://localhost:4000/login`, {
      username,
      password,
    });
    if (!res.data.success) {
      return toast(res.data.message);
    }
    const user = res.data.result;
    navigate(`/todo/${user.userId}`);
  };

  const handleClick = () => {
    navigate("/sign-up");
  };

  return (
    <div className="loginWrapper">
      <div className="childWrapper">
        
      </div>
      <h2>Login Page</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          Create Account <button onClick={handleClick}>Click here</button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
