import React from "react";
import "./styles.scss";
import checkMark from "../../../../assets/admin/common/checkMark.png";
import { Typography } from "@mui/material";
function PaymentSuccessful() {
  return (
    <div className="payment-successful">
      <img src={checkMark} alt="checkMark" />
      <Typography className="title">Payment Processed</Typography>
      <Typography className="description">
        Our team will contact you shortly can’t wait? <span>Chat with us.</span>
      </Typography>
    </div>
  );
}

export default PaymentSuccessful;
