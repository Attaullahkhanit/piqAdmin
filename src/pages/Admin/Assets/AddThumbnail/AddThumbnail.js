import React, { useRef } from "react";
import { Slider, Typography } from "@mui/material";
import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";

export default function AddThumbnail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [seekValue, setSeekValue] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const videoRef = useRef(null);
  const [thumbnail, setThumbnail] = React.useState(null);
  const [customThumbnail, setCustomThumbnail] = React.useState(false);
  const [customThumbnailPath, setCustomThumbnailPath] = React.useState("");

  // Function to handle submit
  const handleSubmit = () => {
    const businessId = location.state.businessId;
    const menuCategory = location.state.menuCategory;
    const title = location.state.title;
    const description = location.state.description;
    const price = location.state.price;
    const video = location.state.video;
    const videoSrc = location.state.videoSrc;
    const menuItem = location.state.menuItem;

    // If custom thumbnail is selected
    if (customThumbnail)
      navigate("/video/addDetail", { state: { businessId, menuCategory, title, description, thumbnail, video, price, videoSrc, menuItem } });

    // If screenshot from video slider is selected
    else {

      captureVideoScreenshot()
        .then((blob) => {

          if (location.pathname.includes("addBusiness"))
            navigate("/profiles/addBusiness/video/addDetail");

          else {
            const thumbnail = blob;
            navigate("/video/addDetail", { state: { businessId, menuCategory, title, description, thumbnail, video, price, videoSrc, menuItem } });
          }
        })
        .catch((error) => {
          // Something went wrong
        });
    }
  };

  // Function to capture video screenshot at current slider position
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

      // Converting to blob
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to capture screenshot as Blob"));
          }
        }, "image/png"); // You can also use 'image/jpeg' for JPEG format
      });
    }
  };

  // Function to handle custom thumbnail upload
  const handleCustomThumbnailUpload = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setCustomThumbnail(true);
    setCustomThumbnailPath(URL.createObjectURL(file));
  }

  return (
    <div className="edit-thumbnail-page">
      <div className="edit-thumbnail-content-area">

        {/* Video for thumbnail selection */}
        {!customThumbnail && <div className="video-bg">
          <ReactPlayer
            url={location.state.videoSrc}
            ref={videoRef}
            width="100%"
            height="100%"
            controls={false}
            playing={false}
            onReady={() => { setDuration(videoRef.current.getDuration()); }}
          />
        </div>}

        {/* Custom thumbnail */}
        {customThumbnail && <div className="video-bg">
          <img
            src={customThumbnailPath}
            alt="edit thumbnail background"
            height="100%"
            width="100%"
          />
        </div>}

        {/* Thumbnail slider */}
        {!customThumbnail && <div className="thumbnail-slider">
          <Slider
            aria-label="thumbnail"
            value={seekValue}
            min={0}
            max={duration}
            step={1}
            onChange={(e, newValue) => {
              setCustomThumbnail(false);
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
        </div>}

        {/* Text below thumbnail slider */}
        <Typography className="title-text">Edit Thumbnail</Typography>
        <label className="subtitle-text custom-image-upload-button">
          Or Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleCustomThumbnailUpload}
          />
        </label>
      </div>

      {/* Next button */}
      <div className="next-button-container">
        <PrimaryButton
          text={"Next"}
          onClick={() => { handleSubmit(); }}
        />
      </div>
    </div>
  );
}
