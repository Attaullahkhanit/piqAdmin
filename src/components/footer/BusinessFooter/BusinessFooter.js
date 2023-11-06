import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
function BusinessFooter({ pathname, routesToHideUserStatus }) {
  return (
    <Box className="business-footer">
      <Box className="left-area">
        <Box className="footer-item">© piq IT 2023</Box>
        <Box className="footer-item">Terms</Box>
        <Box className="footer-item">Privacy</Box>
      </Box>
      {/* {!routesToHideUserStatus.includes(pathname) && (
        <Box className="right-area">
          <Box className="profile-indicator-container">
            <Typography className="title">Viewing as Admin</Typography>
            <Typography className="name">John Doe</Typography>
          </Box>
        </Box>
      )} */}
    </Box>
  );
}

export default BusinessFooter;
