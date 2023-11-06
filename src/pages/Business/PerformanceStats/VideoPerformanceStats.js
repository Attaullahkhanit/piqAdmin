import React from "react";
import "./styles.scss";
import dummyframe from "../../../assets/business/videoStats/dummyFrame.png";
import deleteIcon from "../../../assets/business/videoStats/trash.png";
import viewIcon from "../../../assets/business/videoStats/view.png";
import editIcon from "../../../assets/business/videoStats/edit.png";
import videoIcon from "../../../assets/business/videoStats/video.png";
import shareIcon from "../../../assets/business/videoStats/share.png";
import saveIcon from "../../../assets/business/videoStats/save.png";
import eyeIcon from "../../../assets/business/videoStats/eye.png";
import clockIcon from "../../../assets/business/videoStats/clock.png";
import eyeMoneyIcon from "../../../assets/business/videoStats/eyeMoney.png";
import cpcIcon from "../../../assets/business/videoStats/ppc.png";
import shoppingIcon from "../../../assets/business/videoStats/shopping.png";
import meterIcon from "../../../assets/business/videoStats/meter.png";
import moneyIcon from "../../../assets/business/videoStats/usd-circle.png";
import chart from "../../../assets/business/videoStats/chart.png";
import trendDown from "../../../assets/admin/Content/trendDown.png";
import trendUp from "../../../assets/admin/Content/trendPlus.png";
import profileDummy from "../../../assets/admin/Profile/profilePicture.png";
import { Box, Grid, Slider, Stack, Typography } from "@mui/material";

export default function VideoPerformanceStats() {
  const [budget, setBudget] = React.useState(0);
  return (
    <div className="video-performance-stats">
      <Box className="video-performance-content-area">
        <Box className="video-frame-container">
          <img src={dummyframe} alt="dummyframe" className="video-frame" />
        </Box>
        <Box className="video-details-container">
          <Box className="top-area">
            <Box className="left-area">
              <Typography className="video-title">
                Blueberry Pancakes
              </Typography>
              <Box className="user-details">
                <img src={profileDummy} alt="profileDummy" />
                <Typography className="user-name">
                  Content by Jack Paul
                </Typography>
              </Box>
            </Box>
            <Box className="right-area">
              <img src={deleteIcon} alt="deleteIcon" />
              <img src={viewIcon} alt="view" />
              <img src={editIcon} alt="edit" />
            </Box>
          </Box>
          <Box className="bottom-area">
            <Box className="stat-section">
              <Box className="stat-title-container">
                <img src={videoIcon} alt="videoIcon" />
                <Typography className="stat-title">Views</Typography>
              </Box>
              <Typography className="stat-value">300M</Typography>
            </Box>
            <Box className="stat-section">
              <Box className="stat-title-container">
                <img src={shareIcon} alt="shareIcon" />
                <Typography className="stat-title">Shares</Typography>
              </Box>
              <Typography className="stat-value">300K</Typography>
            </Box>
            <Box className="stat-section">
              <Box className="stat-title-container">
                <img src={saveIcon} alt="saveicon" />
                <Typography className="stat-title">Saves</Typography>
              </Box>
              <Typography className="stat-value">300</Typography>
            </Box>
          </Box>
        </Box>
        <Grid
          container
          className="stats-container"
          rowGap={1}
          columnSpacing={1}
          justifyContent={"center"}
        >
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={eyeIcon} alt="eyeIcon" />
                <Typography className="stats-card-title">
                  Impressions
                </Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={videoIcon} alt="videoIcon" />
                <Typography className="stats-card-title">Views</Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendDown} alt="trendDown" />
                  <Typography className="trend-value-down">-12.9%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <Typography className="stats-card-title">
                  % Completed
                </Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">30%</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={clockIcon} alt="clock" />
                <Typography className="stats-card-title">
                  View Time (avg)
                </Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={eyeMoneyIcon} alt="eyeIcon" />
                <Typography className="stats-card-title">CPM</Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={cpcIcon} alt="eyeIcon" />
                <Typography className="stats-card-title">CPC</Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={shoppingIcon} alt="shopping" />
                <Typography className="stats-card-title">Clicks</Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={meterIcon} alt="meterIcon" />
                <Typography className="stats-card-title">Click Rate</Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={shareIcon} alt="shareIcon" />
                <Typography className="stats-card-title">Shares</Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={saveIcon} alt="saveIcon" />
                <Typography className="stats-card-title">Saves</Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="stats-card">
              <Typography className="slider-card-title">
                Daily Budget
              </Typography>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 3 }}
                alignItems="center"
              >
                <Typography className="budget-text">0</Typography>
                <Slider
                  aria-label="Volume"
                  value={budget}
                  onChange={(e, newValue) => {
                    setBudget(newValue);
                  }}
                  step={10}
                  min={0}
                  max={2000}
                  valueLabelDisplay="on"
                />
                <Typography className="budget-text">2k</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="stats-card">
              <Box className="stats-card-header">
                <img src={moneyIcon} alt="money" />
                <Typography className="stats-card-title">Earnings</Typography>
              </Box>
              <Box className="stats-card-body">
                <Typography className="stats-card-value">300</Typography>
                <Box className="trend-container">
                  <img src={trendUp} alt="trendUp" />
                  <Typography className="trend-value-up">+10%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <img src={chart} alt="chart" className="chart-image" />
          </Grid>

        </Grid>
      </Box>
    </div>
  );
}
