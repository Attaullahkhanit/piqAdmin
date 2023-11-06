import React from "react";
import SneakPiqOverviewCard from "../../Cards/Video/SneakPiqOverviewCard/SneakPiqOverviewCard";
import { videosDummycontent } from "../VideoGallery/videosDummucontent";
import { Grid } from "@mui/material";
import "../VideoGallery/styles.scss";
import IconInput from "../../InputFields/IconInput/IconInput";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";

function VideoGallery({sneakPiqData}) {
  const navigate =  useNavigate();
  const businessVideos = sneakPiqData;
  return (
    // <BusinessProfileDashboard>
    <div className="video-menu-content">
      {console.log(businessVideos)}
      <div className="navbar-flex">
        <div className="w-20">
          <h2>Sneak pîq (All)</h2>
        </div>
        <div className="w-30">
          <IconInput placeholder="Search" />
        </div>
        <div className="w-50">
          <PrimaryButton text="+ Add Offering" width="42%" height="50px"
            onClick={() => {

              // Sending current business id to add asset page
              const currentPathname = window.location.pathname; // Get the current pathname from the window location
              const parts = currentPathname.split('/'); // Split the pathname by '/' to get an array of parts
              const businessId = parts[parts.length - 1]; // Get the last part (which is the "id")
              navigate('/profile/addAsset', { state: { businessId } })
            }}
          />
        </div>
      </div>
      <Grid container spacing={4} className="videos-container">
        {businessVideos.map((video, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <SneakPiqOverviewCard
              pending={video?.status === "pending"}
              title={video?.assetName}
              image={video?.thumbnail}
              views={video?.views}
              price={video?.price || ""}
              viewasset={()=> navigate('/view/asset', { state: video })}
            />
          </Grid>
        ))}
      </Grid>
    </div>
    // </BusinessProfileDashboard>
  );
}

export default VideoGallery;
