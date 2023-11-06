import React, { useEffect } from "react";
import ProfileDetails from "../Details";
import ReviewProfileHeader from "../../../../components/ProfileDetailHeaders/ReviewProfile/ReviewProfileHeader";

function ReviewProfile() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProfileDetails header={<ReviewProfileHeader />} type={"review"} />;
}

export default ReviewProfile;
