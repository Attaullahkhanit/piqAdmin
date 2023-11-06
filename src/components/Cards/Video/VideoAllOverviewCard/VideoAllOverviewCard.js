import React from "react";
import "./styles.scss";
import draggableIcon from "../../../../assets/business/home/draggableIcon.png";
import { ReactComponent as VideoPlayer } from "../../../../assets/admin/ProfileDashboard/alloverview/videoplayericon.svg";
import videoIcon from "../../../../assets/business/home/video.png";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { numberKiloMillion } from "../../../../utils/numberKiloMillion";

export default function VideoAllOverviewCard({
  pending,
  image,
  price,
  title,
  views,
  viewasset,
  playbackvideoDetail,
  thumbnailList,
}) {
console.log(thumbnailList,thumbnailList[title], title, 'thumbnailListthumbnailList')
  return (
    <div className="video-all-overview-card" onClick={viewasset}>
      <div className="video-details-container" onClick={playbackvideoDetail}>
        {pending ? (
          <div className="top-area">
            <Typography className="pending">Pending...</Typography>
          </div>
        ) : (
          <div className="top-area">
            <Grid container justify="space-around" spacing={4} className="video-fram-container">
                <img
                    src={draggableIcon}
                    alt="draggable"
                    className="draggable-icon"
                />
                {thumbnailList[title].map((image,index) => 
                <div className="video-view-container">
                    <div className="video-container">
                        <div><Typography className="numberic-value" key={index}>{numberKiloMillion(image.views)}</Typography></div>
                        <div><VideoPlayer alt="videoplayer" className="video-player-icon"/></div>
                    </div>
                </div>
                )}
                <Grid item xs={6} className="frame-thumbnail-container-first">
                {thumbnailList[title]?.slice(0, 2)?.map((image, index) => (
                    <img key={index} src={image.thumbnail} alt={"image.alt"} className="container-image" />
                ))}
                </Grid>
                <Grid item xs={6} className="frame-thumbnail-container">
                    {thumbnailList[title]?.slice(2, 4)?.map((image, index) => (
                        <img key={index} src={image.thumbnail} alt={"image.alt"} className="container-image"/>
                    ))}
                </Grid>
            </Grid>
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
