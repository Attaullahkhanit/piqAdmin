import React from "react";
import "./manageContent.scss";
import { Box, Typography } from "@mui/material";
import contentImage from "../../../../assets/admin/common/dummyImage.png";
import userImage from "../../../../assets/admin/common/dummy2.png";
import cutlery from "../../../../assets/admin/Dashboard/cutlery.png";
import dot from "../../../../assets/admin/Dashboard/dot.png";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../../../utils/getTimeAgo";

export default function ManageContent({ id, data }) {
  const navigate = useNavigate();
  return (
    <Box
      className="manage-content-card"
      onClick={() => {
        navigate(`/content/detail/${id}`);
      }}
    >
      <Box className="left-area">
        <img src={data?.thumbnail} alt="content" />
      </Box>
      <Box className="right-area">
        <Box className="title-container">
          <Typography className="title">{data?.assetName}</Typography>
          <Typography className="time">{timeAgo(data?.createdAt)}</Typography>
          {/* <Typography className="title">{data}</Typography> */}
        </Box>
        <Box className="tags-container">
          {data?.ownerTags?.map((label, index) => (
            <Box className="tag-group">
              <Typography className="tag">{label}</Typography>
              {index + 1 !== data?.assetVideo?.videoTags?.length && (
                <img src={dot} alt="dot" className="divider" />
              )}
            </Box>
          ))}
        </Box>
        {data?.businessImageUrl && (
          <Box className="user-detail-container">
            <img src={data?.businessImageUrl} alt="content" />
            <Typography className="user-name">{data?.businessName}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
