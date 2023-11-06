import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import applePay from "../../../../assets/admin/common/applePay.png";
import stripe from "../../../../assets/admin/common/stripe.png";
import paypal from "../../../../assets/admin/common/paypal.png";
import gpay from "../../../../assets/admin/common/gpay.png";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
function PaymentMethod() {
  const navigate = useNavigate();
  return (
    <Box className="payement-method">
      <Box className="payment-method-container">
        <Typography className="title">Add Payment Method</Typography>
        <Box className="row-full">
          <Typography className="field-title">Card Number</Typography>
          <IconInput placeholder={"Enter Here"} type={"text"} />
        </Box>
        <Box className="row">
          <Box className="col">
            <Typography className="field-title">Expiration Date</Typography>
            <IconInput placeholder={"MM/YY"} type={"text"} />
          </Box>
          <Box className="col">
            <Typography className="field-title">CVV</Typography>
            <IconInput placeholder={"000"} type={"text"} />
          </Box>
        </Box>
        <Box className="divider">
          <Typography className="divider-text">Or Purchase With</Typography>
        </Box>
        <Box className="payment-types-container">
          <img src={applePay} className="apple-pay" />
          <img src={stripe} className="payment-logo" />
          <img src={paypal} className="payment-logo" />
          <img src={gpay} className="payment-logo" />
        </Box>
        <Box className="bottom-container">
          <Box className="total-payment-container">
            <Typography className="total-payment-title">Total</Typography>
            <Typography className="total-payment-value">$78.27</Typography>
          </Box>
          <Box className="button-area">
            <Box className="button-container">
              <PrimaryButton
                text={"Pay"}
                onClick={() => {
                  navigate("/paymentSuccessful");
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PaymentMethod;
