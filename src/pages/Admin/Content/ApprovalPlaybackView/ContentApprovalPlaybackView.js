import React, { useEffect, useState } from "react";
import "./styles.scss";
import videoDummy from "../../../../assets/admin/Content/videoDummyLarge.png";
import listIcon from "../../../../assets/admin/Content/listIcon.png";
import cross from "../../../../assets/admin/Content/cross.png";
import check from "../../../../assets/admin/Content/check.png";
import profileImage from "../../../../assets/admin/Profile/profilePicture.png";
import foodImage from "../../../../assets/admin/Content/cutlery.png";
import dot from "../../../../assets/admin/Dashboard/dot.png";
import { contentApprovalDummyData } from "./ContentApprovalDummyData";
import { Box, Typography } from "@mui/material";
import SIngleVideoPlayback from "../../../../components/videoComponent/SingleVideoPlayback/SIngleVideoPlayback";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllContent } from "../../../../apis/dashboard/content/fetchAllContent";
import Loader from "../../../../components/Util/Loader/Loader";
function ContentApprovalPlaybackView() {
  const [contentData, setContentData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mainLoading, setMainLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function videoAction(approvalStatus, index) {
    const animatedDiv = document.getElementById(`video-play-${index}`);
    const animatedDivContainer = document.getElementById(
      `video-play-container-${index}`
    );
    if (approvalStatus) {
      animatedDiv.classList.add("accept-out");
      animatedDivContainer.classList.add("opacity-zero");
      setTimeout(() => {
        if (index + 1 !== contentData.length) {
          animatedDivContainer.remove();
        }
        setCurrentIndex(currentIndex + 1);
        setContentData(contentData.filter((item, i) => i !== index));
      }, 900);
    } else {
      animatedDiv.classList.add("discard-out");
      animatedDivContainer.classList.add("opacity-zero");
      setTimeout(() => {
        if (index + 1 !== contentData.length) {
          animatedDivContainer.remove();
        }
        setContentData(contentData.filter((item, i) => i !== index));
        setCurrentIndex(currentIndex + 1);
      }, 900);
    }
  }

  const getPendingContent = async () => {
    await fetchAllContent(pageNumber, 20, "pending")
      .then((response) => {
        const data = response.data.assets;
        if (response.current_page === response.total_pages) {
          setHasMore(false);
        }
        setContentData([...contentData, ...data]);
        setPageNumber(pageNumber + 1);
        setMainLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMainLoading(false);
      });
  };

  useEffect(() => {
    setMainLoading(true);
    getPendingContent();
  }, []);

  return (
    <Box className="content-approval-playback-view">
      <Box className="content-area">
        <Box className="header-container">
          <Typography className="header-text">Review Content ({contentData.length})</Typography>
          <Box
            className="list-button"
            onClick={() => navigate("/content/list")}
          >
            <img src={listIcon} alt="list-icon" />
          </Box>
        </Box>
        <Box className="video-area">
          <Loader loading={mainLoading}>
            {contentData.map((data, index) => (
              <Box
                className="video-play-container"
                id={`video-play-container-${index}`}
              >
                <Box
                  className="cross-button"
                  onClick={() => videoAction(false, index)}
                >
                  <img src={cross} alt="cross" />
                </Box>
                <SIngleVideoPlayback
                  data={data}
                  index={index}
                  currentIndex={currentIndex}
                />
                <Box
                  className="tick-button"
                  onClick={() => videoAction(true, index)}
                >
                  <img src={check} alt="check" />
                </Box>
              </Box>
            ))}
          </Loader>
        </Box>
      </Box>
    </Box>
  );
}

export default ContentApprovalPlaybackView;
