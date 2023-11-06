import React, { useRef } from "react";
import editThumbnailBg from "../../../assets/business/video/editThumbnailBg.png";
import thumbnailSlider from "../../../assets/business/video/thumbnailSlider.png";
import { Slider, Typography } from "@mui/material";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { setVideoContent } from "../../../redux/slices/profileDataSlice";
import { blobToBase64 } from "../../../components/ImageCropper/utils";
import uploadToFirestoreStorage from "../../../utils/uploadToFirestoreStorage";

export default function EditThumbnail() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoContent = useSelector((state) => state.profileData.videoContent);
  const [seekValue, setSeekValue] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [videoPlayer, setVideoPlayer] = React.useState(null);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const handleSubmit = () => {
    const thumbnailUrl = captureVideoScreenshot();
    uploadToFirestoreStorage(thumbnailUrl, "images", "", true).then((res) => {
      dispatch(
        setVideoContent(
          videoContent.map((item, i) => {
            if (i === videoContent.length - 1) {
              return {
                ...item,
                thumbnailFirebaseUrl: res,
              };
            } else {
              return item;
            }
          })
        )
      );
    });
    dispatch(
      setVideoContent(
        videoContent.map((item, i) => {
          if (i === videoContent.length - 1) {
            return {
              ...item,
              thumbnail: thumbnailUrl,
            };
          } else {
            return item;
          }
        })
      )
    );
    if (location.pathname.includes("/business")) {
      navigate("/business/video/addDetail");
    } else {
      navigate("/profiles/video/addDetail");
    }
  };

  const captureVideoScreenshot = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current.getInternalPlayer();
      videoElement.id = "video-element";
      videoElement.crossOrigin = "anonymous";
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      canvas.crossOrigin = "anonymous";
      const imageData = canvas.toDataURL("image/png"); // You can also use 'image/jpeg' for JPEG format

      return imageData;
    }
  };

  return (
    <div className="edit-thumbnail-page">
      <div className="edit-thumbnail-content-area">
        {/* <img
          src={editThumbnailBg}
          alt="edit thumbnail background"
          className="edit-thumbnail-bg"
        /> */}
        <div className="video-bg">
          <ReactPlayer
            url={videoContent[videoContent.length - 1].videoUrl}
            ref={videoRef}
            width="100%"
            height="100%"
            controls={false}
            playing={false}
            onReady={() => {
              setDuration(videoRef.current.getDuration());
              setVideoPlayer(videoRef.current.getInternalPlayer());
            }}
          />
        </div>
        {/* <img
          src={thumbnailSlider}
          alt="thumbnail slider"
          className="thumbnail-slider"
        /> */}
        <div className="thumbnail-slider">
          <Slider
            aria-label="thumbnail"
            value={seekValue}
            min={0}
            max={duration}
            step={1}
            onChange={(e, newValue) => {
              setSeekValue(newValue);
              videoRef.current.seekTo(newValue, "seconds");
            }}
            config={{
              file: {
                attributes: {
                  crossorigin: "anonymous",
                },
              },
            }}
          />
        </div>
        <Typography className="title-text">Edit Thumbnail</Typography>
        <Typography className="subtitle-text">Or Upload Photo</Typography>
      </div>
      {/* {screenshotData && <img src={screenshotData} alt="screenshot" />} */}
      <div className="next-button-container">
        <PrimaryButton
          text={"Next"}
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
    </div>
  );
}
