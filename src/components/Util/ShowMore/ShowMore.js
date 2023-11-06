import { Typography } from "@mui/material";
import "./showMore.scss";
import React, { useState } from "react";

function ShowMore({ content, length }) {
  // function truncates the string to given length
  function truncateString(str, maxLength) {
    if (typeof str !== "string" || typeof maxLength !== "number") {
      throw new Error(
        "Invalid input: Both parameters must be a string and an integer."
      );
    }

    if (str.length <= maxLength) {
      return str;
    }

    return str.slice(0, maxLength);
  }
  // State Variables
  const [showComplete, setShowComplete] = useState(false);
  const [text, settext] = useState(truncateString(content, length));

  // handler
  const handleChange = () => {
    if (showComplete) {
      setShowComplete(false);
      settext(truncateString(content, length));
    } else {
      setShowComplete(true);
      settext(content);
    }
  };
  return (
    <Typography className="show-more-text">
      {text}
      <a onClick={handleChange}>{showComplete ? "  see less" : "...show more"}</a>
    </Typography>
  );
}

export default ShowMore;
