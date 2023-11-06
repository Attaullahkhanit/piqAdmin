import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./dashboard.scss";
import plusIcon from "../../../assets/admin/common/plus.png";
import searchIcon from "../../../assets/admin/common/search.png";
import listIcon from "../../../assets/admin/common/list.png";
import crossIcon from "../../../assets/admin/Content/cross.png";
import ManageContent from "../../../components/Cards/Dashboard/ManageContent/ManageContent";
import ProfileRequest from "../../../components/Cards/Dashboard/ProfileRequest/ProfileRequest";
import Profile from "../../../components/Cards/Dashboard/Profile/Profile";
import profileImage1 from "../../../assets/admin/Dashboard/profile1.png";
import googleLogo from "../../../assets/admin/Dashboard/Google.png";
import SocialNotificaton from "../../../components/Cards/Dashboard/SocialNotification/SocialNotificaton";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import FilterInput from "../../../components/InputFields/FilterInput/FilterInput";
import { useNavigate } from "react-router";
import Loader from "../../../components/Util/Loader/Loader";
import { fetchAllContent } from "../../../apis/dashboard/content/fetchAllContent";
import InfiniteScroll from "react-infinite-scroll-component";
import getApprovedProfiles from "../../../apis/dashboard/Profiles/getApprovedProfiles";
import searchData from "../../../utils/searchData";
import refactorFirebaseProfileData from "../../../utils/refactorFirebaseProfileData";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessData } from "../../../redux/slices/businessProfileSlice";
import AddVideoModal from "../../../components/videoComponent/AddVideoModal/AddVideoModal";
import getPendingProfiles from "../../../apis/dashboard/Profiles/getPendingProfiles";
import refactorBusinessDataToAssets from "../../../utils/refactorBusinessDataToAssets";
import searchAssets from "../../../apis/assets/searchAssets";
import searchProfile from "../../../apis/profile/searchProfile";
import NoDataPlaceholder from "../../../components/Util/NoDataPlaceholder/NoDataPlaceholder";
import userPlaceholder from "../../../assets/admin/Profile/userPlaceholder.png";
import getallAssetCount from "../../../apis/assets/getallAssetCount";
import getallBusinessCount from "../../../apis/business/getallBusinessCount";

