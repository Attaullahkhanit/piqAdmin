import React from "react";
import "./footer.scss";
import facebookIcon from "../../assets/footer/facebookIcon.png";
import tiktokIcon from "../../assets/footer/tiktokIcon.png";
import instagramIcon from "../../assets/footer/instagramIcon.png";
import emailIcon from "../../assets/footer/emailIcon.png";
import phoneIcon from "../../assets/footer/phoneIcon.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="left-container">
        <p className="footer-text">© piq IT 2023</p>
        <p
          className="footer-text"
          onClick={() => navigate("/termsAndConditions")}
        >
          Terms
        </p>
        <p
          className="footer-text"
          onClick={() => navigate("/privacyPolicy")}
        >
          Privacy
        </p>
        <p className="footer-text" onClick={() => navigate("/faq")}>
          FAQ
        </p>
      </div>
      <div className="middle-container">
        <img src={facebookIcon} alt="facebook" className="social-icon" />
        <img src={tiktokIcon} alt="tiktok" className="social-icon" />
        <img src={instagramIcon} alt="tiktok" className="social-icon" />
      </div>
      <div className="right-container">
        <div className="sub-container">
          <img src={emailIcon} alt="email" className="social-icon" />
          <p className="footer-text">contact@pîq.com</p>
        </div>
        <div className="sub-container">
          <img src={phoneIcon} alt="phone" className="social-icon" />
          <p className="footer-text">+1 520-404-2962</p>
        </div>
      </div>
    </div>
  );
}
