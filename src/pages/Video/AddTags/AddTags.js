import React, { useEffect, useState } from "react";
import "./styles.scss";
import thumbnail from "../../../assets/business/video/editThumbnailBg.png";
import searchIcon from "../../../assets/business/video/search.png";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import { Typography } from "@mui/material";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideoContent } from "../../../redux/slices/profileDataSlice";
import Loader from "../../../components/Util/Loader/Loader";
import { showToastError, showToastSuccess } from "../../../utils/showToasify";
import { addAssetToBusiness } from "../../../apis/assets/addAssetToBusiness";

export default function AddTags() {
  const videoData = useSelector((state) => state.profileData.videoContent);
  const [tagInputValue, setTagInputValue] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [addAssetLoading, setAddAssetLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
  const reduxData = useSelector((state) => state);

  const allTags = useSelector((state) => state.tags);
  const [TAGS, setTAGS] = useState(allTags);

  const handleSelectedTags = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => {
        return prev.filter((item) => item !== tag);
      });
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };
  const handleSubmit = () => {
    dispatch(
      setVideoContent(
        videoData.map((item, index) => {
          if (index === videoData.length - 1) {
            return {
              ...item,
              tags: selectedTags,
            };
          }
          return item;
        })
      )
    );

    if (businessData) {
      setAddAssetLoading(true);
      addAssetToBusiness(videoData[0], businessData)
        .then(() => {
          setAddAssetLoading(false);
          showToastSuccess("Upload Successfully");
          navigate("/");
        })
        .catch((error) => showToastError("Error: " + error.message));
      navigate("/");
    } else {
      if (location.pathname.includes("/business")) {
        navigate("/business/video/uploadSuccess");
      } else {
        navigate("/profiles/video/uploadSuccess");
      }
    }
  };

  const handleTagsFiltering = (searchValue) => {
    if (searchValue !== "") {
      setTAGS(
        allTags.filter((tag) => {
          return tag.toLowerCase().includes(searchValue.toLowerCase());
        })
      );
    } else {
      setTAGS(allTags);
    }
  };

  useEffect(() => {
    handleTagsFiltering(tagInputValue);
  }, [tagInputValue]);
  return (
    <div className="add-tags-component">
      <div className="add-tags-content-area">
        <img
          src={
            videoData[videoData.length - 1]?.thumbnail ||
            videoData[videoData.length - 1].thumbnailFirebaseUrl
          }
          alt="video"
          className="video"
        />
        <div className="input-group">
          <Typography className="input-label-title">Tag your Video</Typography>
          <Typography className="input-label-description">
            Higher number of accurate tags = More Visibility
          </Typography>
          <IconInput
            placeholder={"Search"}
            dark={true}
            icon={searchIcon}
            value={tagInputValue}
            onChange={(e) => {
              setTagInputValue(e.target.value);
            }}
          />
        </div>
        <div className="tags-container">
          {selectedTags.map((tag) => {
            return (
              <div
                className="tag-selected"
                onClick={() => handleSelectedTags(tag)}
              >
                {tag}
              </div>
            );
          })}
          {TAGS.slice(0, 10).map((tag, index) => {
            if (!selectedTags.includes(tag)) {
              return (
                <div
                  className={`tag${
                    selectedTags.includes(tag) ? "-selected" : ""
                  }`}
                  onClick={() => handleSelectedTags(tag)}
                >
                  {tag}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="submit-button-container">
        <PrimaryButton
          text={addAssetLoading ? <Loader loading={true} /> : "Submit"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
