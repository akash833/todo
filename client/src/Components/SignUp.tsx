import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return toast(`Password doesn't match`);
    }
    const res = await axios.post(`http://localhost:4000/signup`, {
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
    navigate("/login");
  };

  return (
    <div>
      <h2>Signup Page</h2>
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
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          Already have an account ?{" "}
          <button onClick={handleClick}>Click here</button>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUpPage;
