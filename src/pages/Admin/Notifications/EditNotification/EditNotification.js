import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import "../CreateNotification/styles.scss";
import searchIcon from "../../../../assets/admin/common/search.png";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import NormalSelect from "../../../../components/InputFields/NormalSelect/NormalSelect";
import MultilineInput from "../../../../components/InputFields/MultilineInput/MultilineInput";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import SecondaryButton from "../../../../components/Buttons/Secondary/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";

function EditNotification() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("Time-Based");
  const [time, setTime] = useState("09:00");
  const [frequency, setFrequency] = useState("5");
  const [redirectLink, setRedirectLink] = useState("");
  const [cta, setCta] = useState("A");
  const [target, setTarget] = useState("Time-Based");
  const [ageRange, setAgeRange] = useState("0-10");
  const [sex, setSex] = useState("Male");
  const [audiencelocation, setAudienceLocation] = useState("");
  const [locationSelected, setLocationSelected] = useState();

  const [tagInputValue, setTagInputValue] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);

  const [catInputValue, setCatInputValue] = React.useState("");
  const [selectedCats, setSelectedCats] = React.useState([]);

  const LOCATION_OPTIONS = ["London", "Newyork"];

  const allTags = useSelector((state) => state.tags);
  const [TAGS, setTAGS] = useState(allTags);
  const [categories, setCategories] = useState(allTags);

  const handleSelectedTags = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => {
        return prev.filter((item) => item !== tag);
      });
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleSelectedCats = (tag) => {
    if (selectedCats.includes(tag)) {
      setSelectedCats((prev) => {
        return prev.filter((item) => item !== tag);
      });
    } else {
      setSelectedCats((prev) => [...prev, tag]);
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

  const handleCatsFiltering = (searchValue) => {
    if (searchValue !== "") {
      setCategories(
        categories.filter((tag) => {
          return tag.toLowerCase().includes(searchValue.toLowerCase());
        })
      );
    } else {
      setCategories(allTags);
    }
  };

  useEffect(() => {
    handleCatsFiltering(catInputValue);
    handleTagsFiltering(tagInputValue);
  }, [tagInputValue, catInputValue]);

  return (
    <Box className="notification-details">
      <Typography className="page-title">Edit Notification</Typography>
      <Typography className="page-subtitle">
        Remember: Too many notifications results in lost users. Balance is key.
      </Typography>
      <Box className="form-area">
        <Box className="fields-area">
          <Box className="field-container" sx={{ mb: "auto" }}>
            <Box className="title-container">
              <Typography className="title">Subject</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Here"}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Box>
          <Box className="field-container" sx={{ position: "relative" }}>
            <Box className="title-container">
              <Typography className="title">Message</Typography>
            </Box>
            <MultilineInput
              placeholder={"Enter Message Here"}
              minRows={4}
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>
          <Box className="field-container-half">
            <Box className="title-container">
              <Typography className="title">Type</Typography>
            </Box>
            <NormalSelect
              selectValue={subscriptionType}
              menuItems={["Time-Based", "Action-Based", "Location-Based"]}
              onSelectChange={(e)=>setSubscriptionType(e.target.value)}
            />
          </Box>
          {subscriptionType === "Time-Based" ? (
            <Box className="field-container-half">
              <Box className="title-container">
                <Typography className="title">Time</Typography>
              </Box>
              <NormalSelect
                selectValue={time}
                menuItems={["09:00", "09:30", "09:40"]}
                onSelectChange={(e)=>setTime(e.target.value)}
              />
            </Box>
          ) : subscriptionType === "Action-Based" ? (
            <Box className="field-container-half">
              <Box className="title-container">
                <Typography className="title">Action</Typography>
              </Box>
              <NormalSelect
                selectValue={time}
                menuItems={["09:00", "09:30", "09:40"]}
                onSelectChange={(e)=>setTime(e.target.value)}
              />
            </Box>
          ) : (
            <Box className="field-container-half">
              <Box className="title-container">
                <Typography className="title">Radius</Typography>
              </Box>
              <NormalSelect
                selectValue={time}
                menuItems={["09:00", "09:30", "09:40"]}
                onSelectChange={(e)=>setTime(e.target.value)}
              />
            </Box>
          )}
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Frequency</Typography>
            </Box>
            <NormalSelect
              selectValue={frequency}
              menuItems={["5", "10", "15"]}
              onSelectChange={(e)=>setFrequency(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Redirect Link</Typography>
            </Box>
            <IconInput
              placeholder={"www.abc.com"}
              value={redirectLink}
              onChange={(e) => setRedirectLink(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Call-To-Action</Typography>
            </Box>
            <NormalSelect
              selectValue={cta}
              menuItems={["A", "B", "C"]}
              onSelectChange={(e)=>setCta(e.target.value)}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ pt: 2 }}>
        <Typography className="sub-title">Select an Audience:</Typography>
      </Box>
      <Box className="form-area">
        <Box className="fields-area">
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Target</Typography>
            </Box>
            <NormalSelect
              selectValue={target}
              menuItems={["Time-Based", "Action-Based", "Location-Based"]}
              onSelectChange={(e)=>setTarget(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Age Range</Typography>
            </Box>
            <NormalSelect
              selectValue={ageRange}
              menuItems={["0-10", "10-15", "15-20"]}
              onSelectChange={(e)=>setAgeRange(e.target.value)}
            />
          </Box>
          <Box className="field-container" sx={{ mb: "auto" }}>
            <Box className="title-container">
              <Typography className="title">Sex</Typography>
            </Box>
            <NormalSelect
              selectValue={sex}
              menuItems={["Male", "Female"]}
              onSelectChange={(e)=>setSex(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Location</Typography>
            </Box>
            <IconInput
              icon={searchIcon}
              placeholder={"Search"}
              value={audiencelocation}
              onChange={(e) => setAudienceLocation(e.target.value)}
            />
            <Box className="tags-container">
              {LOCATION_OPTIONS.map((tag, index) => (
                <Typography
                  className={
                    locationSelected === index
                      ? "location-selected-tag"
                      : "location-tag"
                  }
                  onClick={() => {
                    setLocationSelected(index);
                    setAudienceLocation(tag);
                  }}
                >
                  {tag}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Categories</Typography>
            </Box>
            <IconInput
              icon={searchIcon}
              placeholder={"Search"}
              value={catInputValue}
              onChange={(e) => setCatInputValue(e.target.value)}
            />
            <div className="tags-container">
              {selectedCats.map((cat) => {
                return (
                  <div
                    className="tag-selected"
                    onClick={() => handleSelectedCats(cat)}
                  >
                    {cat}
                  </div>
                );
              })}
              {categories.slice(0, 10).map((cat, index) => {
                //console.log('aaa',cat,selectedTags)
                if (!selectedCats.includes(cat)) {
                  return (
                    <div
                      className={`tag${
                        selectedCats.includes(cat) ? "-selected" : ""
                      }`}
                      onClick={() => handleSelectedCats(cat)}
                    >
                      {cat}
                    </div>
                  );
                }
              })}
            </div>
          </Box>

          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Tags</Typography>
            </Box>
            <IconInput
              icon={searchIcon}
              placeholder={"Search"}
              value={tagInputValue}
              onChange={(e) => setTagInputValue(e.target.value)}
            />
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
          </Box>
        </Box>
      </Box>

      <Box className="form-area">
        <Box className="fields-area">
        <Box className="field-container-half" sx={{ ml: 'auto', mr: 2 }}>
          <SecondaryButton text="Cancel" height="65px" />
        </Box>
        <Box className="field-container-half" sx={{ mr: 'auto', ml: 2 }}>
          <PrimaryButton text="Save Changes" height="65px" />
        </Box>
        </Box>
      </Box>

    </Box>
  );
}

export default EditNotification;
