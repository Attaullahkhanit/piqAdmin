import { Typography } from "@mui/material";
import React from "react";
import "./styles.scss";
import { ReactComponent as PlusIcon } from "../../../assets/business/video/plus.svg";
import { ReactComponent as TrashIcon } from "../../../assets/business/video/trash.svg";
import { ReactComponent as BackgroundFade } from "../../../assets/business/video/fade.svg";
import videoDummyBg from "../../../assets/business/home/smoothie.png";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setVideoContent } from "../../../redux/slices/profileDataSlice";

export default function AllProfileVideos() {

  // Profile Information Data State
  const profileInformation = useSelector(state => state.profileData.profileInformation);
  console.log(profileInformation, 'profileinformation data')

  // Profile Selected Plan Data State
  const selectedPlan = useSelector(state => state.profileData.selectedPlan);
  console.log(selectedPlan, 'selectedPlan Data')

  // Profile Video Content Data State
  const videoContent = useSelector((state) => state.profileData.videoContent);
  console.log(videoContent, 'videoContent')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (index) => {

    dispatch(
      setVideoContent(
        videoContent.filter((item, itemIndex) => itemIndex !== index)
      )
    );
  };
  return (
    <div className="all-profile-videos-component">
      <div className="all-profile-videos-content-container">
        <Typography className="title">
          Add Videos ({videoContent.length} of 6)
        </Typography>
        <div className="all-profile-videos-content">
          <div
            className="add-new-video-container"
            onClick={() => {
              navigate("/profiles/video/add");
            }}
          >
            <PlusIcon className="plus-icon" />
            <Typography className="add-new-video-text">Add</Typography>
          </div>
          {videoContent.map((video, index) => (
            <div className="present-video-container">
              <img
                src={
                  video?.thumbnail || video.thumbnailFirebaseUrl || videoDummyBg
                }
                alt="video-bg"
                className="video-thumbnail"
              />
              <BackgroundFade className="background-fade" />
              <div className="top-area">
                <div className="status-pill">
                  <Typography className="status-text">Pending...</Typography>
                </div>
                <div
                  className="trash-button"
                  onClick={() => handleDelete(index)}
                >
                  <TrashIcon className="trash-icon" />
                </div>
              </div>
              <div className="bottom-area">
                <Typography className="video-title">{video?.title}</Typography>
                <Typography className="video-price">{video?.price}</Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="primary-button-container">
        <PrimaryButton
          text="Confirm"
          disabled={videoContent.length <= 6}
          onClick={() => navigate("/profiles/add")}
        />
      </div>
    </div>
  );
}
