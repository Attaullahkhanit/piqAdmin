import React from "react";
import "./styles.scss";
import draggableIcon from "../../../../assets/business/home/draggableIcon.png";
import videoIcon from "../../../../assets/business/home/video.png";
import { Box, Typography } from "@mui/material";

export default function SneakPiqOverviewCard({
  pending,
  image,
  price,
  title,
  views,
  viewasset,
}) {
  return (
    <div className="video-overview-card" onClick={viewasset}>
      {/* {console.log('video image',image)} */}
      <img src={image} alt="video" className="video-image" />
      <div className="video-details-container">
        {pending ? (
          <div className="top-area">
            <Typography className="pending">Pending...</Typography>
          </div>
        ) : (
          <div className="top-area">
          <Typography className="sneakpiq-title">{title}</Typography>
          </div>
        )}

        {/* <div className="bottom-area">
          <Typography className="title">{title}</Typography>
          <Typography className="price">{price}</Typography>
        </div> */}
      </div>
    </div>
  );
}
