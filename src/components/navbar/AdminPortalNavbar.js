import React from "react";
import "./AdminPortalNavbar.scss";
import { Box } from "@mui/material";
import PiqLogo from "../../assets/admin/common/piqLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../Buttons/Primary/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/slices/auth";

export default function AdminPortalNavbar({ routesToHideNavLinks, pathname }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Box className="admin-portal-navbar">
      <Box className="left-area">
        <img
          src={PiqLogo}
          alt="piq-logo"
          onClick={() => {
            isLoggedIn && location.pathname !== "/" && navigate("/");
          }}
        />
        {!routesToHideNavLinks.includes(pathname) && isLoggedIn && (
          <p
            className={`nav-link ${location.pathname === "/" && "selected"}`}
            onClick={() => {
              navigate("/");
            }}>
            Dashboard
          </p>
        )}
        {!routesToHideNavLinks.includes(pathname) && isLoggedIn && (
          <p
            className={`nav-link ${
              location.pathname.includes("content") && "selected"
            }`}
            onClick={() => {
              navigate("/content/list");
            }}>
            Content
          </p>
        )}
        {!routesToHideNavLinks.includes(pathname) && isLoggedIn && (
          <p
            className={`nav-link ${
              location.pathname.includes("profiles") && "selected"
            }`}
            onClick={() => {
              navigate("/profiles/requests/list");
            }}>
            Profiles
          </p>
        )}
        {!routesToHideNavLinks.includes(pathname) && isLoggedIn && (
          <p
            className={`nav-link ${
              location.pathname.includes("notifications") && "selected"
            }`}
            onClick={() => {
              navigate("/notifications/manage");
            }}>
            Notifications
          </p>
        )}
      </Box>
      {isLoggedIn && (
        <Box className="right-area">
          <PrimaryButton
            text={"Sign Out"}
            className="logout-button"
            onClick={() => {
              dispatch(Logout());
            }}
          />
        </Box>
      )}
    </Box>
  );
}
