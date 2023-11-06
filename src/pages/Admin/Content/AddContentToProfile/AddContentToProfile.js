import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import FilterInput from "../../../../components/InputFields/FilterInput/FilterInput";
import searchIcon from "../../../../assets/admin/common/search.png";
import ContentScreenBusinessProfileCard from "../../../../components/Cards/Profile/ContentScreenBusinessProfileCard/ContentScreenBusinessProfileCard";
import getApprovedProfiles from "../../../../apis/dashboard/Profiles/getApprovedProfiles";
import Loader from "../../../../components/Util/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import refactorBusinessDataToAssets from "../../../../utils/refactorBusinessDataToAssets";
import searchData from "../../../../utils/searchData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setBusinessData,
  setBusinessVideoData,
} from "../../../../redux/slices/businessProfileSlice";

export default function AddContentToProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function
  const [profileType, setProfileType] = useState("Business");
  const [searchValue, setSearchValue] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileDataHasMore, setProfileDataHasMore] = useState(true);
  const [contentDataPageNumber, setContentDataPageNumber] = useState(1);
  const [unFilteredContentData, setUnFilteredContentData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [saveOldProfileData, setSaveOldProfileData] = useState([]);
  const [contentSearchValue, setContentSearchValue] = useState("");
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );

  const handleListItemClick = (data) => {
    dispatch(setBusinessData(data));
    navigate("/profiles/video/add");
  };

  useEffect(() => {
    console.log(profileData);
  }, [businessData]);

  const filterSearch = (e) => {
    const value = e.target.value;
    console.log(value, "value");
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue !== "") {
      const search = setTimeout(() => {
        const filterBySearchedData = profileData.filter((obj) => {
          return obj.businessName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });
        setProfileData(filterBySearchedData);
      }, 1200);
      return () => clearTimeout(search);
    } else {
      setProfileData(saveOldProfileData);
    }
  }, [searchValue]);

  const getAllContent = async () => {
    await getApprovedProfiles(contentDataPageNumber, 10, "approved").then(
      (response) => {
        const data = response?.data;
        console.log(data, "dataaa");
        setProfiles(data);
        setProfileData((prev) => [...prev, ...data]);
        setUnFilteredContentData((prev) => [...prev, ...data]);
        setContentDataPageNumber(contentDataPageNumber + 1);
        setProfileDataHasMore(response.current_page !== response.total_pages);
        setProfileLoading(false);
        setSaveOldProfileData(data);
      }
    );
  };

  useEffect(() => {
    setProfileData(
      searchData(unFilteredContentData, "assetName", contentSearchValue)
    );
  }, [contentSearchValue]);

  useEffect(() => {
    getAllContent();
  }, []);
  return (
    <div className="add-content-to-profile">
      <div className="content-container">
        <Typography className="title-text">
          Select a profile to add content to:
        </Typography>
        <FilterInput
          placeholder="Search"
          menuItems={["Business", "Creators", "Users"]}
          value={searchValue}
          icon={searchIcon}
          selectValue={profileType}
          onChange={(e) => {
            filterSearch(e);
          }}
          onSelectChange={setProfileType}
        />
        <div className="profiles-container" id="profiles-container">
          <Loader loading={profileLoading}>
            <InfiniteScroll
              dataLength={profileData.length}
              next={() => getAllContent()}
              hasMore={profileDataHasMore}
              loader={<Loader loading={true} />}
              className="cards-section"
              scrollableTarget="profiles-container"
            >
              {profileData ? (
               profileData.map((data, index) => (
                <ContentScreenBusinessProfileCard
                  key={index}
                  profiledata={data}
                  onClick={() => handleListItemClick(data)}
                />
              )))
               : (
                <Typography>No Data Available</Typography>
              )
              }
            </InfiniteScroll>
          </Loader>
        </div>
      </div>
    </div>
  );
}
