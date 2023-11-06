import { Box, Typography } from "@mui/material";
import "./businessProfileCard.scss";
import React from "react";
import addressIcon from "../../../../assets/admin/Profile/addressIcon.png";
import shopIcon from "../../../../assets/admin/Dashboard/shop.png";
import emailIcon from "../../../../assets/admin/Profile/email.png";
import phoneIcon from "../../../../assets/admin/Profile/phone.png";
import PrimaryButton from "../../../Buttons/Primary/PrimaryButton";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";
import approveProfileInFirebase from "../../../../apis/dashboard/Profiles/approveProfile";
import Loader from "../../../Util/Loader/Loader";
function BusinessProfileCard({
  businessTitle,
  businessType,
  time,
  address,
  tags,
  businessHeadDetails,
  socialsLinks,
  onTitleClick,
  id,
  handleApprove,
  handleReject,
  loading,
  hideButtons,
}) {
  return (
    <Box className="business-profile-card">
      <Box className="top-area">
        <Box className="left-area">
          <img src={shopIcon} alt="business" />
        </Box>
        <Box className="right-area">
          <Box className="header-area">
            <Box className="title-Area">
              <Box className="title-container">
                <Typography className="title" onClick={onTitleClick}>
                  {businessTitle}
                </Typography>
                <Typography className="type">{businessType}</Typography>
              </Box>
              <Box className="time-container">
                <Typography className="time">{time}</Typography>
              </Box>
            </Box>
            <Box className="address-area">
              <img src={addressIcon} alt="address" />
              <Typography className="address">{address}</Typography>
            </Box>
            <Box className="tags-area">
              {tags.map((tag) => (
                <Box className="tag">
                  <Typography className="tag-title">{tag}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          {businessHeadDetails && (
            <Box className="business-head-area">
              <Box className="name-area">
                <Typography className="name">
                  {businessHeadDetails.name}
                </Typography>
                <Typography className="position">
                  {businessHeadDetails.position}
                </Typography>
              </Box>
              <Box className="contact-area">
                <Box className="contact">
                  <img src={emailIcon} alt="email" />
                  <Typography className="text">
                    {businessHeadDetails.email}
                  </Typography>
                </Box>
                <Box className="contact">
                  <img src={phoneIcon} alt="phone" />
                  <Typography className="text">
                    {businessHeadDetails.phone}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          <Box className="socials-area">
            {socialsLinks.map((social) => (
              <Box className="social">
                <img src={social.icon} alt={social.link} />
                <Typography className="social-link">{social.link}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {!hideButtons && <Box sx={{ margin: "15px 10px" }}>
        <Loader loading={loading}>
          <Box className="bottom-area">
            <SecondaryButton
              text={"Deny"}
              height={"70px"}
              onClick={() => handleReject(id)}
            />
            <PrimaryButton
              text={"Approve"}
              height={"70px"}
              onClick={() => handleApprove(id)}
            />
          </Box>
        </Loader>
      </Box>}
    </Box>
  );
}

export default BusinessProfileCard;
