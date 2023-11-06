import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import { Typography } from "@mui/material";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import { checkIfEmpty } from "../../../utils/checkIfEmpty";
import { useNavigate, useLocation } from "react-router-dom";
import getBusinessMenu from "../../../apis/business/getBusinessMenu";
import ProfileDashboardAdd from "../../../components/Modals/ProfileDashboardAdd/ProfileDashboardAdd";
import addBusinessMenuCategory from "../../../apis/business/addBusinessMenuCategory";

function AddAsset() {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [videoSrc, setVideoSrc] = useState('#');
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [video, setVideo] = useState(null);
  const associations = ["Menu Items", "Sneak PIQ"]; // Add more categories as needed
  const [selectedAssociation, setSelectedAssociation] = useState(0); // Default selected category is first in array
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getMenuCategoriesFromBackend();
  }, []);

  // Function to get menu categories from backend
  const getMenuCategoriesFromBackend = () => {
    getBusinessMenu(location.state.businessId) // Business id to be made dynamic
      .then((data) => {
        setMenuCategories(Object.keys(data.menu));
      })
      .catch(() => {
        // Something went wrong
      });
  };

  // Function to set modal open
  const handleModalOpen = () => {
    setModalOpen(true);
  }

  // Function to set modal close
  const handleModalClose = () => {
    setModalOpen(false);
  }

  // Function to handle select video
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoSrc(URL.createObjectURL(file));

    if (videoRef.current) {
      setShowButton(false);
      videoRef.current.load();
    }
  };

  // Function to handle association category change
  const handleAssociationCategoryChange = (index) => {
    setSelectedAssociation(index);
  }

  // Function to handle association category change
  const handleMenuCategoryChange = (index) => {

    if (selectedMenuCategory === index)
      setSelectedMenuCategory(-1);
    else
      setSelectedMenuCategory(index);
  }

  // Function to add new menu category
  const handleNewMenuCategory = (newMenuCategory) => {
    setModalOpen(false);
    addBusinessMenuCategory(location.state.businessId, newMenuCategory) // Business id to be made dynamic
      .then(() => {
        setMenuCategories([newMenuCategory, ...menuCategories]);
      })
      .catch((err) => {
        // Something went wrong
      });
  }

  return (
    <div className="overflow-scroll">
      <ProfileDashboardAdd open={modalOpen} handleClose={handleModalClose} handleSuccess={handleNewMenuCategory} />
      <div className="add-asset-detail">
        <div className="add-video-content-area">

          <div className="asset-area">

            {showButton && (<form className="asset-form">
              <label className="asset-label" for="videoInput"><p>+</p><p>Add Video</p></label>
              <input className="asset-input" type="file" id="videoInput" accept="video/*" onChange={handleVideoChange} />
            </form>)}

            {videoSrc ? (
              <video width="100%" className="video-panel" autoplay="autoplay" ref={videoRef}>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>No video selected</p>
            )}
          </div>

          <div>

            {/* Video association category input */}
            <div className="input-group">
              <Typography className="input-label">
                What&apos;s being offered in this video?
              </Typography>
              <div className="tags-container">
                {associations.map((association, index) => {
                  return (
                    <div
                      className={`${selectedAssociation === index ? "tag-selected" : "tag"}`}
                      onClick={() => handleAssociationCategoryChange(index)}>
                      {association}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Menu category input */}
            {selectedAssociation === 0 && <div className="input-group">
              <Typography className="input-label">
                Menu Category:
              </Typography>
              <div className="tags-container overflow-x-scroll">
                <div className="tag-selected" onClick={handleModalOpen}>+ Add</div>
                {menuCategories.map((menuCategory, index) => {
                  return (
                    <div
                      className={`${selectedMenuCategory === index ? "tag-selected" : "tag"}`}
                      onClick={() => handleMenuCategoryChange(index)}>
                      {menuCategory}
                    </div>
                  );
                })}
              </div>
            </div>}

            {/* Identify what's offered input */}
            <div className="input-group">
              <Typography className="input-label">
                Identify what&apos;s offered in the video:
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

            {/* Describe what offering input */}
            <div className="input-group">
              <Typography className="input-label">
                Describe what&apos;s offered in this video:
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

            {/* Price input */}
            {selectedAssociation === 0 && <div className="input-group">
              <Typography className="input-label">Price of what's offered in the video:</Typography>
              <IconInput
                placeholder={"$0"}
                type={"number"}
                dark={true}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>}

            {/* Dummy divs */}
            <div className="input-group"></div>
            <div className="input-group"></div>
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="next-button-container">
        <PrimaryButton
          text={"Next"}
          disabled={
            video === null ||
            (selectedAssociation === 0 && selectedMenuCategory === -1) ||
            checkIfEmpty("title", title) ||
            checkIfEmpty("description", description) ||
            (selectedAssociation === 0 && checkIfEmpty("price", price))
          }
          onClick={() => {
            const menuCategory = menuCategories[selectedMenuCategory];
            const menuItem = selectedAssociation === 0 ? true : false; // If menu item is to be added
            const businessId = location.state.businessId;
            navigate("/profile/addAsset/thumbnail", { state: { businessId, menuCategory, title, description, video, price, videoSrc, menuItem } })
          }}
        />
      </div>
    </div>
  )
}

export default AddAsset