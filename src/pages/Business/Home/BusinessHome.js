import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Box, Grid, Typography } from "@mui/material";
import dummyProfileImage from "../../../assets/admin/Profile/profilePicture.png";
import searchIcon from "../../../assets/admin/common/search.png";
import dot from "../../../assets/admin/Dashboard/dot.png";
import cross from "../../../assets/admin/Content/cross.png";
import dummyBg from "../../../assets/business/home/profileBg.png";
import bgOverlay from "../../../assets/business/home/shadow.png";
import shadowBottom from "../../../assets/business/home/shadowBottom.png";
import smoothie from "../../../assets/business/home/smoothie.png";
import searchIconGrey from "../../../assets/business/home/searchGrey.png";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import VideoOverviewCard from "../../../components/Cards/Video/VideoOverviewCard/VideoOverviewCard";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import AddVideoModal from "../../../components/videoComponent/AddVideoModal/AddVideoModal";
import ChooseVideoModal from "../../../components/videoComponent/ChooseVideoModal/ChooseVideoModal";
import profilePlaceholder from "../../../assets/business/home/profilePlaceholder.png";
import { useNavigate, useParams } from "react-router-dom";
import getSingleBusinessData from "../../../apis/business/getBusinessData";
import { useDispatch } from "react-redux";
import getBusinessVideos from "../../../apis/business/getBusinessVideos";
import getBusinessMenu from "../../../apis/business/getBusinessMenu";
import Loader from "../../../components/Util/Loader/Loader";
import {
  setBusinessData,
  setBusinessVideoData,
  setBusinessMenuData,
} from "../../../redux/slices/businessProfileSlice";
import getTimeUntilOpeningOrClosing from "../../../utils/getTimeUntilOpeningOrClosing";
import { tagsData } from "./tagsData";
import searchData from "../../../utils/searchData";
import getAssetDataCount from "../../../apis/assets/getAssetDataCount";
function BusinessHome() {
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [showAddVideoModal, setShowAddVideoModal] = React.useState(false);
  const [showChooseVideoModal, setShowChooseVideoModal] = React.useState(false);
  const [data, setData] = React.useState({});
  const [selectedTag, setSelectedTag] = React.useState(null);
  const [businessVideos, setBusinessVideos] = React.useState([]);
  const [businessMenu, setBusinessMenu] = React.useState(null);
  const [unFilteredBusinessVideos, setUnfilteredBusinessVideos] =
    React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [videosLoading, setVideosLoading] = useState(false);
  const [assetData, setAssetData] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categoryNames, setCategoryNames] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (businessMenu && selectedCategory !== null) {
      console.log("OOO:", businessMenu, "PPP:", businessVideos);
      const selectedCategoryArray = businessMenu.menu[`${selectedCategory}`];
      setBusinessVideos(selectedCategoryArray);
      if (videosLoading) setVideosLoading(false);
      console.log("OOO:", businessMenu, "PPP:", businessVideos);
    }
  }, [businessMenu, selectedCategory]);

  console.log(businessVideos, "businessVideos play back video detail");
  //handlers
  const handleOpenSearch = () => {
    setShowSearch(true);
    setSelectedTag(null);
  };
  const handleCloseSearch = () => {
    setShowSearch(false);
  };
  const handleOpenAddVideo = () => {
    setShowAddVideoModal(true);
  };
  const handleCloseAddVideo = () => {
    setShowAddVideoModal(false);
  };
  const handleOpenChooseVideo = () => {
    handleCloseAddVideo();
    setShowChooseVideoModal(true);
  };
  const handleCloseChooseVideo = () => {
    setShowChooseVideoModal(false);
  };

  //fetch Calls
  const getBusinessData = async () => {
    setIsLoading(true);
    //fetch business data
    await getSingleBusinessData(id)
      .then((data) => {
        setData(data);
        dispatch(setBusinessData(data));
        setVideosLoading(true);
        //fetch business videos
        getMenu();
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getVideos = () => {
    //fetch videos
    getBusinessVideos(id)
      .then((data) => {
        setBusinessVideos(data);
        setUnfilteredBusinessVideos(data);
        dispatch(setBusinessVideoData(data));
        setVideosLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setVideosLoading(false);
      });
  };

  const getMenu = () => {
    //fetch videos
    getBusinessMenu(id)
      .then((data) => {
        console.log("YESSSSSS");
        setBusinessMenu(data);
        dispatch(setBusinessMenuData(data));
        setCategoryNames(Object.keys(data.menu));
        console.log(
          "Cat:",
          data,
          "Cat1:",
          categoryNames,
          "Aaa:",
          selectedCategory
        );
        setSelectedCategory(Object.keys(data.menu)[0]);
        console.log("Cat:", categoryNames, "Bbb:", selectedCategory);
      })
      .catch((err) => {
        console.error(err);
        setVideosLoading(false);
      });
  };

  //useEffects

  useEffect(() => {
    getBusinessData();
  }, []);

  useEffect(() => {
    if (data) {
      getAssetDataCount(data.id)
        .then((res) => {
          setAssetData(res.data);
          console.log("Updated asset data", assetData);
        })
        .catch((err) => {
          console.log("Asset data count error", err);
        });
    }
  }, [data]);

  useEffect(() => {
    if (selectedTag) {
      setBusinessVideos(
        unFilteredBusinessVideos.filter(
          (item) => item.assetType === tagsData[selectedTag].title
        )
      );
    }
  }, [selectedTag]);

  useEffect(() => {
    setBusinessVideos(searchData(businessVideos, "assetName", searchValue));
  }, [searchValue]);

  return (
    <Loader isLoading={isLoading}>
      {/* {console.log(assetData)} */}
      <Box className="business-home">
        <img src={data?.coverPhoto} alt="bg" className="bg" />
        <img src={bgOverlay} alt="bg" className="bg-shadow" />
        <img src={shadowBottom} alt="bg" className="bg-bottom" />
        <Box className="business-home-container" sx={{ marginBottom: "150px" }}>
          <img
            className={`profile-image ${showSearch && "small"}`}
            src={
              typeof data?.logo === "string" && data?.logo.length > 1
                ? data?.logo
                : profilePlaceholder
            }
            alt="profile-image"
          />
          <Box className={`business-details-area ${showSearch && "hidden"}`}>
            <Box className="title-container">
              {/* <Typography className="timing-status">
                {data?.operationalData &&
                  getTimeUntilOpeningOrClosing(data?.operationalData)}
              </Typography> */}
              <Typography className="title">{data?.businessName}</Typography>
              <Box className="tags-container">
                {data?.subCategories?.map((item, index) => (
                  <Box className="tag-group">
                    <Typography className="tag">{item}</Typography>
                    {index + 1 !== data?.subCategories.length && (
                      <img className="divider" src={cross} alt="dot" />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="stats-container">
              <Box className="top-area">
                <Box className="stats">
                  <Typography className="stats-title">Views</Typography>
                  <Typography className="stats-value">
                    {assetData?.views}
                  </Typography>
                </Box>
                <Box className="stats">
                  <Typography className="stats-title">Saved</Typography>
                  <Typography className="stats-value">
                    {assetData?.saves}
                  </Typography>
                </Box>
                <Box className="stats">
                  <Typography className="stats-title">Shared</Typography>
                  <Typography className="stats-value">
                    {assetData?.shares}
                  </Typography>
                </Box>
                <Box className="stats">
                  <Typography className="stats-title">Visits</Typography>
                  <Typography className="stats-value">
                    {assetData?.impressions}
                  </Typography>
                </Box>
              </Box>
              <Box className="bottom-area">
                <Typography className="performance-text">
                  Profile Performance
                </Typography>
              </Box>
            </Box>
          </Box>
          <Loader loading={videosLoading || isLoading}>
            <Box className="business-content-area">
              {showSearch ? (
                <Box className="search-container">
                  <IconInput
                    icon={searchIconGrey}
                    dark={true}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Box className="tag-search" onClick={handleCloseSearch}>
                    <img src={cross} alt="cross" />
                  </Box>
                </Box>
              ) : (
                <Box className="video-tags-container">
                  <Box className="tag-search" onClick={handleOpenSearch}>
                    <img src={searchIcon} alt="search" />
                  </Box>

                  {categoryNames &&
                    categoryNames.map((item, index) => {
                      // const Icon = item.icon;
                      return (
                        <div className="tags-style">
                          <Box
                            className={
                              item === selectedCategory
                                ? "tags-selected"
                                : "tags-normal"
                            }
                            onClick={() => {
                              setSelectedCategory(item);
                            }}
                          >
                            {/* <Icon
                          fill={selectedTag === index ? "#ffae00" : "white"}
                          height={"20px"}
                        /> */}
                            <Typography
                              className={
                                item === selectedCategory
                                  ? "tag-text-selected"
                                  : "tag-text"
                              }
                            >
                              {item}
                            </Typography>
                          </Box>
                        </div>
                      );
                    })}
                </Box>
              )}

              <Grid container spacing={2} className="videos-container">
                {console.log("business videos", businessVideos)}
                {businessVideos?.map((video, index) => (
                  <Grid item xs={12} sm={6}>
                    {console.log("video", video)}
                    <VideoOverviewCard
                      pending={video?.status === "pending"}
                      title={video?.assetName}
                      image={video?.thumbnail}
                      views={video?.views}
                      price={video?.price || ""}
                      playbackvideoDetail={() =>
                        navigate(`/playbackvideo/detail`, {
                          state: { video: video, business: data, businessVideos: businessVideos, index: index },
                        })
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Loader>
        </Box>

        <AddVideoModal
          openModal={showAddVideoModal}
          handleClose={handleCloseAddVideo}
          handleOpenChooseVideoModal={handleOpenChooseVideo}
        />
        <ChooseVideoModal
          openModal={showChooseVideoModal}
          handleClose={handleCloseChooseVideo}
        />
        <Box className="action-buttons-container">
          <PrimaryButton
            text={"Add Menu"}
            //onClick={handleOpenAddVideo}
            onClick={() => navigate(`/profile/dashboard/${id}`)}
          />
          <Typography
            className="action-button-text"
            onClick={() => {
              navigate(`/business/profiles/manage/${id}`);
            }}
          >
            Edit Profile
          </Typography>
        </Box>
      </Box>
    </Loader>
  );
}

export default BusinessHome;
