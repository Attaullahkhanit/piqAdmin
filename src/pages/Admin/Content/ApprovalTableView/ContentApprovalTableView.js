import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
import playContentIcon from "../../../../assets/admin/Content/playCircle.png";
import plusIcon from "../../../../assets/admin/Content/plus.png";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import searchIcon from "../../../../assets/admin/common/search.png";
import ApprovalTable from "../../../../components/Tables/ApprovalTable/ApprovalTable";
import { useNavigate } from "react-router-dom";
import { fetchAllContent } from "../../../../apis/dashboard/content/fetchAllContent";
import refactorBusinessDataToAssets from "../../../../utils/refactorBusinessDataToAssets";
import Loader from "../../../../components/Util/Loader/Loader";
import searchAssets from "../../../../apis/assets/searchAssets";
import getAllAssetCountsByStatus from "../../../../apis/dashboard/content/getAllAssetCountsByStatus";

function ContentApprovalTableView() {
  const navigate = useNavigate();

  const [selectedTag, setSelectedtag] = useState(0);
  const [allAssets, setAllAssets] = useState([]);
  const [allAssetsUnfiltered, setAllAssetsUnfiltered] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const TAG_OPTIONS = ["All", "Review", "Approved", "Live", "Denied"];
  const [tagCounts, setTagCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // All asset counts by status

  // Setting focus on search input and tag/status counts
  useEffect(() => {
    document.getElementById("search-input").focus(); // Focus is on search input when page is loaded
    getAssetCountByStatus(); // Getting asset counts by status
  }, []);

  // Called initially and when new tag/status is selected
  useEffect(() => {

    // Loading all profiles
    setContentLoading(true);
    getAllAssets();
  }, [selectedTag]);

  // Function to get all asset counts by status
  const getAssetCountByStatus = () => {
    getAllAssetCountsByStatus()
      .then((response) => {
        setTagCounts(Object.values(response?.data));
      })

      // Something went wrong
      .catch(() => { });
  }

  // Function to handle select tag/status
  const handleSelectTag = (index) => {
    setPageNumber(1); // Reset to page 1 for selected tag/status
    setSelectedtag(index); // Set selected tag/status
    setHasMore(true); // Set has more data to true for selected tag/status
  }

  // Function to get assets data (Called initially and when new tag/status is selected)
  const getAllAssets = async () => {

    await fetchAllContent(pageNumber, 30, TAG_OPTIONS[selectedTag].toLowerCase())
      .then((res) => {
        const assets = res?.data?.assets;
        const businesses = res?.data?.businesses.filter((item) => item !== null);
        const currentPage = res?.current_page;
        const totalPages = res?.total_pages;

        if (currentPage === totalPages)
          setHasMore(false);

        setPageNumber(currentPage + 1);
        setAllAssets(refactorBusinessDataToAssets(assets, businesses));  // Assets data state is set to new data received from API
        setContentLoading(false);
      })

      // Something went wrong
      .catch(() => { });
  };

  // Function to get assets data (Called when more data is to be received from API when infinite scrolling)
  const getMoreAssets = async () => {

    await fetchAllContent(pageNumber, 30, TAG_OPTIONS[selectedTag].toLowerCase())
      .then((res) => {
        const assets = res?.data?.assets;
        const businesses = res?.data?.businesses.filter((item) => item !== null);
        const currentPage = res?.current_page;
        const totalPages = res?.total_pages;

        if (currentPage === totalPages)
          setHasMore(false);

        setPageNumber(currentPage + 1);
        setAllAssets(
          (prev) => [...prev, ...refactorBusinessDataToAssets(assets, businesses)]
        );  // Assets data state is set to previous data plus new data received from API
        setContentLoading(false);
      })

      // Something went wrong
      .catch(() => { });
  };

  const searchContent = (value) => {
    setContentLoading(true);
    searchAssets(value)
      .then((res) => {
        const assets = res?.data?.assets;
        const businesses = res?.data?.businesses?.filter(
          (item) => item !== null
        );
        setAllAssets((prev) => [
          ...refactorBusinessDataToAssets(assets, businesses),
        ]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setContentLoading(false);
      });
  };

  useEffect(() => {
    if (searchValue && searchValue !== "") {
      const search = setTimeout(() => {
        searchContent(searchValue);
      }, 1000);
      return () => clearTimeout(search);
    } else {
      setAllAssets(
        allAssetsUnfiltered.filter(
          (item) => item.status === TAG_OPTIONS[selectedTag]
        )
      );
    }
  }, [searchValue]);

  return (
    <div className="content-approval-table-view">

      {/* Manage content section */}
      <Box className="header-container">
        <Box className="title-container">
          <Typography className="title">Manage Content</Typography>
          <Box
            className="play-content-button"
            onClick={() => navigate("/content/approval/playback")}
          >
            <img src={playContentIcon} alt="play-content" />
          </Box>
        </Box>
        <Box className="upload-content-container" onClick={() => navigate("/content/chooseProfile")}>
          <Typography className="text">Upload Content</Typography>
          <img src={plusIcon} alt="plus" />
        </Box>
      </Box>


      {/* Search input and tags section */}
      <Box className="search-area">

        {/* Search input */}
        <Box className="search-container">
          <IconInput
            icon={searchIcon}
            id="search-input"
            placeholder={"Search"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Box>

        {/* Tags/status */}
        <Box className="tags-container">
          {TAG_OPTIONS.map((tag, index) => (
            <Typography
              className={selectedTag === index ? "colored-tag" : "tag"}
              onClick={() => handleSelectTag(index)}
            >
              {tag + " (" + tagCounts[index] + ")"}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Table section */}
      <Box className="table-area" sx={{ margin: contentLoading ? "30px" : "0" }}>
        <Loader loading={contentLoading}>
          <ApprovalTable
            mainTitle={"video"}
            data={allAssets}
            hasMore={hasMore}
            fetchMoreData={getMoreAssets}
            profileOptions={TAG_OPTIONS}
            setData={setAllAssets}
          />
        </Loader>
      </Box>
    </div>
  );
}

export default ContentApprovalTableView;
