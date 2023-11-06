import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import videoDummy from "../../../assets/admin/Content/videoDummyLarge.png";
import dot from "../../../assets/admin/Dashboard/dot.png";
import ReactPlayer from "react-player";
import "./stylesvideo.scss";
import { ReactComponent as LogoPiqIcon } from "../../../assets/admin/Profile/viewasset/logoicon.svg";
import { ReactComponent as LogoIcon } from "../../../assets/admin/Profile/viewasset/BusinessLogo.svg";
import { ReactComponent as ShopingIcon } from "../../../assets/admin/Profile/viewasset/shopping-bag (2).svg";
import { ReactComponent as SaveIcon } from "../../../assets/admin/Profile/viewasset/save.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/admin/Profile/viewasset/profile icon.svg";
import ShowMore from "../../Util/ShowMore/ShowMore";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function VideoPlayBackDetail({
  data,
  index,
  currentIndex,
  businessData,
  videoURL,
}) {
  console.log("updated asset data", data);
  const location = useLocation();
  console.log(location, "asdflaksdfja hsdhd jsjsj");
  const navigate = useNavigate();
  const params = useParams();
  const allPlayBackVideoData = location?.state;
  const videoUrl = location?.state?.video?.videoURL;
  console.log(videoUrl, "videoUrl");
  const [isPlaying, setIsPlaying] = React.useState(true);

  const [playing, setPlaying] = useState(true);
  const vidRef = useRef(null);

  const [saved, setSaved] = useState(false);

  const businessName = location?.state?.business?.businessName;

  const startVideo = () => {
    vidRef.current.pause();
    setPlaying(false);
  };

  const pauseVideo = () => {
    vidRef.current.play();
    setPlaying(true);
  };

  const handleVideoPress = () => {
    if (playing) {
      startVideo();
    } else {
      pauseVideo();
    }
  };

  // useEffect(() => {
  //   if (index === currentIndex) {
  //     setIsPlaying(true);
  //   }
  // }, [currentIndex]);
  return (
    <div className="single-video-playback">
      <Box className="video-container" id={`video-play-${index}`}>
        <Box className="video-content-outer">
          <Box className="video-content">
            <Box className="header-container">
              <LogoPiqIcon
                className="piq-log-icon"
                onClick={() => {
                  navigate("/");
                }}
              />
            </Box>
            <Box className="bottom-container">
              <Box className="description-container">
                {/* <div className="bottom-top-icon-name">
                  <ProfileIcon className="icon" />
                  <Typography className="name">
                    Created By {location?.state?.video?.assetName}
                  </Typography>
                </div> */}

                <div className="title-icon-container">
                  <Typography className="title">
                    {/* BlueBerry Pancakes */}
                    {data.assetName}
                  </Typography>
                  <div
                    onClick={() => {
                      setSaved(!saved);
                    }}
                  >
                    {saved === false ? (
                      <FaRegBookmark className="save-icon" />
                    ) : (
                      <FaBookmark className="save-icon" />
                    )}
                  </div>
                </div>
                <div className="percentage-tags-container">
                  <Typography className="percentage">$14.99</Typography>
                  <div className="tags">
                    <ul>
                      {data.ownerTags.map((item, index) => (
                        <li key={index}>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bottom-logo-lable">
                  {/* <LogoIcon className="logo" /> */}
                  <div className="container">
                    <div className="circle">
                      <img
                        className="logo"
                        alt="logo"
                        src={location?.state?.business?.logo}
                      ></img>
                    </div>
                  </div>

                  <div
                    className="bottom-lable"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    <ShopingIcon className="shoping-icon" />
                    <Typography
                      noWrap={true}
                      style={{
                        fontSize: "calc(0.36em + 1vmin)",
                        marginTop: "2px",
                        alignSelf: "center",
                        color: "#ffffff",
                        zIndex: "20",
                      }}
                      onClick={() => {
                        console.log("order");
                      }}
                    >
                      Order From {businessName && businessName}
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
          onClick={handleVideoPress}
          // style={{ backgroundImage: data?.assetVideo?.videoThumbnailUrl }}
          // onClick={handleVideoPress}
        >
          <video
            className="react-player"
            ref={vidRef}
            src={data.videoURL}
            autoplay="true"
            loop="true"
          ></video>
          {/* <ReactPlayer
            
            url={location?.state?.video?.videoURL}
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
          /> */}
        </div>
      </Box>
    </div>
  );
}

export default VideoPlayBackDetail;
