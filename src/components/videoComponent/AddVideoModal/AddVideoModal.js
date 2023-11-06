import React from "react";
import "./styles.scss";
import { Modal, Typography } from "@mui/material";
import squarePlus from "../../../assets/business/video/squarePlus.png";
import tick from "../../../assets/business/video/tick.png";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import OutlineButton from "../../Buttons/Outline/OutlineButton";
import { useNavigate } from "react-router-dom";
export default function AddVideoModal({ openModal, handleClose, handleOpenChooseVideoModal  }) {
    
  return (
      <Modal
        open={openModal}
        onClose={handleClose}
        className="add-video-modal"
        sx={{
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="modal-container">
          <div className="disclaimer-area">
            <Typography variant="h5" className="disclaimer-title">
              *All content submissions are subject to our Terms of Service. Any
              content that violates our Terms of Service will be taken down.
            </Typography>
          </div>
          <div className="modal-image-contaier">
            <img src={squarePlus} alt="square plus" />
          </div>
          <div className="modal-title-container">
            <Typography variant="h5" className="modal-title">
              Add to Video Menu
            </Typography>
            <Typography variant="h5" className="modal-subtitle">
              Post video content of items, products, experiences, and other
              offerings you’d like to sell.
            </Typography>
          </div>
          <div className="modal-list-container">
            <Typography variant="h5" className="modal-list-title">
              all videos must:
            </Typography>
            <ul className="modal-list">
              <li className="modal-list-item">
                <img src={tick} alt="tick" />
                <Typography variant="h5" className="modal-list-item-text">
                  showcase whats offered
                </Typography>
              </li>
              <li className="modal-list-item">
                <img src={tick} alt="tick" />
                <Typography variant="h5" className="modal-list-item-text">
                  BE portrait orientation
                </Typography>
              </li>
              <li className="modal-list-item">
                <img src={tick} alt="tick" />
                <Typography variant="h5" className="modal-list-item-text">
                  BE HIGH DEFINITION
                </Typography>
              </li>
              <li className="modal-list-item">
                <img src={tick} alt="tick" />
                <Typography variant="h5" className="modal-list-item-text">
                  BE ORIGINAL AND ACCURATE
                </Typography>
              </li>
            </ul>
          </div>
          <div className="modal-button-container">
            <OutlineButton text={"Cancel"} onClick={handleClose} />
            <PrimaryButton text={"Next"} onClick={()=>handleOpenChooseVideoModal()}/>
          </div>
          {/* <Typography variant="h5" className="modal-footer">
            Add an offering without video
          </Typography> */} 
        </div>
      </Modal>

  );
}
