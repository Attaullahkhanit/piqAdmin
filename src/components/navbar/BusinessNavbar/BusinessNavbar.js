import React from "react";
import "./styles.scss";
import piqLogo from "../../../assets/admin/common/piqLogo.png";
import profileDummy from "../../../assets/business/navbar/profileDummy.png";
import arrowDown from "../../../assets/business/navbar/arrowDown.png";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function BusinessNavbar({ hideProfileSwitch }) {
  const profiles = [
    { image: profileDummy, name: "John Doe", username: "John Doe" },
    { image: profileDummy, name: "John Doe", username: "John Doe" },
    { image: profileDummy, name: "John Doe", username: "John Doe" },
    { image: profileDummy, name: "John Doe", username: "John Doe" },
  ];
  const navigate = useNavigate();
  const [profilesOpen, setProfilesOpen] = React.useState(false);
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Box className="business-navbar">
      <Box className="left-area">
        <Box className="logo-area">
          <img
            src={piqLogo}
            alt="logo"
            onClick={() => {
              isLoggedIn && location.pathname !== "/" && navigate("/");
            }}
          />
        </Box>
        <Box className="menu-area">
          <Typography
            className={`menu-item${
              location.pathname.includes("/dashboard") ? "-selected" : ""
            }`}
            onClick={() => {
              navigate("/");
            }}>
            Dashboard
          </Typography>
          <Typography
            className={`menu-item${
              location.pathname.includes("/content") ? "-selected" : ""
            }`}
            onClick={() => {
              navigate("/content/chooseProfile");
            }}>
            Content
          </Typography>
          <Typography
            className={`menu-item${
              location.pathname.includes("/profiles") ? "-selected" : ""
            }`}
            onClick={() => {
              navigate("/profiles/requests/list");
            }}>
            Profiles
          </Typography>
          <Typography
            className={`menu-item${
              location.pathname.includes("/notifications") ? "-selected" : ""
            }`}>
            Notifications
          </Typography>
        </Box>
      </Box>
      {/* <Box className="right-area">
        {!hideProfileSwitch && (
          <Box
            className={profilesOpen ? "profile-area-opened" : "profile-area"}
            onClick={() => {
              setProfilesOpen(!profilesOpen);
            }}>
            {profilesOpen ? (
              profiles.map((profile, index) => (
                <Box className="profile-card">
                  <img src={profileDummy} alt="profile" />
                  <Box className="profile-info">
                    <Typography className="profile-name">John Doe</Typography>
                    <Typography className="user-name">John Doe</Typography>
                  </Box>
                  {index === 0 && (
                    <img
                      className="arrow-down"
                      src={arrowDown}
                      alt="arrow-down"
                    />
                  )}
                </Box>
              ))
            ) : (
              <Box className="profile-card">
                <img src={profileDummy} alt="profile" />
                <Box className="profile-info">
                  <Typography className="profile-name">John Doe</Typography>
                  <Typography className="user-name">John Doe</Typography>
                </Box>
                <img className="arrow-down" src={arrowDown} alt="arrow-down" />
              </Box>
            )}
          </Box>
        )}
      </Box> */}
    </Box>
  );
}

export default BusinessNavbar;
