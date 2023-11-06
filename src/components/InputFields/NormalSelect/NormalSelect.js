import { MenuItem, Select } from "@mui/material";
import React from "react";
import "./styles.scss";

function NormalSelect({ onSelectChange, menuItems, selectValue }) {
  const itemsWithIcons = ["Review"];
  return (
    <Select
      className="normal-select"
      value={selectValue}
      onChange={onSelectChange}
      sx={{ border: "none" }}
    >
      {menuItems?.map((item) => (
        <MenuItem value={item}>{item}</MenuItem>
      ))}
    </Select>
  );
}

export default NormalSelect;
