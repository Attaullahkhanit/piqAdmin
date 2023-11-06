import React, { useEffect, useState } from "react";
import "./FilterInput.scss";
import {
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function FilterInput({
  icon,
  placeholder,
  error,
  menuItems,
  selectValue,
  setSelectValue,
  value,
  onChange,
  onSelectChange,
  showField,
  setShowField,
  id,
}) {
  return (
    <Box className="filter-input-container">
      <div className="filter-input-field">
        <img src={icon} alt="icon" />
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          autoFocus
        />
        <Select
          className="select"
          value={selectValue}
          onChange={(e) => {
            onSelectChange(e.target.value);
          }}
          sx={{ border: "none" }}
        >
          {menuItems.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </div>
      {/* <div
        className="close-button"
        onClick={() => {
          setShowField(false);
        }}
      >
        <CloseIcon />
      </div> */}
    </Box>
    // <Box>

    // {/* <OutlinedInput
    //   className="filter-input-field"
    //   id={id}
    //   value={value}
    //   startAdornment={
    //       <InputAdornment position="start">
    //       <img src={icon} alt="icon" className="logo-image" />
    //     </InputAdornment>
    //   }
    //   placeholder={placeholder}
    //   endAdornment={
    //       <InputAdornment>
    //   <Select
    //     className="select"
    //     value={selectValue}
    //     onChange={setSelectValue}
    //     >
    //     <MenuItem value={10}>Ten</MenuItem>
    //     <MenuItem value={20}>Twenty</MenuItem>
    //     <MenuItem value={30}>Thirty</MenuItem>
    //   </Select>
    //     </InputAdornment>
    //   }
    //   /> */}
    //   <p>close</p>
    //   </Box>
  );
}

export default FilterInput;
