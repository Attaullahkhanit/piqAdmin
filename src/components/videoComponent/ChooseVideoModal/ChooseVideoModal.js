import { Modal, Typography } from "@mui/material";
import React from "react";
import "./styles.scss";
import camera from "../../../assets/business/video/camera.png";
import cross from "../../../assets/business/video/cross.png";
import OutlineButton from "../../Buttons/Outline/OutlineButton";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
export default function ChooseVideoModal({ openModal, handleClose }) {
    const navigate = useNavigate();
  return (
    <Modal
      className="choose-video-modal"
      open={openModal}
      onClose={handleClose}
      sx={{ backdropFilter: "blur(5px)" }}
    >
      <div className="modal-container">
        <img src={cross} alt="cross" className="cross" onClick={handleClose} />
        <div className="modal-content-container">
          <img src={camera} alt="camera" />
          <Typography className="choose-text">Choose</Typography>
          <Typography className="title-text">What would like to do?</Typography>
        </div>
        <div className="modal-button-container">
          <OutlineButton text={"Cancel"} onClick={handleClose}/>
          <PrimaryButton text={"Upload"} onClick={()=>{navigate('/business/video/add')}}/>
        </div>
      </div>
    </Modal>
  );
}
