import React from 'react'
import "../../Profiles/Approval/styles.scss";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useState } from 'react';
import plusIcon from "../../../../assets/admin/Content/plus.png";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import searchIcon from "../../../../assets/admin/common/search.png";
import NotificationsTable from '../../../../components/Tables/NotificationsTable/NotificationsTable';
import { useNavigate } from "react-router-dom";
import NotificationsData from './NotificationsData';

function ManageNotifications() {

    const navigate = useNavigate();
    const TAG_OPTIONS = [
        "All",
        "Live",
        "Paused",
        "Deleted",
    ];

  const [selectedTag, setSelectedtag] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="profile-approval-table-view">
      <Box className="header-container">
        <Box className="title-container">
          <Box className="select-container">
            <Box className="select-icon-container">
                <h2>Manage Notifications</h2>
            </Box>
          </Box>
        </Box>
        <Box
          className="upload-content-container"
          onClick={() => navigate("/notifications/create")}
        >
          <Typography className="text">New Notification</Typography>
          <img src={plusIcon} alt="plus" />
        </Box>
      </Box>
      <Box className="search-area">
        <Box className="search-container">
          <IconInput
            icon={searchIcon}
            placeholder={"Search"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Box>
        <Box className="tags-container">
          {TAG_OPTIONS.map((tag, index) => (
            <Typography
              className={selectedTag === index ? "colored-tag" : "tag"}
              onClick={() => setSelectedtag(index)}
            >
              {tag} <span>(30)</span>
            </Typography>
          ))}
        </Box>
      </Box>
      <Box
        className="table-area"
        sx={{ margin: "0" }}
      >
        <NotificationsTable
            data={NotificationsData}
          />
    
      </Box>
    </div>
  )
}

export default ManageNotifications