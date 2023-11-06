import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
import addressIcon from "../../../../assets/admin/Profile/addressIcon.png";
import shopIcon from "../../../../assets/admin/Dashboard/shop.png";
import emailIcon from "../../../../assets/admin/Profile/email.png";
import phoneIcon from "../../../../assets/admin/Profile/phone.png";
import PrimaryButton from "../../../Buttons/Primary/PrimaryButton";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";
function UserProfileCard({
  name,
  type,
  time,
  tags,
  contactDetails,
  onTitleClick
}) {
  return (
    <Box className="user-profile-card">
      <Box className="top-area">
        <Box className="left-area">
          <img src={shopIcon} alt="business" />
        </Box>
        <Box className="right-area">
          <Box className="header-area">
            <Box className="title-Area">
              <Box className="title-container">
                <Typography className="title" onClick={onTitleClick}>{name}</Typography>
                <Typography className="type">{type}</Typography>
              </Box>
              <Box className="time-container">
                <Typography className="time">{time}</Typography>
              </Box>
            </Box>
          </Box>
          {contactDetails && (
            <Box className="business-head-area">
              <Box className="contact-area">
                <Box className="contact">
                  <img src={emailIcon} alt="email" />
                  <Typography className="text">
                    {contactDetails.email}
                  </Typography>
                </Box>
                <Box className="contact">
                  <img src={phoneIcon} alt="phone" />
                  <Typography className="text">
                    {contactDetails.phone}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          <Box className="tags-area">
            {tags.map((tag) => (
              <Box className="tag">
                <img src={tag.image} alt={tag.title} />
                <Typography className="tag-title">{tag.title}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfileCard;
