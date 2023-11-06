import React from "react";
import "./profile.scss";
import { Box, Typography } from "@mui/material";
import piqIcon from "../../../../assets/admin/Dashboard/piqIcon.png";
import shareIcon from "../../../../assets/admin/Dashboard/shareIcon.png";
import videoIcon from "../../../../assets/admin/Dashboard/videoIcon.png";
import saveIcon from "../../../../assets/admin/Dashboard/saveIcon.png";
import dotIcon from "../../../../assets/admin/Dashboard/dot.png";
function Profile({
  profileImage,
  name,
  tags,
  view,
  saves,
  shares,
  placeholder,
  subscription,
  onClick
}) {

  //const image = profileImage || placeholder;

  return (
    <Box className="profile-card" onClick={onClick}>
      <Box className="top-area">
        <Box className="image-area">
          <img src={(profileImage.length > 1) ? profileImage : placeholder} />
        </Box>
        <Box className="title-area">
          <Typography className="title">{name}</Typography>

          <Box className="tags-container">
            {tags.map((tag, index) => (
              <Box className="tag-outer">
                <Typography className="tag">{tag}</Typography>
                {index !== tags.length - 1 && (
                  <img src={dotIcon} alt="divider" className="divider" />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="bottom-area">
        <Box className="kpi-container">
          <Box className="kpi-title-area">
            <img src={videoIcon} alt="video" />
            <Typography className="kpi-title">Views</Typography>
          </Box>
          <Typography className="kpi-value">{view}</Typography>
        </Box>
        <Box className="kpi-container">
          <Box className="kpi-title-area">
            <img src={saveIcon} alt="save" />
            <Typography className="kpi-title">Saves</Typography>
          </Box>
          <Typography className="kpi-value">{saves}</Typography>
        </Box>
        <Box className="kpi-container">
          <Box className="kpi-title-area">
            <img src={shareIcon} alt="share" />
            <Typography className="kpi-title">Shares</Typography>
          </Box>
          <Typography className="kpi-value">{shares}</Typography>
        </Box>
        <Box className="kpi-container">
          <Box className="kpi-title-area">
            <img src={piqIcon} alt="piq" />
            <Typography className="kpi-title">Subscription</Typography>
          </Box>
          <Typography className="kpi-value">{subscription}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
