import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import videoDummy from "../../../assets/admin/Content/videoDummyLarge.png";
import dot from "../../../assets/admin/Dashboard/dot.png";
import ReactPlayer from "react-player";
import "./styles.scss";
import { ReactComponent as LogoPiqIcon } from "../../../assets/admin/Profile/viewasset/logoicon.svg";
import { ReactComponent as LogoIcon } from "../../../assets/admin/Profile/viewasset/BusinessLogo.svg";
import { ReactComponent as ShopingIcon } from "../../../assets/admin/Profile/viewasset/shopping-bag (2).svg";
import { ReactComponent as SaveIcon } from "../../../assets/admin/Profile/viewasset/save.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/admin/Profile/viewasset/profile icon.svg";
import ShowMore from "../../Util/ShowMore/ShowMore";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function VideoViewAsset({ data, index, currentIndex, businessData, videoURL, 
  name,
  title,
  percentage,
  tags,
  descriptionText,
  thumbnailURL,
  videoURLProp} ) {
    // console.log(videoURLProp, 'videoURLPropo')
    console.log(tags, 'tags')
  const location = useLocation();
  console.log(location, "asdflaksdfja hsdhd jsjsj");
  const navigate = useNavigate();
  const params = useParams();
  const allPlayBackVideoData = location?.state;
  const videoUrl = location?.state?.video?.videoURL;
  console.log(videoUrl, "videoUrl");
  const [isPlaying, setIsPlaying] = React.useState(false);
  useEffect(() => {
    if (index === currentIndex) {
      setIsPlaying(true);
    }
  }, [currentIndex]);
  return (
    <div className="single-video-view-asset">
      <Box className="video-view-container" id={`video-play-${index}`}>
        <Box className="video-content-outer">
          <Box className="video-content">
            <Box className="header-container">
              <LogoPiqIcon className="piq-log-icon" />
            </Box>
            <Box className="bottom-container">
              <Box className="description-container">
                <div className="bottom-top-icon-name">
                  <ProfileIcon className="icon" />
                  {/* <Typography className="name">
                    {location?.state?.video?.assetName}
                  </Typography> */}
                  <Typography className="name">{name}</Typography>
                </div>
                <div className="title-icon-container">
                  <div>
                    {/* <Typography className="title">
                      {location?.state?.video?.creator}
                    </Typography> */}
                    <Typography className="title">
                      {title}
                    </Typography>
                  </div>
                  <SaveIcon className="save-icon" />
                </div>
                <div className="percentage-tags-container">
                  <Typography className="percentage">$14.99</Typography>
                  <div className="tags">
                    <ul>
                      {tags.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    {/* <ul>
                      <li >{tags}</li>
                    </ul> */}
                    {/* <ul>
                      <li key={index}>Food</li>
                      <li key={index}>Breakfast</li>
                      <li key={index}>Orange</li>
                      <li key={index}>Protien</li>
                    </ul> */}
                  </div>
                </div>
                <div className="bottom-logo-lable">
                  <LogoIcon className="logo" />
                  <div className="bottom-lable">
                    <ShopingIcon className="shoping-icon" />
                    {/* <Typography className="description-text">
                      {location?.state?.video?.assetName}
                    </Typography> */}
                    <Typography className="description-text">
                      {descriptionText}
                    </Typography>
                  </div>
                </div>
                <div className="divider"></div>
              </Box>
            </Box>
          </Box>
        </Box>
        <div
          className="video-player"
          style={{
            width: "379px",
            backgroundImage: thumbnailURL,
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <ReactPlayer
            url={videoURLProp}
            width="100%"
            height="100%"
            controls={false}
            playing={isPlaying}
            loop={true}
            onReady={() => {
              if (index === currentIndex) {
                setIsPlaying(true);
              }
            }}
          />
        </div>
      </Box>
    </div>
  );
}

export default VideoViewAsset;