export default function Dashboard() {
  const arrayToMap = new Array(10).fill(null);
  const dispatch = useDispatch();
  //refs
  const contentSearchRef = useRef();

  // content
  const [showManageContentSearch, setShowManageContentSearch] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [unFilteredContentData, setUnFilteredContentData] = useState([]);
  const [contentDataPageNumber, setContentDataPageNumber] = useState(1);
  const [contentDataHasMore, setContentDataHasMore] = useState(true);
  const [contentSearchValue, setContentSearchValue] = useState("");
  const [contentSearchDebouncedValue, setContentSearchDebouncedValue] =
    useState("");

  // profiles
  const [profilesData, setProfilesData] = useState([]);
  const [unFilteredProfileData, setUnfilteredProfileData] = useState([]);
  const [profileDataPageNumber, setProfileDataPageNumber] = useState(1);
  const [profilesDataHasMore, setProfilesDataHasMore] = useState(true);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [showProfileSearch, setShowProfileSearch] = useState(false);
  const [selectedProfileFilter, setSelectedProfileFilter] = useState(0);

  const [profileSearchValue, setProfileSearchValue] = useState("");

  console.log(profilesData, 'profilesData data')
  //requestedProfiles
  const [requestedProfilesData, setRequestedProfilesData] = useState([]);
  const [unFilteredRequestedProfileData, setUnfilteredRequestedProfileData] =
    useState([]);
  const [formattedRequestedProfileData, setFormattedRequestedProfileData] =
    useState([]);

  const [requestedProfilesSearchValue, setRequestedProfilesSearchValue] =
    useState("");

  //count
  const [assetDataCount, setAssetDataCount] = useState(0)
  const [profileDataCount, setProfileDataCount] = useState(0)

  //notifications
  const [showNotificationsSearch, setShowNotificationsSearch] = useState(false);
  const [profileSelectValue, setProfileSelectValue] = useState("all");
  const [profileRequestSelectValue, setProfileRequestSelectValue] =
    useState("all");
  const navigate = useNavigate();
  const dummymenuItems = ["all", "creator", "business", "users"];
  const PROFILE_FILTERS = [
    "All",
    "Review",
    //"Aligned",
    "Prepared",
    "Approved",
    "Finalized",
    "Live",
    "Revisit",
    "Not Interested",
    "Not Aligned",
    "Suspended",
    "Banned",
  ];
  //fetch calls
  const getAllContent = async () => {
    await fetchAllContent(contentDataPageNumber, 40, "approved").then(
      (response) => {
        const data = response?.data?.assets;
        const businessData = response?.data?.businesses.filter(
          (item) => item !== null
        );

        setContentData((prev) => [
          ...prev,
          ...refactorBusinessDataToAssets(data, businessData),
        ]);
        setUnFilteredContentData((prev) => [
          ...prev,
          ...refactorBusinessDataToAssets(data, businessData),
        ]);
        setContentDataPageNumber(contentDataPageNumber + 1);
        setContentDataHasMore(response.current_page !== response.total_pages);
        setContentLoading(false);
      }
    );
  };


  const getProfiles = async () => {
    const status =
      PROFILE_FILTERS[selectedProfileFilter].toLowerCase() === "all"
        ? false
        : PROFILE_FILTERS[selectedProfileFilter].toLowerCase();
    await getApprovedProfiles(profileDataPageNumber, 30, PROFILE_FILTERS[selectedProfileFilter].toLowerCase())
      .then((response) => {
        const data = response.data;
        if (response?.current_page === response?.total_pages) {
          setProfilesDataHasMore(false);
        }
        if (data?.length > 0) {
          setProfileDataPageNumber(response?.current_page + 1);
          const filteredFetchedData = status
            ? data.filter((item) => item?.status === status)
            : data;
          setProfilesData([...profilesData, ...filteredFetchedData]);
          setUnfilteredProfileData([...unFilteredProfileData, ...data]);
          setProfilesLoading(false);
        }
      });
  };

  const searchContent = (value) => {
    setContentLoading(true);
    searchAssets(value)
      .then((response) => {
        const data = response?.data?.assets;
        const businessData = response?.data?.businesses.filter(
          (item) => item !== null
        );
        setContentData([...refactorBusinessDataToAssets(data, businessData)]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setContentLoading(false);
      });
  };
  const searchBusiness = (value) => {
    setProfilesLoading(true);
    searchProfile(value)
      .then((response) => {
        setProfilesData([...response.data]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setProfilesLoading(false);
      });
  };

  //useEffects

  useEffect(() => {
    setContentLoading(true);
    getAllContent();
    setProfilesLoading(true);
    getProfiles();
    getallAssetCount()
      .then((res) => {
        setAssetDataCount(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
    getallBusinessCount()
      .then((res) => {
        setProfileDataCount(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  useEffect(() => {
    if (contentSearchValue !== "") {
      const search = setTimeout(() => {
        searchContent(contentSearchValue);
      }, 1200);
      return () => clearTimeout(search);
    } else {
      setContentData(unFilteredContentData);
    }
  }, [contentSearchValue]);

  useEffect(() => {
    if (selectedProfileFilter === 0) {
      setProfilesData(unFilteredProfileData);
    } else {
      setProfilesData(
        unFilteredProfileData.filter(
          (item) =>
            item?.status ===
            PROFILE_FILTERS[selectedProfileFilter].toLowerCase()
        )
      );
    }
  }, [selectedProfileFilter]);

  useEffect(() => {
    if (profileSearchValue !== "") {
      const search = setTimeout(() => {
        searchBusiness(profileSearchValue);
      }, 1200);
      return () => clearTimeout(search);
    } else {
      setProfilesData(unFilteredProfileData);
    }
  }, [profileSearchValue]);

  useEffect(() => {
    setRequestedProfilesData(
      searchData(
        unFilteredRequestedProfileData,
        "businessName",
        requestedProfilesSearchValue
      )
    );
  }, [requestedProfilesSearchValue]);

  // 5 second NoDataPlaceholder component should be rendered and then it should be unmound

  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    if (contentData.length == 0) {
      const timer = setTimeout(() => {
        setContentSearchValue("")
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [contentData]);

  // NoDataPlaceholder 
  useEffect(() => {
    if (profilesData.length == 0) {
      const timer = setTimeout(() => {
        setProfileSearchValue("")
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [profilesData]);
  return (
    <Box className="dashboard">
      <Box className="grid-container">
        <Box className="dash-section" id="content-cards-container">
          {showManageContentSearch ? (
            <Box className="top-section">
              <IconInput
                icon={searchIcon}
                placeholder={"search"}
                id={"manage-content-search"}
                value={contentSearchValue}
                onChange={(e) => setContentSearchValue(e.target.value)}
              />
              <button onClick={() => setShowManageContentSearch(false)}>
                <img className="cross" alt="cross" src={crossIcon} />
              </button>
            </Box>
          ) : (
            <Box className="top-section">
              <Typography className="top-section-text">
                Manage Content
                {contentLoading ? "" : "(" + assetDataCount + ")"}
              </Typography>
              <Box className="top-icons-container">
                <img
                  src={searchIcon}
                  alt="search-icon"
                  onClick={() => setShowManageContentSearch(true)}
                />
                <img
                  src={plusIcon}
                  alt="plus-icon"
                  onClick={() => {
                    navigate("/content/chooseProfile");
                  }}
                />
                <img
                  src={listIcon}
                  alt="list-icon"
                  onClick={() => {
                    navigate("/content/list");
                  }}
                />
              </Box>
            </Box>
          )}

          <Loader loading={contentLoading}>
            {
              contentData.length > 0 ? (
                <InfiniteScroll
                  dataLength={contentData.length}
                  next={() => {
                    if (contentSearchValue === "") {
                      getAllContent();
                    }
                  }}
                  hasMore={contentDataHasMore}
                  loader={<Loader loading={!(contentSearchValue === "")} />}
                  className="cards-section"
                  scrollableTarget="content-cards-container"
                >
                  {contentData.map((card, index) => (
                    <ManageContent data={card} id={card?.assetId} key={index} />
                  ))
                  }
                </InfiniteScroll>
              ) : (
                <NoDataPlaceholder />
              )

            }
          </Loader>
        </Box>

        {/* Profile Card */}

        <Box className="dash-section" id={"profiles-card-container"}>
          <Box className="top-section-container">
            {showProfileSearch ? (
              <Box className="top-section">
                <FilterInput
                  icon={searchIcon}
                  placeholder={"search"}
                  id={"profile-search"}
                  value={profileSearchValue}
                  onChange={(e) => setProfileSearchValue(e.target.value)}
                  menuItems={dummymenuItems}
                  selectValue={profileSelectValue}
                  onSelectChange={setProfileSelectValue}
                />
                <button onClick={() => setShowProfileSearch(false)}>
                  <img className="cross" alt="cross" src={crossIcon} />
                </button>
              </Box>
            ) : (
              <Box className="top-section">
                <Typography className="top-section-text">
                  Profiles
                  {profilesLoading
                    ? ""
                    : "(" + profileDataCount + ")"}
                </Typography>
                <Box className="top-icons-container">
                  <img
                    src={searchIcon}
                    alt="search-icon"
                    onClick={() => setShowProfileSearch(true)}
                  />
                  <img
                    src={plusIcon}
                    alt="plus-icon"
                    onClick={() => navigate("/profiles/add/information")}
                  />
                  <img
                    src={listIcon}
                    alt="list-icon"
                    onClick={() => navigate("/profiles/requests/list")}
                  />
                </Box>
              </Box>
            )}
            <Box className="filters-container">
              {PROFILE_FILTERS.map((item, index) => (
                <Box
                  className={`filter${index === selectedProfileFilter ? "-selected" : ""
                    }`}
                  onClick={() => setSelectedProfileFilter(index)}
                >
                  <Typography className="filter-text">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Loader loading={profilesLoading}>
            {profilesData.length > 0 ? (
              <InfiniteScroll
                dataLength={profilesData.length}
                next={() => getProfiles()}
                hasMore={profilesDataHasMore}
                loader={<Loader loading={profilesLoading} />}
                className="cards-section"
                scrollableTarget="profiles-card-container"
              >
                {profilesData.map((card, index) => {
                  if (card?.status === card?.status) {
                    return (
                      <Profile
                        profileImage={card?.logo}
                        placeholder={userPlaceholder}
                        tags={[card?.city]}
                        name={card?.businessName}
                        onClick={() => navigate(`/business/${card?.id}`)}
                        // onClick={() => navigate(`/assets/gallery`)}
                        saves={card?.total_saves}
                        view={card?.total_views}
                        subscription={
                          card?.subscriptionType === ""
                            ? "piq"
                            : card?.subscriptionType
                        }
                        shares={card?.total_shares}
                        index={index}
                      />
                    );
                  } else if (card?.status === "pending") {
                    return (
                      <ProfileRequest
                        type={"business"}
                        formattedData={card}
                        title={card?.businessName}
                        category={
                          card?.establishmentType && card?.establishmentType[0]
                        }
                        time={"3d ago"}
                        id={
                          typeof card?.businessinstagram === "string"
                            ? "@" + card?.businessinstagram.split("/")[3]
                            : ""
                        }
                        index={index}
                      />
                    );
                  }
                })}
              </InfiniteScroll>
            ) : (
              <NoDataPlaceholder />
            )}
          </Loader>
        </Box>
        <Box className="dash-section">
          {showNotificationsSearch ? (
            <Box className="top-section">
              <IconInput
                icon={searchIcon}
                placeholder={"search"}
                id={"notifications-search"}
                showField={showNotificationsSearch}
                setShowField={setShowNotificationsSearch}
              />
            </Box>
          ) : (
            <Box className="top-section">
              <Typography className="top-section-text">
                Notifications (100)
              </Typography>
              <Box className="top-icons-container">
                <img
                  src={searchIcon}
                  alt="search-icon"
                  onClick={() => setShowNotificationsSearch(true)}
                />
                <img src={listIcon} alt="list-icon" />
              </Box>
            </Box>
          )}

          <Box className="cards-section">
            {arrayToMap.map((card, index) => {
              return (
                <SocialNotificaton
                  logo={googleLogo}
                  title={"Best App Ever!!"}
                  time={"3d ago"}
                  description={
                    "unchanged. It was popularised in the 1960s with the release of Letraset"
                  }
                  status={"Live"}
                  opened={"20"}
                  reach={"200k"}
                  openRate={"505k"}
                  uninstalls={"20"}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
