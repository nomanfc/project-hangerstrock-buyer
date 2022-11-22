import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";

/* Material Alerts */
import Alert from "@mui/material/Alert";

import { change_password } from "../../http_requests/httpreq";

const ChangePasswordForm = () => {
  // Show Password State
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Input Value State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });

  //Handle Form Submit
  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      //password mismatch
      setMessage({ ...message, message: "Password Mismatch", type: "error" });
    } else {
      await change_password(1, oldPassword, newPassword)
        .then((res) =>
          setMessage({
            ...message,
            message: res.data.message,
            type: res.data.success === 1 ? "success" : "error",
          })
        )
        .catch((error) =>
          setMessage({ ...message, message: error.message, type: "error" })
        );
    }
  };

  return (
    <form>
      <List>
        {message.message && (
          <ListItem>
            <Alert
              variant="standard"
              severity={message.type}
              sx={{ width: "100%" }}
            >
              {message.message}
            </Alert>
          </ListItem>
        )}
        <ListItem>
          <TextField
            id="outlined-error"
            label="Old Password"
            fullWidth
            size="small"
            required
            type={showPassword ? "text" : "password"}
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              // toggle button
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="outlined-error"
            label="New Password"
            fullWidth
            size="small"
            required
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="outlined-error"
            label="Confirm Password"
            fullWidth
            size="small"
            required
            type="password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            endIcon={<SendIcon />}
            disableElevation
            onClick={handleSubmit}
          >
            Change Password
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default ChangePasswordForm;
