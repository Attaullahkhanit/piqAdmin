import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import videoDummy from "../../../assets/admin/Content/videoDummyLarge.png";
import dot from "../../../assets/admin/Dashboard/dot.png";
import ReactPlayer from "react-player";
import "./styles.scss";
import ShowMore from "../../Util/ShowMore/ShowMore";

function SIngleVideoPlayback({ data, index, currentIndex, businessData }) {
  const [isPlaying, setIsPlaying] = React.useState(true);

  useEffect(() => {
    if (index === currentIndex) {
      setIsPlaying(true);
    }
  }, [currentIndex]);
  return (
    <div className="single-video-playback">
      {console.log('video data',data)}
      <Box className="video-container" id={`video-play-${index}`}>
        <Box className="video-content-outer">
          <Box className="video-content">
            <Box className="header-container">
              <img
                src={data?.businessImageUrl || businessData?.businessImageUrl}
                alt="profile"
              />
              <Typography className="text">
                {data?.businessName || businessData?.businessName}
              </Typography>
            </Box>
            <Box className="bottom-container">
              <Typography className="heading">{data?.assetName}</Typography>
              <Box className="tags-container">
                {data?.assetVideo?.videoTags?.map((tag, tagIndex) => (
                  <Box className="tag-group">
                    {/* <img src={data} alt="food" className="tag-image" /> */}
                    <Typography className="tag-text">{tag}</Typography>
                    {tagIndex + 1 !== data?.assetVideo?.videoTags?.length && (
                      <img src={dot} alt="divider" className="divider" />
                    )}
                  </Box>
                ))}
              </Box>
              <Box className="description-container">
                <Typography className="description-text">
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum...
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <div
          className="video-player"
          style={{ backgroundImage: data?.assetVideo?.videoThumbnailUrl }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <ReactPlayer
            url={data?.videoURL}
            width="100%"
            height="100%"
            controls={false}
            playing={true}
            //loop={true}
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

export default SIngleVideoPlayback;
