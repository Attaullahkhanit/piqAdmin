import React, { useEffect, useState, useRef } from "react";
import "./styles.scss";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import plusIcon from "../../../../assets/admin/Content/plus.png";
import downArrow from "../../../../assets/admin/Content/downArrow.png";
import upArrow from "../../../../assets/admin/Content/upArrow.png";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import searchIcon from "../../../../assets/admin/common/search.png";
import ApprovalTable from "../../../../components/Tables/ApprovalTable/ApprovalTable";
import { useNavigate } from "react-router-dom";
import getApprovedProfiles from "../../../../apis/dashboard/Profiles/getApprovedProfiles";
import Loader from "../../../../components/Util/Loader/Loader";
import refactorFirebaseProfileData from "../../../../utils/refactorFirebaseProfileData";
import refactorFirebaseSearchBusinessData from "../../../../utils/refactorFirebaseSearchBusinessData";
import searchProfile from "../../../../apis/profile/searchProfile";
import { clearBusinessData } from "../../../../redux/slices/businessProfileSlice";
import { clearProfileData } from "../../../../redux/slices/profileDataSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import getAllBusinessCountsByStatus from "../../../../apis/business/getAllBusinessCountsByStatus";

function ProfileApprovalTableView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Declaring states
  const [profileType, setProfileType] = useState("Business");
  const [profilesData, setProfilesData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [profilesDataHasMore, setProfilesDataHasMore] = useState(true);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const TAG_OPTIONS = ["All", "Review", "Prepared", "Approved", "Finalized", "Live", "Revisit", "Not Interested", "Not Aligned", "Suspended", "Banned", "Rejected"];
  const [tagCounts, setTagCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // All business counts by status
  const [selectedTag, setSelectedtag] = useState(0);

  // Setting focus on search input and tag/status counts
  useEffect(() => {
    document.getElementById("search-input").focus(); // Focus is on search input when page is loaded
    getBusinessCountByStatus(); // Getting business counts by status
  }, []);

  // Called initially and when new tag/status is selected
  useEffect(() => {

    // Loading all profiles
    setProfilesLoading(true);
    getAllProfiles();
  }, [selectedTag]);

  // Function to get all business counts by status
  const getBusinessCountByStatus = () => {

    getAllBusinessCountsByStatus()
      .then((response) => {
        setTagCounts(Object.values(response.data));
      })

      // Something went wrong
      .catch(() => { });
  }

  // Function to handle select tag/status
  const handleSelectTag = (index) => {
    setPageNumber(1); // Reset to page 1 for selected tag/status
    setSelectedtag(index); // Set selected tag/status
    setProfilesDataHasMore(true); // Set has more data to true for selected tag/status
  }

  // Function to get profiles data (Called initially and when new tag/status is selected)
  const getAllProfiles = async () => {

    await getApprovedProfiles(pageNumber, 40, TAG_OPTIONS[selectedTag].toLowerCase())
      .then((response) => {
        const data = response?.data;
        const currentPage = response?.current_page;
        const totalPages = response?.total_pages;

        if (currentPage === totalPages)
          setProfilesDataHasMore(false);

        setPageNumber(currentPage + 1);
        setProfilesData(refactorFirebaseProfileData(data)); // Profiles data state is set to new data received from API
        setProfilesLoading(false);
      })

      // Something went wrong
      .catch(() => { });
  };

  // Function to get profiles data (Called when more data is to be received from API when infinite scrolling)
  const getMoreProfiles = async () => {

    await getApprovedProfiles(pageNumber, 40, TAG_OPTIONS[selectedTag].toLowerCase())
      .then((response) => {
        const data = response?.data;
        const currentPage = response?.current_page;
        const totalPages = response?.total_pages;

        if (currentPage === totalPages)
          setProfilesDataHasMore(false);

        setPageNumber(currentPage + 1);
        setProfilesData(
          (prev) => [...prev, ...refactorFirebaseProfileData(data)]
        ); // Profiles data state is set to previous data plus new data received from API
        setProfilesLoading(false);
      })

      // Something went wrong
      .catch(() => { });
  };

  const updatedDeleteStatus = useSelector(
    (state) => state.deleteBusiness.deleteProfile
  );

  const updatedDeleteId = useSelector(
    (state) => state.deleteBusiness.deletedProfile
  );

  const searchInProfiles = (value) => {
    setProfilesLoading(true);
    searchProfile(value)
      .then((res) => {
        const data = res?.data;
        setProfilesData(refactorFirebaseSearchBusinessData(data));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setProfilesLoading(false);
      });
  };

  const getUpdatedProfiles = async () => {
    setProfilesLoading(true);

    await getApprovedProfiles(pageNumber, 40).then((response) => {
      const data = response?.data;
      setProfilesData((prev) => [...prev, ...refactorFirebaseProfileData(data)]);
      setProfilesLoading(false);
    });
  };

  useEffect(() => {
    setProfilesData(
      profilesData.filter((profile) => profile.id !== updatedDeleteId)
    );
  }, [updatedDeleteId]);

  // Search query and updated business after deleting a business
  useEffect(() => {

    if (searchValue !== "") {
      const search = setTimeout(() => {
        searchInProfiles(searchValue);
      }, 1000);

      return () => clearTimeout(search);
    }

    else {
      setTimeout(() => {
        getUpdatedProfiles();
      }, 1000);
    }
  }, [searchValue, updatedDeleteStatus]);

  return (
    <div className="profile-approval-table-view">

      {/* Profile select and add profile button */}
      <Box className="header-container">

        {/* Profile select */}
        <Box className="title-container">
          <Box className="select-container">
            <Select
              className="select"
              value={profileType}
              onChange={(e) => {
                setProfileType(e.target.value);
              }}
              sx={{ border: "none" }}
            >
              <MenuItem value={"Business"}>Business Profiles</MenuItem>
              <MenuItem value={"Creator"}>Creator Profiles</MenuItem>
              <MenuItem value={"User"}>User Profiles</MenuItem>
            </Select>
            <Box className="select-icon-container">
              <img src={upArrow} alt="up-arrow" />
              <img src={downArrow} alt="down-arrow" />
            </Box>
          </Box>
        </Box>

        {/* Add new profile button */}
        <Box
          className="upload-content-container"
          onClick={() => {
            dispatch(clearBusinessData());
            dispatch(clearProfileData());
            navigate("/profiles/add/information");
          }}
        >
          <Typography className="text">Add Profile</Typography>
          <img src={plusIcon} alt="plus" />
        </Box>
      </Box>

      {/* Search input and tags/status tabs */}
      <Box className="search-area">

        {/* Search input */}
        <Box className="search-container">
          <IconInput
            className="search-input-field"
            ref={searchInputRef}
            type={"text"}
            id="search-input"
            icon={searchIcon}
            placeholder={"Search"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autofocus="autofocus"
          />
        </Box>

        {/* Tags/status tabs */}
        <Box className="tags-container">
          {TAG_OPTIONS.map((tag, index) => (
            <Typography
              className={selectedTag === index ? "colored-tag" : "tag"}
              onClick={() => { handleSelectTag(index) }}
            >
              {tag + " (" + tagCounts[index] + ")"}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Business profiles table */}
      <Box className="table-area" sx={{ margin: profilesLoading ? "30px" : "0" }}>
        <Loader loading={profilesLoading}>
          <ApprovalTable
            mainTitle={profileType}
            data={profilesData}
            hasMore={profilesDataHasMore}
            fetchMoreData={getMoreProfiles}
            profileOptions={TAG_OPTIONS}
            setData={setProfilesData}
          />
        </Loader>
      </Box>
    </div>
  );
}

export default ProfileApprovalTableView;
