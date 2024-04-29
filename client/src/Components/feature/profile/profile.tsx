import { Avatar, Button } from "@mui/material";
import "./profile.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Profile = () => {
  return (
    <>
      <div className="heading">Welcome to your Profile</div>
      <div className="profileWrapper">
        <Avatar
          alt="Cindy Baker"
          src=""
          sx={{ width: 156, height: 156 }}
          className="avatarImage"
        />
        <br />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload profile photo
          {<VisuallyHiddenInput type="file" />}
        </Button>
        <br />
        <br />

        <p>
          Username:- <span>username</span>
        </p>
        <p>
          Email Id:- <span>email</span>
        </p>
      </div>
    </>
  );
};

export default Profile;
