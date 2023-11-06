import { Typography } from "@mui/material";
import React from "react";
import './styles.scss'

function AddProfileHeader() {
  return (
    <div className="add-profile-header">
      <Typography className="heading">Add a new profile 🤝</Typography>
      <Typography className="descriptio">
        Let’s start by adding some information.
      </Typography>
    </div>
  );
}

export default AddProfileHeader;
