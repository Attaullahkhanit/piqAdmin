import { Grid, Typography } from "@mui/material";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { showToastError } from "../../../utils/showToasify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/auth";
import Loader from "../../../components/Util/Loader/Loader";

function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);
  const [selfLoading, setSelfLoading] = useState(false);
  const EMAIL_VALIDATOR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (email.trim() === "" || password.trim() === "") {
      showToastError("Please fill all the fields");
    } else {
      if (!EMAIL_VALIDATOR.test(email)) {
        showToastError("Please enter valid email");
      } else {
        if (email === "piqadmin@piq.com" && password === "ironm@n") {
          dispatch(login({ email, password }));
        } else {
          setSelfLoading(true);
          setTimeout(() => {
            setSelfLoading(false);
            showToastError("Invalid Credentials");
          }, 1500);
        }
      }
    }
  };
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn]);
  return (
    <div className="signin-page">
      <div className="signin-content-area">
        <Typography className="title"> Welcome to Admin</Typography>
        <div className="form-container">
          <Grid item xs={12} className="form-subcontainer">
            <Typography className="form-label">Email</Typography>
            <IconInput
              className="input-field"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <h3>Password</h3>
          <IconInput
            type={showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-field"
            placeholder={"Enter Password"}
            icon={
              showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )
            }
            position={"right"}
            onIconClick={togglePasswordVisibility}
          />
        </div>
        <div className="submit-button-container">
          <Loader loading={loading || selfLoading}>
            <PrimaryButton text="Continue" onClick={handleSubmit} />
          </Loader>
        </div>
        <Typography className="form-bottom-text">
          Questions? <span className="form-bottom-text-span">Chat with us</span>
        </Typography>
      </div>
    </div>
  );
}

export default SignIn;
