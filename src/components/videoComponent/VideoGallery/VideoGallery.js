import React, { useState } from "react";
import VideoOverviewCard from "../../Cards/Video/VideoOverviewCard/VideoOverviewCard";
import { Grid } from "@mui/material";
import "./styles.scss";
import IconInput from "../../InputFields/IconInput/IconInput";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import DangerButton from "../../Buttons/Danger/DangerButton";
import deleteBusinessMenu from "../../../apis/business/deleteBusinessMenu";
import { showToastError, showToastSuccess } from "../../../utils/showToasify";

function VideoGallery({ businessVideos, videoName }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  console.log(businessVideos, "businessVideos");
  //const businessVideos = videosDummycontent.data.assets;
  const location = useLocation();
  console.log("location data", location);
  console.log(videoName, "videoName");

  const handleDeleteCategory = async () => {
    try {
      setIsLoading(true);
      const currentPathname = window.location.pathname;
      const parts = currentPathname.split("/");
      const businessId = parts[parts.length - 1];
      // find category data
      const category = videoName;
      const response = await deleteBusinessMenu(businessId, category);
      if (response.status === 200) {
        console.log("Category deleted successfully");
        showToastSuccess("Category deleted successfully");
        navigate(`/profile/dashboard/${businessId}`);
      } else {
        showToastError("Failed to delete category");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <BusinessProfileDashboard>
    <div className="video-menu-content">
      <div className="navbar-flex">
        <div className="w-20">
          {/* <h2>Breakfast (20)</h2> */}
          <h2>{videoName}</h2>
        </div>
        <div className="w-30">
          <IconInput placeholder="Search" />
        </div>
        <div className="w-50 buttons-container">
          <PrimaryButton
            text="+ Add Offering"
            width="42%"
            height="50px"
            onClick={() => {
              // Sending current business id to add asset page
              const currentPathname = window.location.pathname; // Get the current pathname from the window location
              const parts = currentPathname.split("/"); // Split the pathname by '/' to get an array of parts
              const businessId = parts[parts.length - 1]; // Get the last part (which is the "id")
              navigate("/profile/addAsset", { state: { businessId } });
            }}
          />
          <DangerButton
            text="Delete Category"
            width="42%"
            height="50px"
            onClick={handleDeleteCategory}
          />
        </div>
      </div>
      <Grid container spacing={4} className="videos-container">
        {businessVideos.map((video, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <VideoOverviewCard
              pending={video?.status === "pending"}
              title={video?.assetName}
              image={video?.thumbnail}
              views={video?.views}
              price={video?.price || ""}
              viewasset={() => navigate("/view/asset", { state: video })}
            />
          </Grid>
        ))}
      </Grid>
    </div>
    // </BusinessProfileDashboard>
  );
}

export default VideoGallery;
