import React, { useEffect, useState } from "react";
import "./mainDesktopLayout.scss";
import Footer from "../../components/footer/Footer";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import AdminPortalNavbar from "../../components/navbar/AdminPortalNavbar";

export default function MainDesktopLayout({ children }) {
  const theme = useTheme();
  // const isSmall = useMediaQuery(theme.breakpoints.down("980"));
  const location = useLocation();
  const routesToHideNavLinks = [
    "/profiles/video/all",
    "/profiles/video/add",
    "/profiles/video/editThumbnail",
    "/profiles/video/addDetail",
    "/profiles/video/addTags",
    "/profiles/video/uploadSuccess",
  ];
  return (
    <div className={"mainDesktopLayout admin-background-layout"}>
      <div className="navbar-container">
        <AdminPortalNavbar
          routesToHideNavLinks={routesToHideNavLinks}
          pathname={location.pathname}
        />
      </div>
      <div className={"admin-content"}>{children}</div>
      {/* {!isSmall ||
        (!location.pathname.includes("admin") && (
          <div className="footer-container">
            <Footer />
          </div>
        ))} */}
    </div>
  );
}
