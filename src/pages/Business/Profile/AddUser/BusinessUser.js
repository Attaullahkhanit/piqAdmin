import React, { useState } from "react";
import "./styles.scss";
import { Box, Grid, Modal, Typography } from "@mui/material";
import userDummy from "../../../../assets/admin/Profile/userPlaceholder.png";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import deleteIcon from "../../../../assets/business/videoStats/trash.png";
import OutlineButton from "../../../../components/Buttons/Outline/OutlineButton";
import DangerButton from "../../../../components/Buttons/Danger/DangerButton";


export default function BusinessUser() {

  // const [userid, setUserId] = useState();
  // const [userfname, setfName] = useState();
  // const [userlname, setUserlName] = useState();
  // const [useremail, setUserEmail] = useState();
  // const [phonenumber, setPhoneNumber] = useState();

//   var raw = JSON.stringify({
//       userid: userid,
//       fname: userfname,
//       lname: userlname,
//       email: useremail,
//       phoneNo: phonenumber,
// });

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };
//   fetch("${baseUrl}", requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       console.log(result, 'alcholic form data submit result')
//       navigate('/alcholicperfumes')
//       alert(result.message, 'data successfully submited')
//     } 
//      // console.log(result, 'Alcholic Data');
//      )
//      .catch(error => console.log('error', error));
//  }


  const [openRemoveUserModal, setOpenRemoveUserModal] = React.useState(false);


  const handleClose = () => {
    setOpenRemoveUserModal(false);
  };

  const handleOpen = () => {
    setOpenRemoveUserModal(true);
  };
  return (
    <Box className="add-business-user">
      <Modal
        open={openRemoveUserModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
        sx={{
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="add-business-modal-container">
          <div className="top-container">
            <img src={deleteIcon} alt="delete" className="delete-icon" />
            <Typography className="modal-title">Remove John Wick</Typography>
            <Typography className="modal-subtitle">
              Are you sure you want to remove johnwick?
            </Typography>
          </div>
          <div className="bottom-container">
            <OutlineButton text="Back" onClick={handleClose} />
            <DangerButton text="Remove" onClick={handleClose} />
          </div>
        </div>
      </Modal>
      <Box className="add-business-user-content-area">
        <Box className="user-image-container">
          <Box className="image-outer">
            <img src={userDummy} alt="user" className="user-image" />
          </Box>
          <Box className="user-role-container">
            <Typography className="user-role">Admin</Typography>
          </Box>
        </Box>
        <Box className="user-form-container">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className="form-label">Username</Typography>
              <IconInput placeholder="Enter Here"/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="form-label">First Name</Typography>
              <IconInput placeholder="Enter Here" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="form-label">Last Name</Typography>
              <IconInput placeholder="Enter Here"  />
            </Grid>
            <Grid item xs={12}>
              <Typography className="form-label">Email</Typography>
              <IconInput placeholder="Enter Here"  />
            </Grid>
            <Grid item xs={12}>
              <Typography className="form-label">Phone Number</Typography>
              <IconInput placeholder="555-555-5555" />
            </Grid>
          </Grid>
        </Box>
        <Box className="user-form-actions">
          <Box className="button-container">
            <PrimaryButton text="Continue" />
          </Box>
          <Typography className="remove-text" onClick={handleOpen}>
            Remove this User
          </Typography>
        </Box>
        <Box className="admin-transfer-container">
          <Typography className="admin-transfer-text">
            To transfer admin ownership to this user
          </Typography>
          <Typography className="connect-text">
            connect with out support team
          </Typography>
        </Box>
      </Box>
    </Box>
  );
  }
      