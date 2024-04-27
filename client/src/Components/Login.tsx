import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(event);
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
        <div className="imageContainer">
          <img
            src="https://c8.alamy.com/comp/2BE5RAF/a-girl-working-in-laptopillustration-concept-of-work-from-home-2BE5RAF.jpg"
            alt=""
            height="100%"
            width="100%"
          />
        </div>
        <div className="loginContainer">
          <h2 className="login">Login!</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
              className="username"
            />
            <br />
            <br />
            <FormControl sx={{ width: "100%" }} variant="outlined" required>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <br />
            <br />

            <div style={{ textAlign: "center" }}>
              Create a new Account?
              <span onClick={handleClick}>
                <Button variant="text">Sign Up</Button>
              </span>
            </div>
            <div className="btnWrapper">
              <Button
                sx={{ textAlign: "center", width: "100%" }}
                type="submit"
                variant="outlined"
              >
                Login
              </Button>
              <br />
              <br />
              <Button className="googleSignUp" variant="contained">
                <GoogleIcon sx={{ marginRight: "10px" }} />
                Continue with Google
              </Button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;
