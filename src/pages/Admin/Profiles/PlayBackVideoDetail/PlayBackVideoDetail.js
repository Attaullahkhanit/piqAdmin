import React from "react";
import { useState } from "react";
import { Typography, Box } from "@mui/material";
import "./styles.scss";
import OutlineButton from "../../../../components/Buttons/Outline/OutlineButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchAssetById } from "../../../../apis/dashboard/content/fetchAssetById";
import getSingleBusinessData from "../../../../apis/business/getBusinessData";
import { useEffect } from "react";
import VideoPlayBackDetail from "../../../../components/videoComponent/VideoPlayBackDetail/VideoPlayBackDetail";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";

function PlayBackVideoDetail({ videoURL }) {
  
  const location = useLocation();
  const navigate = useNavigate();
  //const params = useParams();

  const [videoAssetData, setVideoAssetData] = useState()
  const [videoIndex, setVideoIndex] = useState(location.state.index)

  const videoUrl = location.video;

  const [tagInputValue, setTagInputValue] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [assetDataUnchanged, setAssetDataUnchanged] = React.useState(null);
  const [assetDataLoading, setAssetDataLoading] = React.useState(false);
  const [ownerTags, setOwnerTags] = React.useState([]);
  const [aiTags, setAITags] = React.useState([]);
  const [saveLoading, setSaveLoading] = React.useState(false);

  const [assetData, setAssetData] = React.useState(null);
  const [businessData, setBusinessData] = React.useState(
    location?.state?.business
  );

  //setVideoAssetData(location.state.businessVideos[videoIndex])

  //fetch calls
  // const getAssetData = async () => {
  //   fetchAssetById(params.id).then((response) => {
  //     if (response) {
  //       setAssetData(response);
  //       setAssetDataUnchanged(response);
  //       // setOwnerTags(
  //       //   reformatTags(response?.indexerLabels.map((label) => label.name))
  //       // );
  //       setOwnerTags(response?.ownerTags);
  //       setCategory(response?.assetType);
  //       getSingleBusinessData(response?.businessId)
  //         .then((businessData) => {
  //           setBusinessData({
  //             businessName: businessData.businessName,
  //             businessImageUrl: businessData.businessImageUrl,
  //             subCategories: businessData.subCategories,
  //           });
  //           setAssetDataLoading(false);
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           setAssetDataLoading(false);
  //         });
  //       // setAITags(reformatTags(response.labels));
  //     }
  //   });
  // };

  // useEffect(() => {
  //   setAssetDataLoading(true);
  //   getAssetData();
  // }, []);

  const handlePrevious = () => {
    if (videoIndex >= 0){
    setVideoIndex(videoIndex-1)
    }
  }

  const handleNext = () => {
    if (videoIndex <= (location.state.businessVideos.length-1)){
      setVideoIndex(videoIndex+1)
      }
  }

  useEffect(()=>{
    if (videoIndex >=0 && videoIndex <= (location.state.businessVideos.length-1)){
    setVideoAssetData(location.state.businessVideos[videoIndex])
    }
  },[videoIndex])

  useEffect(() => {
    category && setAssetData({ ...assetData, ["assetType"]: category });
  }, [category]);

  return (
    <div className="playbackvideo-page">
      <Box className="dash-section" id="content-cards-container">
        <VideoPlayBackDetail
          data={videoAssetData ? videoAssetData : location.state.businessVideos[videoIndex]}
          businessData={businessData}
          index={1}
          videoURL={videoUrl}
        />
        <div className="button-container">
          <PrimaryButton 
          text={'Previous'}
          onClick={()=>{handlePrevious()}}/>
          <OutlineButton
            className="button-outline"
            text={"Go Back"}
            onClick={() => navigate(-1)}
          />
          <PrimaryButton 
          text={'Next'}
          onClick={()=>{handleNext()}}/>
        </div>
      </Box>
    </div>
  );
}

export default PlayBackVideoDetail;
