import React from "react";
import "./styles.scss";
function SecondaryButton({ text, onClick, height }) {
  return (
    <button
      className="secondary-button"
      onClick={onClick}
      style={{ height: height }}
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
