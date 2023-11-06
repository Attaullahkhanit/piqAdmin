import React from "react";
import "./styles.scss";
import tickGreen from "../../../../../assets/admin/Profile/tickGreen.png";
import tickGrey from "../../../../../assets/admin/Profile/tickgrey.png";
import arrowRight from "../../../../../assets/admin/Profile/arrowRight.png";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "../../../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import addNewProfile from "../../../../../apis/profile/addNewProfile";
import Loader from "../../../../../components/Util/Loader/Loader";
function AddProfileProgress() {
  const completed = false;
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profileData);
  const [profileUploading, setProfileUploading] = React.useState(false);
  const videoData = useSelector((state) => state.profileData.videoContent);

  const handleProfileComplete = () => {
    setProfileUploading(true);
    addNewProfile(profileData)
      .then((res) => {
        setProfileUploading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (completed) {
    return (
      <div className="add-profile-progress-completed">
        <img src={tickGreen} alt="tick-green" />
        <Typography className="title">Profile Completed</Typography>
      </div>
    );
  } else {
    return (
      <div className="add-profile-progress">
        <Box className="progress-container">
          <Typography className="title">You’re almost there!</Typography>
          <Typography className="sub-title">Just a few more steps.</Typography>
          <Box className="progress-card">
            <Box className="left-area">
              <img src={tickGreen} alt="tick-green" />
            </Box>
            <Box className="right-area">
              <Box className="content-area">
                <Typography className="card-title">
                  Add Profile Information
                </Typography>
                <Typography className="card-detail">~ 1 minutes</Typography>
              </Box>
              <Box className="arrow-container">
                <img src={arrowRight} alt="arrow-right" />
              </Box>
            </Box>
          </Box>
          <Box className="progress-card">
            <Box className="left-area">
              <img
                src={videoData.length >= 6 ? tickGreen : tickGrey}
                alt="tick-green"
              />
            </Box>
            <Box className="right-area">
              <Box className="content-area">
                <Typography className="card-title">
                  Add Video Content
                </Typography>
                <Typography className="card-detail">
                  ~ {videoData.length} of 6 uploaded
                </Typography>
              </Box>
              <Box
                className="arrow-container"
                onClick={() => {
                  navigate("/profiles/video/all");
                }}
              >
                <img src={arrowRight} alt="arrow-right" />
              </Box>
            </Box>
          </Box>
          {/* <Box className="progress-card">
            <Box className="left-area">
              <img src={tickGrey} alt="tick-green" />
            </Box>
            <Box className="right-area">
              <Box className="content-area">
                <Typography className="card-title">Choose a plan</Typography>
                <Typography className="card-detail">~ 1 minutes</Typography>
              </Box>
              <Box
                className="arrow-container"
                onClick={() => {
                  navigate("/subscription");
                }}
              >
                <img src={arrowRight} alt="arrow-right" />
              </Box>
            </Box>
          </Box> */}
        </Box>
        <Box className="complete-button-container">
          <Loader loading={profileUploading}>
            <PrimaryButton
              text={"Complete Setup"}
              // disabled={false}
              disabled={videoData.length < 6}
              onClick={handleProfileComplete}
            />
          </Loader>
        </Box>
      </div>
    );
  }
}

export default AddProfileProgress;
