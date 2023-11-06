import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Typography } from "@mui/material";
import { videoTypeOptions } from "./videoOptionsContent";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideoContent } from "../../../redux/slices/profileDataSlice";
import uploadToFirestoreStorage from "../../../utils/uploadToFirestoreStorage";

export default function AddVideo() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoFirebaseUrl, setVideoFirebaseUrl] = useState(null);
  const [videoName, setVideoName] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const videoContent = useSelector((state) => state.profileData.videoContent);

  const handleVideoChange = (event) => {
    setVideoUploaded(false);
    const file = event.target.files[0];
    setVideoName(file.name);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    uploadToFirestoreStorage(file, "videos", "", false)
      .then((url) => {
        setVideoFirebaseUrl(url);
        setVideoUploaded(true)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    dispatch(
      setVideoContent([
        ...videoContent,
        {
          videoUrl,
          videoName,
          videoType: videoTypeOptions[selectedIndex].title,
          thumbnail: null,
          firebaseUrl: videoFirebaseUrl,
        },
      ])
    );
    if (location.pathname.includes("business"))
      navigate("/business/video/editThumbnail");
    else {
      navigate("/profiles/video/editThumbnail");
    }
  };

  return (
    <div className="add-video">
      <div className="add-video-content-container">
        <Typography className="title-text">
          1. What will this video showcase?
        </Typography>
        <div className="type-container">
          {videoTypeOptions.map((option, index) => {
            const Logo = option.icon;
            return (
              <div
                key={index}
                className={`type-card${
                  selectedIndex === index ? " selected" : " normal"
                }`}
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                <Logo fill={selectedIndex === index ? "#ffae00" : "white"} />
                <Typography
                  className={`type-text${
                    selectedIndex === index ? " selected-text" : " normal-text"
                  }`}
                >
                  {option.title}
                </Typography>
              </div>
            );
          })}
        </div>
        <Typography className="description-text">
          {videoTypeOptions[selectedIndex].description}
        </Typography>
        <div className="upload-container">
          <div className="upload-text-container">
            <Typography className="title-text">2. Add Video</Typography>
            <Typography className="subtitle-text">
              HD videos in portrait (vertical) orientation ONLY
            </Typography>
          </div>
          <div className="upload-button-area">
            <div className="button-container">
              <label htmlFor={"videoInput"} className={"primary-button-input"}>
                <input
                  type="file"
                  accept=".mp4"
                  id={"videoInput"}
                  style={{ display: "none" }}
                  onChange={handleVideoChange}
                />
                Add
              </label>
            </div>
            {videoName && (
              <Typography className="subtitle-text">{videoName}</Typography>
            )}
          </div>
        </div>
      </div>
      <div className="next-button-container">
        <PrimaryButton
          text={"Next"}
          disabled={!videoUploaded}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
