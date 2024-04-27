import { Visibility, VisibilityOff } from "@mui/icons-material";
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

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const navigate = useNavigate();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
    else if (name === "email") setEmail(value);
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
    <div className="loginWrapper">
      <div className="childWrapper">
        <div className="imageContainer">
          <img
            src=" https://cdn-lite.ip2location.com/img/sign-up.png "
            alt=""
            height="100%"
            width="100%"
          />
        </div>
        <div className="loginContainer">
          <h2 className="login">Sign Up!</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              name="username"
              onChange={handleInputChange}
              required
              className="username"
            />
            <br />
            <br />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              name="email"
              onChange={handleInputChange}
              required
              className="username"
            />
            <br />
            <br />

            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={handleInputChange}
                required
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

            <FormControl sx={{ width: "100%" }} variant="outlined" required>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {!showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <br />
            <br />
            <div style={{ textAlign: "center" }}>
              Already have an Account?
              <span onClick={handleClick}>
                <Button variant="text">Login</Button>
              </span>
            </div>
            <div className="btnWrapper">
              <Button
                sx={{ textAlign: "center", width: "100%" }}
                type="submit"
                variant="outlined"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUpPage;
