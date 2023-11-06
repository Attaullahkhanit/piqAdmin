import React from "react";
import "./styles.scss";
import { Box, Grid, Typography } from "@mui/material";
import IconInput from "../../../InputFields/IconInput/IconInput";
import clockIcon from "../../../../assets/admin/Profile/clockIcon.png";
function DayTimingCard({
  day,
  openTime,
  closeTime,
  dayStatus,
  onOpenTimeChange,
  onCloseTimeChange,
  onDayStatusChange,
  disabled,
}) {
  return (
    <div className="day-timing-card">
      <div className="top-area">
        <Typography className="day-text">{day}</Typography>
        <label className="switch">
          <input
            type="checkbox"
            checked={dayStatus}
            onChange={onDayStatusChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <Grid container columnSpacing={4} rowSpacing={1} className="bottom-area">
        <Grid item sx={6} className="time-container">
          <Typography className="field-label">Open</Typography>
          <IconInput
            icon={clockIcon}
            type={"time"}
            value={openTime}
            onChange={onOpenTimeChange}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6} className="time-container">
          <Typography className="field-label">Close</Typography>
          <IconInput
            icon={clockIcon}
            type={"time"}
            value={closeTime}
            onChange={onCloseTimeChange}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default DayTimingCard;
