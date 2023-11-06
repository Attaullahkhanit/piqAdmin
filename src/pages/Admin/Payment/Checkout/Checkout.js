import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();
  return (
    <div className="checkout">
      <Box className="checkout-container">
        <Box className="inner-container">
          <Typography className="title">Checkout</Typography>
          <Typography className="sub-title">
            Note: Subscriptions will not start until app is live in your area.
            Payment methods will not be charged until app is live.
          </Typography>
        </Box>
        <Box className="payment-container">
          <Box className="payment-row">
            <Typography className="title">
              Subscription Plan (Starter)
            </Typography>
            <Typography className="price">$69.00/mo</Typography>
          </Box>
          <Box className="payment-row">
            <Typography className="title">Processing Fee (3% + 30¢)</Typography>
            <Typography className="price">$2.37</Typography>
          </Box>
          <Box className="payment-row">
            <Typography className="title">Taxes</Typography>
            <Typography className="price">$78.27</Typography>
          </Box>
          <Box className="total-row">
            <Typography className="title">Total</Typography>
            <Typography className="price">$78.27</Typography>
          </Box>
        </Box>
        <Box className="payment-button-container">
          <Box className="proceed-button">
            <PrimaryButton text={"Proceed to Checkout"} onClick={()=>{navigate('/payment')}}/>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Checkout;
