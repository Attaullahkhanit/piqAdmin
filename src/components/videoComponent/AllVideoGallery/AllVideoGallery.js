import React from "react";
import VideoOverviewCard from "../../Cards/Video/VideoOverviewCard/VideoOverviewCard";
import { Box, Grid, Typography } from "@mui/material";
import "./styles.scss";
import IconInput from "../../InputFields/IconInput/IconInput";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
import VideoAllOverview from "../../Cards/Video/VideoAllOverviewCard/VideoAllOverviewCard";
import VideoAllOverviewCard from "../../Cards/Video/VideoAllOverviewCard/VideoAllOverviewCard";

function AllVideoGallery({ businessVideos, handleVideoData }) {
  const navigate = useNavigate();
  //const businessVideos = videosDummycontent.data.assets;
  console.log("business videos", businessVideos);
  //console.log(businessVideos[key][0] ? businessVideos[key][0].thumbnail : "", 'vidddd')
  return (
    // <BusinessProfileDashboard>
    <div className="video-menu-content">
      <div className="navbar-flex">
        <div className="w-20">
          {/* <h2>Breakfast (20)</h2> */}
          <h2>Menu (All)</h2>
        </div>
        <div className="w-30">
          <IconInput placeholder="Search" />
        </div>
        <div className="w-50">
          <PrimaryButton
            text="+ Add Offering"
            width="42%"
            height="50px"
            onClick={() => {
              // Sending current business id to add asset page
              const currentPathname = window.location.pathname;
              const parts = currentPathname.split("/");
              const businessId = parts[parts.length - 1];
              navigate("/profile/addAsset", { state: { businessId } });
            }}
          />
        </div>
      </div>
      <Grid container spacing={2} className="videos-container">
        {businessVideos &&
          Object.keys(businessVideos).map((key, index) => (
            <Grid
              item
              xs={12}
              spacing={1}
              sm={6}
              md={3}
              className="video-all-over-view-container"
            >
              {console.log(businessVideos[key])}
              <div onClick={() => handleVideoData(key, index)}>
                <VideoAllOverviewCard
                  thumbnailList={businessVideos}
                  title={key}
                  image={
                    businessVideos[key][0]
                      ? businessVideos[key][0].thumbnail
                      : ""
                  }
                />
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
    // </BusinessProfileDashboard>
  );
}

export default AllVideoGallery;
