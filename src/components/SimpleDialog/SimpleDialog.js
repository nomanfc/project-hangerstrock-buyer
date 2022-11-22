import React from "react";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SimpleDialog = ({ open, handleClose, title, content, maxwidth }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      //   onClose={handleClose}
      TransitionComponent={Transition}
      transitionDuration={{
        enter: 500,
        exit: 500,
      }}
      PaperProps={{
        style: {
          minHeight: "100vh",
          maxHeight: "100%",
          maxWidth: maxwidth || "500px",
          position: "absolute",
          right: "0",
          top: "0",
        },
      }}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#2e7d32" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {content}
    </Dialog>
  );
};

export default SimpleDialog;
