import React from "react";
import "./styles.scss";
import { Typography } from "@mui/material";
export default function ManageBusinessProfilesHeader({
  links,
  selectedLink,
  setSelectedLink,
}) {
  return (
    <div className="manage-business-profiles-haeder">
      <div className="title">Manage Profile</div>
      <div className="links-container">
        {links.map((link, index) => (
          <Typography
            className={`link-text${selectedLink === index ? "-selected" : ""}`}
            onClick={() => setSelectedLink(index)}
          >
            {link}
          </Typography>
        ))}
      </div>
    </div>
  );
}
