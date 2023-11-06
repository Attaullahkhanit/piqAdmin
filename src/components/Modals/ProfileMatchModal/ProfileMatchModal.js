import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import "./styles.scss";
import BusinessProfileCard from "../../Cards/Profile/BusinessProfileCard/BusinessProfileCard";
import instagram from "../../../assets/admin/Profile/instagram.png";
import website from "../../../assets/admin/Profile/globe.png";
import SecondaryButton from "../../Buttons/Secondary/SecondaryButton";
import OutlineButton from "../../Buttons/Outline/OutlineButton";

export default function ProfileMatchModal({ handleClose, open, profile }) {
  const socialLinks = [];
  if (profile?.businessinstagram) {
    const link = "@" + profile?.businessinstagram.split("/")[3];
    socialLinks.push({
      icon: instagram,
      link,
    });
  }
  if (profile?.website) {
    const linkArray = profile?.website.split("/");
    const link = linkArray[0] + linkArray[1] + linkArray[2];
    socialLinks.push({
      icon: website,
      link,
    });
  }
  return (
      <Modal className="profile-match-modal" onClose={handleClose} open={open}>
        <Box className="modal-content">
          <Typography className="title">{profile?.name}</Typography>
          <Box className="current-profile-container">
            <BusinessProfileCard
              businessTitle={profile?.name}
              businessType={profile?.tags && profile?.tags[0]}
              time={"3d ago"}
              address={profile?.location}
              tags={[]}
              id={profile?.id}
              socialsLinks={socialLinks}
              hideButtons={true}
            />
            <Box className="tag-container">
              <Typography className="tag-title">Current Profile</Typography>
            </Box>
          </Box>
          <Box className="potential-match-container">
            <BusinessProfileCard
              businessTitle={profile?.name}
              businessType={profile?.tags && profile?.tags[0]}
              time={"3d ago"}
              address={profile?.location}
              tags={[]}
              id={profile?.id}
              socialsLinks={socialLinks}
              hideButtons={true}
            />
            <Box className="tag-container">
              <Typography className="tag-title">Potential Match</Typography>
            </Box>
          </Box>
          <OutlineButton text={"Back"} onClick={handleClose} />
        </Box>
      </Modal>
  );
}
