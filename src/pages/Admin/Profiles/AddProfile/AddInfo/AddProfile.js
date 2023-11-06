import React from "react";
import "./styles.scss";
import ProfileDetails from "../../Details";
import AddProfileHeader from "../../../../../components/ProfileDetailHeaders/AddProfile/AddProfileHeader";
export default function AddProfile() {
  return (
    <div>
      <ProfileDetails header={<AddProfileHeader />} type={"add"} />
    </div>
  );
}
