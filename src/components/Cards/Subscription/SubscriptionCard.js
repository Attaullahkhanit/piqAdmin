import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
import check from "../../../assets/admin/common/checkMark.png";
import cross from "../../../assets/admin/common/crossMark.png";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
export default function SubscriptionCard({
  icon,
  title,
  price,
  details,
  buttonText,
  offered,
}) {
  return (
    <Box className="subscription-card">
      <Box className="subscription-card-header">
        {icon && (
          <Box className="left-area">
            <img src={icon} alt="subscription-card-icon" />
          </Box>
        )}
        <Box className="right-area">
          <Typography className="title">{title}</Typography>
          <Typography className="price">
            {price} <span>/Month</span>
          </Typography>
        </Box>
      </Box>
      <Box className="details-area">
        {details.map((detail) => (
          <Box className="detail-group">
            <img src={detail.offered ? check : cross} alt="icon" />
            <Typography className={detail.offered? "detail":"detail-cancelled"}>{detail.detail}</Typography>
          </Box>
        ))}
      </Box>
      <Box className="subscription-bottom-area">
        <PrimaryButton text={buttonText} disabled={offered} />
        {!offered && <Typography className="cancel">Cancel Anytime</Typography>}
      </Box>
    </Box>
  );
}
