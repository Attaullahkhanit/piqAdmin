import { Box, Typography } from "@mui/material";
import React from "react";
import "./styles.scss";
import eyeIcon from "../../../../../assets/admin/Content/eye.png";
import videoIcon from "../../../../../assets/admin/Content/video.png";
import clockIcon from "../../../../../assets/admin/Content/clock.png";
import messageIcon from "../../../../../assets/admin/Content/message.png";
import saveIcon from "../../../../../assets/admin/Content/save.png";
import shoppingIcon from "../../../../../assets/admin/Content/shopping.png";
import moneyIcon from "../../../../../assets/admin/Content/money.png";
import trendUpIcon from "../../../../../assets/admin/Content/trendPlus.png";
import trendDownIcon from "../../../../../assets/admin/Content/trendDown.png";
import dot from "../../../../../assets/admin/Dashboard/dot.png";
import OutlineButton from "../../../../../components/Buttons/Outline/OutlineButton";
function ContentStats({handleClose}) {
  return (
    <div className="content-stats">
      <Box className="stats-component">
        <Box className="header-container">
          <Box className="title-container">
            <Typography className="title">
              Dierk’s Bentley’s Whiskey Row
            </Typography>
            <Box className="tags-container">
              <Box className="tag-group">
                <Typography className="subtitle">Pheonix</Typography>
                <img className="dot-image" alt="dot" src={dot} />
              </Box>
            </Box>
          </Box>
          <Box className="customer-details-container">
            <Typography className="customer-details-title">
              Customer Since
            </Typography>
            <Typography className="customer-details-value">Feb 2023</Typography>
          </Box>
        </Box>
        <Box className="stats-container">
          <Box className="stat-group">
            <Box className="stat-title-container">
              <img className="stat-icon" alt="icon" src={eyeIcon} />
              <Typography className="stat-title">Impressions</Typography>
            </Box>
            <Box className="stat-value-container">
              <Typography className="stat-value">1,000</Typography>
              <Box className="stat-trend-container">
                <img src={trendUpIcon} alt="trend-up" />
                <Typography className="stat-trend-value-positive">
                  +10%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="stat-group">
            <Box className="stat-title-container">
              <img className="stat-icon" alt="icon" src={videoIcon} />
              <Typography className="stat-title">Views</Typography>
            </Box>
            <Box className="stat-value-container">
              <Typography className="stat-value">300</Typography>
              <Box className="stat-trend-container">
                <img src={trendDownIcon} alt="trend-up" />
                <Typography className="stat-trend-value-negative">
                  -10%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="stat-group">
            <Box className="stat-title-container">
              <img className="stat-icon" alt="icon" src={eyeIcon} />
              <Typography className="stat-title">View Time (avg)</Typography>
            </Box>
            <Box className="stat-value-container">
              <Typography className="stat-value">129 s </Typography>
              <Box className="stat-trend-container">
                <img src={trendUpIcon} alt="trend-up" />
                <Typography className="stat-trend-value-positive">
                  +10%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="stat-group">
            <Box className="stat-title-container">
              <Typography className="stat-title">% Completed</Typography>
            </Box>
            <Box className="stat-value-container">
              <Typography className="stat-value">30%</Typography>
              <Box className="stat-trend-container">
                <img src={trendUpIcon} alt="trend-up" />
                <Typography className="stat-trend-value-positive">
                  +10%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="stat-group">
            <Box className="stat-title-container">
              <img className="stat-icon" alt="icon" src={messageIcon} />
              <Typography className="stat-title">Shares</Typography>
            </Box>
            <Box className="stat-value-container">
              <Typography className="stat-value">300</Typography>
              <Box className="stat-trend-container">
                <img src={trendUpIcon} alt="trend-up" />
                <Typography className="stat-trend-value-positive">
                  +10%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="stat-group">
            <Box className="stat-title-container">
              <img className="stat-icon" alt="icon" src={saveIcon} />
              <Typography className="stat-title">Saves</Typography>
            </Box>
            <Box className="stat-value-container">
              <Typography className="stat-value">300</Typography>
              <Box className="stat-trend-container">
                <img src={trendUpIcon} alt="trend-up" />
                <Typography className="stat-trend-value-positive">
                  +10%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="stat-group">
            <Box className="stat-title-container">
              <img className="stat-icon" alt="icon" src={shoppingIcon} />
              <Typography className="stat-title">Clickthroughs</Typography>
            </Box>
            <Box className="stat-value-container">
              <Typography className="stat-value">300</Typography>
              <Box className="stat-trend-container">
                <img src={trendUpIcon} alt="trend-up" />
                <Typography className="stat-trend-value-positive">
                  +10%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="stat-group">
            <Box className="stat-title-container">
              <img className="stat-icon" alt="icon" src={moneyIcon} />
              <Typography className="stat-title">Impressions</Typography>
            </Box>
            <Box className="stat-value-container">
              <Typography className="stat-value">$300</Typography>
              <Box className="stat-trend-container">
                <img src={trendUpIcon} alt="trend-up" />
                <Typography className="stat-trend-value-positive">
                  +10%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <OutlineButton text={"Go Back"} onClick={handleClose} />
      </Box>
    </div>
  );
}

export default ContentStats;
