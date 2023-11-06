import React from "react";
import "./styles.scss";
function OutlineButton({ text, onClick, height }) {
  return (
    <button
      className="outline-button"
      onClick={onClick}
      style={{ height: height }}
    >
      {text}
    </button>
  );
}

export default OutlineButton;
