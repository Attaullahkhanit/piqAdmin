import React, { useEffect } from "react";
import "./iconInput.scss";
import { Typography } from "@mui/material";
function IconInput({
  icon,
  placeholder,
  value,
  onChange,
  error,
  id,
  showField,
  setShowField,
  type,
  dark,
  ref,
  disabled,
  errorMessage,
  phoneErrorMessage,
  websiteErrorMessage,
  position,
  onIconClick,
  onKeyDownFunction
}) {
  useEffect(() => {

    if (showField && position === "left") {
      const inputField = document.getElementById(id);
      inputField?.addEventListener("blur", () => {
        setShowField(false);
      });
    }

  }, [showField]);

  const isStringIcon = typeof icon === "string";
  const hasIcon = icon && (position === "left" || position === "right");

  return (
    <>
      <div className={dark ? "icon-input-field-dark" : "icon-input-field"}>
        {/* {icon && <img src={icon} alt="icon" />} */}
        {console.log(ref, 'refrefref')}
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          className={dark ? "dark" : "normal"}
          id={id}
          type={type ? type : "text"}
          step={type === "number" && 0.01}
          disabled={disabled}
          onKeyDown={onKeyDownFunction}
        />
        {hasIcon && (
          <div
            className={`icon-${position} ${onIconClick ? "clickable" : ""}`}
            onClick={onIconClick}
          >
            {isStringIcon ? <img src={icon} alt="icon" /> : icon}
          </div>
        )}
      </div>
      {errorMessage && <Typography className="icon-input-message-text">
        {errorMessage}
      </Typography>}

      {phoneErrorMessage && <Typography className="icon-input-message-text">
        {phoneErrorMessage}
      </Typography>}

      {websiteErrorMessage && <Typography className="icon-input-message-text">
        {websiteErrorMessage}
      </Typography>}
    </>
  );
}

export default IconInput;
