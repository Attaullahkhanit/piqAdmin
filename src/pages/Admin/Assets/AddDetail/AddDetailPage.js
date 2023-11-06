import React, { useState, useRef } from "react";
import "./styles.scss";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import { Typography } from "@mui/material";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from 'react-tag-input';
import { addMenuItem } from "../../../../apis/assets/addMenuItem";
import { addSneakPiq } from "../../../../apis/assets/addSneakPiq";
import { showToastSuccess, showToastWarning } from "../../../../utils/showToasify";

function AddDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const videoSrc = location.state.videoSrc;
  const videoRef = useRef(null);
  const KeyCodes = { comma: 188, enter: 13 };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  // Function to delete tag
  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  // Function to add tag
  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  // Function to drag tags
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  // Function to handle submit
  const handleSubmit = async () => {
    const businessId = location.state.businessId;
    const menuCategory = location.state.menuCategory;
    const title = location.state.title;
    const description = location.state.description;
    const price = location.state.price;
    const thumbnail = location.state.thumbnail;
    const video = location.state.video;
    const tagsList = tags.map(item => item.text);
    const menuItem = location.state.menuItem;

    try {
      setLoading(true); // Set loading state to true

      if (menuItem) {
        const response = await addMenuItem(businessId, menuCategory, title, description, JSON.stringify(tagsList), thumbnail, video, price);
        console.log(response, 'give me response');
        navigate("/profile/assetSubmitted", { state: { businessId } });
        showToastSuccess("Data Are successfully submitted");
      } else {
        const response = await addSneakPiq(businessId, title, description, JSON.stringify(tagsList), thumbnail, video);
        navigate("/profile/assetSubmitted", { state: { businessId } });
        showToastWarning("Data Are Not Successfully submitted");
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    } finally {
      setLoading(false); // Set loading state back to false
    }
  }

  return (
    <div className="overflow-scroll">
      <div className="add-asset-detail">
        <div className="add-video-content-area">
          <div className="asset-area">
            {videoSrc ? (
              <video
                width="400"
                className="video-panel"
                autoPlay="autoPlay" // Corrected 'autoplay' to 'autoPlay'
                ref={videoRef}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>No video selected</p>
            )}
          </div>

          <div>
            <div className="apply-border input-group">
              <Typography className="input-label">
                Tag your Video
              </Typography>
              <Typography className="lable-description">
                Higher number of accurate tags = More Visibility
              </Typography>
              <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
              />
            </div>

            <div className="apply-border input-group">
              <div className="input-group-container">
                <Typography className="input-label">In Collaboration with</Typography>
                <Typography className="input-creator-label">
                  Invite Creator
                </Typography>
              </div>
              <Typography className="lable-description">
                Can't find who you're looking for? Invite them!
              </Typography>
              <IconInput
                placeholder={"Search our Creators"}
                dark={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="next-button-container">
        <PrimaryButton
          text={loading ? "Submitting..." : "Submit"} // Conditional button text
          onClick={() => handleSubmit()}
          disabled={loading} // Disable the button when loading
        />
      </div>
    </div>
  );
}

export default AddDetailPage;