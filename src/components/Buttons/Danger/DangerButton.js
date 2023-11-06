import React from "react";
import './styles.scss';
export default function DangerButton({ text, onClick, height, width}) {
  return (
    <button
      className="danger-button"
      onClick={onClick}
      style={{ height: height, width: width }}

    >
      {text}
    </button>
  );
}
