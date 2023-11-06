import React from "react";
import editThumbnailBg from "../../../assets/business/video/editThumbnailBg.png";
import "./styles.scss";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import { Typography } from "@mui/material";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import { ReactComponent as WebsiteIcon } from "../../../assets/business/video/globe.svg";
import { ReactComponent as ShoppingIcon } from "../../../assets/business/video/shopping.svg";
import { ReactComponent as BookingIcon } from "../../../assets/business/video/booking.svg";
import { checkIfEmpty } from "../../../utils/checkIfEmpty";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideoContent } from "../../../redux/slices/profileDataSlice";

export default function AddDetail() {
  const videoContent = useSelector((state) => state.profileData.videoContent);
  const [title, setTitle] = React.useState(
    videoContent[videoContent.length - 1].title
  );
  const [description, setDescription] = React.useState(
    videoContent[videoContent.length - 1].description
  );
  const [price, setPrice] = React.useState(
    videoContent[videoContent.length - 1].price
  );
  const [selectedTab, setSelectedTab] = React.useState(
    videoContent[videoContent.length - 1].directTo === "Website"
      ? 0
      : videoContent[videoContent.length - 1].directTo === "Order"
      ? 1
      : 2
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const tabsData = [
    { icon: WebsiteIcon, label: "Website" },
    { icon: ShoppingIcon, label: "Order" },
    { icon: BookingIcon, label: "Booking" },
  ];

  const handleSubmit = () => {
    dispatch(
      setVideoContent(
        videoContent.map((item, index) => {
          if (index === videoContent.length - 1) {
            return {
              ...item,
              title,
              description,
              price,
              directTo: tabsData[selectedTab].label,
            };
          }
          return item;
        })
      )
    );
    if (location.pathname.includes("/business")) {
      navigate("/business/video/addTags");
    } else {
      navigate("/profiles/video/addTags");
    }
  };
  return (
    <div className="add-video-detail">
      <div className="add-video-content-area">
        <img
          src={
            videoContent[videoContent.length - 1].thumbnail ||
            videoContent[videoContent.length - 1].thumbnailFirebaseUrl
          }
          alt="thumbnail background"
          className="thumbnail-bg"
        />
        <div className="input-group">
          <Typography className="input-label">
            What’s showcased in this video?
          </Typography>
          <IconInput
            placeholder={"Ex: Blueberry Pancakes"}
            dark={true}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <Typography className="input-label">
            Describe what you’re offering
          </Typography>
          <IconInput
            placeholder={"Ex: Ingredients, Features, Specs, Details"}
            dark={true}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <Typography className="input-label">Name your price</Typography>
          <IconInput
            placeholder={"$0"}
            type={"number"}
            dark={true}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <Typography className="input-label">Direct To:</Typography>
          <div className="tabs-container">
            {tabsData.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <div className="tab" onClick={() => setSelectedTab(index)}>
                  <Icon fill={selectedTab === index ? "#FFAE00" : "white"} />
                  <Typography
                    className={
                      selectedTab === index ? "tab-label-selected" : "tab-label"
                    }
                  >
                    {tab.label}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="next-button-container">
        <PrimaryButton
          text={"Next"}
          disabled={
            checkIfEmpty("title", title) ||
            checkIfEmpty("description", description) ||
            checkIfEmpty("price", price)
          }
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
