import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./profileRequests.scss";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import searchIcon from "../../../../assets/admin/common/search.png";
import BusinessProfileCard from "../../../../components/Cards/Profile/BusinessProfileCard/BusinessProfileCard";
import food from "../../../../assets/admin/Profile/food.png";
import drink from "../../../../assets/admin/Profile/drink.png";
import smile from "../../../../assets/admin/Profile/smile.png";
import calendar from "../../../../assets/admin/Profile/calendar.png";
import tiktok from "../../../../assets/admin/Profile/tiktok.png";
import instagram from "../../../../assets/admin/Profile/instagram.png";
import website from "../../../../assets/admin/Profile/globe.png";
import UserProfileCard from "../../../../components/Cards/Profile/UserProfile/UserProfileCard";
import { useNavigate } from "react-router";
import listIcon from "../../../../assets/admin/Content/listIcon.png";
import Loader from "../../../../components/Util/Loader/Loader";
import getRequestedProfiles from "../../../../apis/dashboard/Profiles/getRequestProfiles";
import approveProfileInFirebase from "../../../../apis/dashboard/Profiles/approveProfile";
import searchData from "../../../../utils/searchData";
import getPendingProfiles from "../../../../apis/dashboard/Profiles/getPendingProfiles";
import InfiniteScroll from "react-infinite-scroll-component";

function ProfileRequests() {
  //states
  const [profileType, setProfileType] = useState("Business");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [profileSearchValue, setProfileSearchValue] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  //profiles data
  const [requestedProfiles, setRequestedProfiles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [unfilteredRequestedProfiles, setUnfilteredRequestedProfiles] =
    useState([]);
  const [requestedProfilesLoading, setRequestedProfilesLoading] =
    useState(false);

  // consts
  const BUSINESS_TYPES = ["Business", "Creator", "User"];
  const arrayToMap = new Array(5).fill(null);

  const navigate = useNavigate();

  const getRequestProfiles = async () => {
    // setRequestedProfilesLoading(true);
    console.log("came from here");
    getPendingProfiles(pageNumber, 10).then((res) => {
      setUnfilteredRequestedProfiles((prev) => {
        return [...prev, ...res.data];
      });
      setRequestedProfiles((prev) => {
        return [...prev, ...res.data];
      });
      setHasMore(res.current_page !== res.total_pages);
      setPageNumber((prev) => prev + 1);
      setRequestedProfilesLoading(false);
    });
  };
  const handleApprove = (id) => {
    setLoadingId(id);
    approveProfileInFirebase(id, "approved").then(() => {
      setRequestedProfiles((prev) => {
        return prev.filter((profile) => profile.id !== id);
      });
      setLoadingId(null);
    });
  };

  const handleReject = (id) => {
    setLoadingId(id);
    approveProfileInFirebase(id, "rejected").then(() => {
      setRequestedProfiles((prev) => {
        return prev.filter((profile) => profile.id !== id);
      });
      setLoadingId(null);
    });
  };

  const handleSearch = (value) => {
    setRequestedProfiles(
      searchData(unfilteredRequestedProfiles, "businessName", value)
    );
  };

  useEffect(() => {
    setRequestedProfilesLoading(true);
    getRequestProfiles();
  }, []);

  useEffect(() => {
    handleSearch(profileSearchValue);
  }, [profileSearchValue]);
  return (
    <Box className="profile-requests-page">
      <Box className="content-container">
        <Box className="header-container">
          <Box>
            <Select
              className="select"
              value={profileType}
              onChange={(e) => {
                setProfileType(e.target.value);
                setSelectedFilter("All");
              }}
            >
              {BUSINESS_TYPES.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            className="list-button"
            onClick={() => navigate("/profiles/requests/list")}
          >
            <img src={listIcon} alt="list-icon" />
          </Box>
        </Box>
        <Box className="search-container">
          <IconInput
            icon={searchIcon}
            placeholder={"Search"}
            value={profileSearchValue}
            onChange={(e) => {
              setProfileSearchValue(e.target.value);
            }}
          />
        </Box>
        <Box className="cards-container" id={"cards-container-id"}>
          <Loader loading={requestedProfilesLoading}>
            {profileType === "Business" ? (
              <InfiniteScroll
                hasMore={hasMore}
                dataLength={requestedProfiles.length}
                loader={<Loader loading={true} />}
                next={() => getRequestProfiles()}
                scrollableTarget="cards-container-id"
              >
                {requestedProfiles.map((profile, index) => {
                  const socialLinks = [];
                  if (profile?.businessinstagram) {
                    const link = "@" + profile?.businessinstagram.split("/")[3];
                    socialLinks.push({
                      icon: instagram,
                      link,
                    });
                  }
                  if (profile?.businessWebsite) {
                    const linkArray = profile?.businessWebsite.split("/");
                    const link = linkArray[0] + linkArray[1] + linkArray[2];
                    socialLinks.push({
                      icon: website,
                      link,
                    });
                  }
                  return (
                    <BusinessProfileCard
                      onTitleClick={() => {
                        navigate(`/profiles/${index}/review`);
                      }}
                      businessTitle={profile?.businessName}
                      businessType={
                        profile?.establishmentType &&
                        profile?.establishmentType[0]
                      }
                      time={"3d ago"}
                      address={profile?.address}
                      tags={[]}
                      id={profile?.id}
                      handleApprove={handleApprove}
                      handleReject={handleReject}
                      loading={loadingId === profile?.id}
                      // businessHeadDetails={{
                      //   name: "John doe",
                      //   position: "CEO",
                      //   email: "steven.pennock4812@prismware.com",
                      //   phone: "(+1) 480-377-9413",
                      // }}
                      socialsLinks={socialLinks}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : profileType === "User" ? (
              arrayToMap.map((arr) => (
                <UserProfileCard
                  name={"John Doe"}
                  type={"User"}
                  time={"3d ago"}
                  tags={[
                    { title: "Food", image: food },
                    { title: "Drink", image: drink },
                    { title: "Events", image: calendar },
                    { title: "Experiences", image: smile },
                  ]}
                  contactDetails={{
                    email: "steven.pennock4812@prismware.com",
                    phone: "(+1) 480-377-9413",
                  }}
                />
              ))
            ) : (
              arrayToMap.map((arr) => (
                <BusinessProfileCard
                  businessTitle={"Dierks Bentley’s Whiskey Row"}
                  businessType={"Club"}
                  time={"3d ago"}
                  address={
                    "21345 N. Camino Pacheco Dr, Unit 42 Scottsdale, Arizona 85260"
                  }
                  tags={[]}
                  businessHeadDetails={{
                    name: "John doe",
                    position: "CEO",
                    email: "steven.pennock4812@prismware.com",
                    phone: "(+1) 480-377-9413",
                  }}
                  socialsLinks={[
                    { icon: tiktok, link: "@dierksbentleyscottsdale" },
                    { icon: instagram, link: "@dierksbentleyscottsdale" },
                    {
                      icon: website,
                      link: "www.dierksbentleywhiskeyrow.com",
                    },
                  ]}
                />
              ))
            )}
          </Loader>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileRequests;
