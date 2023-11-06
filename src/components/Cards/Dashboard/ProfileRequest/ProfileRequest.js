import { Box, Typography } from "@mui/material";
import React from "react";
import "./profileRequest.scss";
import videoIcon from "../../../../assets/admin/Dashboard/video.png";
import shopIcon from "../../../../assets/admin/Dashboard/shop.png";
import dot from "../../../../assets/admin/Dashboard/dot.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileInformation } from "../../../../redux/slices/profileDataSlice";
import { setBusinessData } from "../../../../redux/slices/businessProfileSlice";

export default function ProfileRequest({
  type,
  title,
  category,
  time,
  id,
  index,
  formattedData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      className="profile-request"
      onClick={() => {
        dispatch(setBusinessData(formattedData));
        dispatch(setProfileInformation(formattedData))
        navigate(`/profiles/${index}/review`);
      }}
    >
      <Box className="left-area">
        <Box className="image-container">
          {type === "business" ? (
            <img src={shopIcon} alt="business" />
          ) : (
            <img src={videoIcon} alt="video" />
          )}
        </Box>
      </Box>
      <Box className="right-area">
        <Box className="title-container">
          <Typography className="title">{title}</Typography>
          <Typography className="time">{time}</Typography>
        </Box>
        <Box className="tags-container">
          <Typography className="tag">{category}</Typography>
          <img src={dot} className="divider" />
          <Typography className="tag">{id}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
