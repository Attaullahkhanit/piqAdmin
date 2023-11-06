import { TextField } from "@mui/material";
import React from "react";
import "./styles.scss";
function MultilineInput({placeholder,minRows,maxRows,value,onChange}) {
  return (
    <TextField
      id="filled-textarea"
      placeholder={placeholder}
      className="multiline-input"
      multiline
      variant="outlined"
      maxRows={4}
      minRows={4}
      value={value}
      onChange={onChange}
    />
  );
}

export default MultilineInput;
