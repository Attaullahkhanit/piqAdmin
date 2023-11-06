import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import "./styles.scss";
import IconInput from "../../InputFields/IconInput/IconInput";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import OutlineButton from "../../Buttons/Outline/OutlineButton";

export default function ProfileDashboardAdd({ handleClose, open, handleSuccess }) {

  const [inputValue, setInputValue] = useState(""); // Local state to hold the input value
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSuccessLocal = () => {
    handleSuccess(inputValue); // Call the prop function to update the parent's state
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
            New Menu Category
          </Typography>
          <Typography id="modal-modal-description" className="modal-modal-description" sx={{ mt: 2 }}>
            Please give this menu category a name
          </Typography>
          <Typography className="name-text">Name</Typography>
          <IconInput
            placeholder="Enter Here"
            type="text"
            onChange={handleInputChange}
          />
          <div className="button-container">
            <div className="button-cancel" onClick={handleClose}><OutlineButton text="Cancel"/></div>
            <div className="button-create" onClick={handleSuccessLocal}><PrimaryButton text="Create"/></div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
