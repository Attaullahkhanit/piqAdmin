import React from "react";
import ProfileDetails from "../../../Admin/Profiles/Details";
import ManageBusinessProfilesHeader from "../../../../components/ProfileDetailHeaders/ManageBusinessProfiles/ManageBusinessProfilesHeader";
import { useParams } from "react-router-dom";

export default function ManageBusinessProfile() {
  const [selectedLink, setSelectedLink] = React.useState(-1);
  const links = [
    "Account Information",
    "Subscription Plan",
    "Users & Access",
    "Referrals",
    "Change Password",
  ];
  const { id } = useParams();
  return (
    <div className="manage-business-profile">
      <ProfileDetails
        id={id}
        header={
          <ManageBusinessProfilesHeader
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
        }
        selectedRefIndex={selectedLink}
        type={"manage"}
      />
    </div>
  );
}
