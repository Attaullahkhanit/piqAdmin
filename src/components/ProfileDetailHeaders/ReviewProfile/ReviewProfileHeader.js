import { Typography } from "@mui/material";
import React from "react";
import './styles.scss';
function ReviewProfileHeader() {
  return (
    <div className="review-profile-header">
      <Typography className="heading">Review Profile Request</Typography>
      <Typography className="descriptio">
        Double check all information for accuracy.
      </Typography>
    </div>
  );
}

export default ReviewProfileHeader;
