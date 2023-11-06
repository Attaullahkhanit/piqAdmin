import React from "react";
import "./styles.scss";
import SubscriptionCard from "../../../../components/Cards/Subscription/SubscriptionCard";
import { Box, Typography } from "@mui/material";
import diamond from "../../../../assets/admin/common/diamond.png";
import { subscriptionCardData } from "../../../../components/Cards/Subscription/dummyContent";
function Subscription() {
  return (
    <div className="subscription">
      <Typography className="title"> Select a Subscription Plan</Typography>
      <Typography className="sub-title">
        That best suits your goals and budget
      </Typography>
      <Box className="subscription-card-container">
        {subscriptionCardData.map((card, index) => (
          <SubscriptionCard
            icon={card?.icon}
            title={card.title}
            price={card.price}
            details={card.details}
            buttonText={card.buttontext}
            offered={card.current}
          />
        ))}
      </Box>
    </div>
  );
}

export default Subscription;
