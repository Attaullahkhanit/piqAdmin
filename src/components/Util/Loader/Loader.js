import React from "react";
import "./styles.scss";
export default function Loader({ children, loading }) {
  if (loading) {
    return (
      <div className="custom-loader-container">
        <span class="loader"></span>
      </div>
    );
  } else {
    return children;
  }
}
