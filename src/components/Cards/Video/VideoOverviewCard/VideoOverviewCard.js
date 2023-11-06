import React from "react";
import "./styles.scss";
import draggableIcon from "../../../../assets/business/home/draggableIcon.png";
import videoIcon from "../../../../assets/business/home/video.png";
import trashIcon from "../../../../assets/business/home/trash.svg";
import { Box, Typography } from "@mui/material";

export default function VideoOverviewCard({
  pending,
  image,
  price,
  title,
  views,
  viewasset,
  playbackvideoDetail,
}) {
  return (
    <div className="video-overview-card" onClick={viewasset}>
      <img src={image} alt="video" className="video-image" />
      <div className="video-details-container" onClick={playbackvideoDetail}>
        {pending ? (
          <div className="top-area">
            <Typography className="pending">Pending...</Typography>
          </div>
        ) : (
          <div className="top-area">
            <div className="top-area-row">
              <img
                src={draggableIcon}
                alt="draggable"
                className="draggable-icon"
              />
            </div>
            <Box className="views-container">
              <Typography className="views">{views}</Typography>
              <img src={videoIcon} alt="video" className="video-icon" />
            </Box>
          </div>
        )}
        <div className="bottom-area">
          <Typography className="title">{title}</Typography>
          <Typography className="price">{price}</Typography>
        </div>
      </div>
    </div>
  );
}
