import React  from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top", // Display at the top
        horizontal: "right", // Display at the right
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
