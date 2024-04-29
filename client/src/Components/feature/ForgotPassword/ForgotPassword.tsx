import { Button, TextField } from "@mui/material";
import "./forgot.css";
const ForgotPassword = () => {
  return (
    <div className="forgotWrapper">
      <form action="">
        <h1>Forgot Password!</h1>
        <br />

        <img
          src="https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg"
          alt=""
          height="200px"
          style={{ borderRadius: "50%", border: "2px solid gray" }}
        />
        <br />
        <br />
        <h2>No Worry 😇</h2>
        <br />

        <p>Enter your Username</p>
        <br />
        <br />

        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          required
          sx={{ width: "100%" }}
        />
        <br />
        <br />
        <br />

        <Button variant="outlined" sx={{ width: "100%" }}>
          Continue
        </Button>

        <br />
        <br />
        <br />

        <div style={{ fontWeight: "400", fontSize: "18px" }}>
          A message has been sent to your registered email Id, Please go through
          and confirm for getting the new password
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
