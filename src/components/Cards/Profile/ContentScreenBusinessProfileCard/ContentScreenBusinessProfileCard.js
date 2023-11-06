import React from "react";
import "./styles.scss";
import { Typography } from "@mui/material";
import addressIcon from "../../../../assets/admin/Profile/addressIcon.png";
import profilePicture from "../../../../assets/admin/Profile/profilePicture.png";
import userPlaceholder from "../../../../assets/admin/Profile/userPlaceholder.png"
import dotIcon from "../../../../assets/admin/Dashboard/dot.png";
export default function ContentScreenBusinessProfileCard({
  profiledata,
  onClick,
}) {
  console.log(profiledata.businessImageUrl.length)
  return (
    <div className="content-screen-business-profile-card" onClick={onClick}>
      <div className="left-area">
        <img src={(profiledata.businessImageUrl.length > 1) ? profiledata.businessImageUrl : userPlaceholder} alt="profile" className="profile-picture" />
      </div>
      <div className="right-area">
        <div className="title-area">
          <div className="title-container">
            <Typography className="title-text">
              {profiledata?.businessName}
            </Typography>
            <div className="pill-container">
              <Typography className="type-text">{profiledata?.city}</Typography>
            </div>
          </div>
          <Typography className="time-text">
            {profiledata?.businessName}
          </Typography>
        </div>
        <div className="address-area">
          <img src={addressIcon} alt="address" className="address-icon" />
          <Typography className="address-text">
            {profiledata?.address}
          </Typography>
        </div>
        <div className="tags-area">
          <div className="tag-container">
            <Typography className="tag-text">
              {profiledata?.subCategories}
            </Typography>
            <img src={dotIcon} alt="divider" className="divider" />
          </div>
        </div>
      </div>
    </div>
  );
}
