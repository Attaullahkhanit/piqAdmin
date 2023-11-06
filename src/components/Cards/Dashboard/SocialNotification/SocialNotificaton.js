import React from "react";
import "./socialNotification.scss";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import ShowMore from "../../../Util/ShowMore/ShowMore";

function SocialNotificaton({
  logo,
  title,
  description,
  time,
  status,
  reach,
  opened,
  openRate,
  uninstalls,
}) {
  return (
    <Box className="social-notification-card">
      <Box className="top-area">
        <Box className="left-area">
          <img src={logo} alt="social-icon" />
        </Box>
        <Box className="right-area">
          <Box className="title-area">
            <Typography className="title">{title}</Typography>
            <Typography className="time">{time}</Typography>
          </Box>
          <Box className="description-area">
            <ShowMore content={description} length={50} />
          </Box>
        </Box>
      </Box>
      <Box className="bottom-area">
        <Box className="items-container">
          <Typography className="title">Status</Typography>
          <Typography className="value">{status}</Typography>
        </Box>
        <Box className="items-container">
          <Typography className="title">Reach</Typography>
          <Typography className="value">{reach}</Typography>
        </Box>
        <Box className="items-container">
          <Typography className="title">Opened</Typography>
          <Typography className="value">{opened}</Typography>
        </Box>
        <Box className="items-container">
          <Typography className="title">Open Rate</Typography>
          <Typography className="value">{openRate}</Typography>
        </Box>
        <Box className="items-container">
          <Typography className="title">Uninstalls</Typography>
          <Typography className="value">{uninstalls}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SocialNotificaton;
