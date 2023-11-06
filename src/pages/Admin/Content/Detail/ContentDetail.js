import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { Box, Modal, Typography } from "@mui/material";
import dot from "../../../../assets/admin/Dashboard/dot.png";
import SIngleVideoPlayback from "../../../../components/videoComponent/SingleVideoPlayback/SIngleVideoPlayback";
import SIngleVideoPlaybackDetails from "../../../../components/videoComponent/ContentSingleVideoPlayback/SIngleVideoPlaybackDetail";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import NormalSelect from "../../../../components/InputFields/NormalSelect/NormalSelect";
import MultilineInput from "../../../../components/InputFields/MultilineInput/MultilineInput";
import searchIcon from "../../../../assets/admin/common/search.png";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import SecondaryButton from "../../../../components/Buttons/Secondary/SecondaryButton";
import ContentStats from "./ContentStats/ContentStats";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/Util/Loader/Loader";
import { fetchAssetById } from "../../../../apis/dashboard/content/fetchAssetById";
import { contentApprovalDummyData } from "../ApprovalPlaybackView/ContentApprovalDummyData";
import getSingleBusinessData from "../../../../apis/business/getBusinessData";
import { updateAssetById } from "../../../../apis/dashboard/content/updateAsset";
import { useDispatch, useSelector } from "react-redux";
import ProfileDashboardAdd from "../../../../components/Modals/ProfileDashboardAdd/ProfileDashboardAdd";
import addBusinessMenuCategory from "../../../../apis/business/addBusinessMenuCategory";
import getBusinessMenu from "../../../../apis/business/getBusinessMenu";
import { FaCross } from "react-icons/fa";

function ContentDetail() {
  const navigate = useNavigate();
  const [tagInputValue, setTagInputValue] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [assetData, setAssetData] = React.useState(null);
  const [assetDataUnchanged, setAssetDataUnchanged] = React.useState(null);
  const [assetDataLoading, setAssetDataLoading] = React.useState(false);
  const [ownerTags, setOwnerTags] = React.useState([]);
  const [aiTags, setAITags] = React.useState([]);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [businessData, setBusinessData] = React.useState({
    businessName: "",
    businessImageUrl: "",
    subCategories: [],
  });
  const [subCategoriesField, setSubCategoriesField] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const params = useParams();
  const ownerTagsFieldRef = useRef(null);

  const associations = ["Menu Items", "Sneak PIQ"]; // Add more categories as needed
  const [selectedAssociation, setSelectedAssociation] = useState(0); // Default selected category is first in array
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState(-1);
  const [selectedMenuCategoryName, setSelectedMenuCategoryName] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('')

  // tags changes
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);

  const allTags = useSelector((state) => state.tags);
  const [TAGS, setTAGS] = useState(allTags);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && subCategoriesField.trim() !== '') {
      setSubCategories([...subCategories, subCategoriesField]);
      setSubCategoriesField('');
    }
  };

  // Function to set modal open
  const handleModalOpen = () => {
    setModalOpen(true);
  }

  // Function to set modal close
  const handleModalClose = () => {
    setModalOpen(false);
  }

  const reformatTags = (tags) => {
    const newTags = tags.map((tag) => {
      return { name: tag, selected: true };
    });
    return newTags;
  };

  const handleSelectedTags = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => {
        return prev.filter((item) => item !== tag);
      });
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleOwnerTags = (tag) => {
    if (ownerTags.includes(tag)) {
      setOwnerTags((prev) => {
        return prev.filter((item) => item !== tag);
      });
    } else {
      setOwnerTags((prev) => [...prev, tag]);
    }
  }

  const handleChangeField = (fieldName, event) => {
    setAssetData({ ...assetData, [fieldName]: event.target.value });
  };

  const handleChangeMenu = (fieldName, value) => {
    setAssetData({ ...assetData, [fieldName]: value });
  }

  const handleUpdateOwnerTags = (fieldName, tags) => {
    setAssetData({ ...assetData, [fieldName]: tags });
  }

  const handleAddOwnerTag = (tag) => {
    const newTags = [...ownerTags, { name: tag, selected: true }];
    setOwnerTags(newTags);
  };

  const handleSaveAsset = () => {
    setSaveLoading(true);
    updateAssetById(assetData.id, assetData)
      .then(() => {
        setSaveLoading(false);
        navigate("/content/list");
      })
      .catch((err) => {
        console.error(err);
        setSaveLoading(false);
      });
  };

  const approveAsset = (status) => {
    const datastatus = {status}
    updateAssetById(assetData.assetId, datastatus)
      .then(() => {
        setSaveLoading(false);
        navigate("/content/list");
      })
      .catch((err) => {
        console.error(err);
        setSaveLoading(false);
      });
  }

  useEffect(()=>{
    console.log('updated menu cat', selectedMenuCategory)
  },[selectedMenuCategory])

  //fetch calls
  const getAssetData = async () => {
    fetchAssetById(params.id).then((response) => {
      if (response) {
        setAssetData(response);
        setAssetDataUnchanged(response);
        // setOwnerTags(
        //   reformatTags(response?.indexerLabels.map((label) => label.name))
        // );
        // setOwnerTags(response?.ownerTags)
        setCategory(response?.assetType);
        setSubCategories(response?.ownerTags)
        setActiveMenu(response.menuCategory)
      
        getSingleBusinessData(response.businessId)
          .then((businessData) => {
            setBusinessData({
              businessName: businessData.businessName,
              businessImageUrl: businessData.logo,
              subCategories: businessData.subCategories,
            });
            setAssetDataLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setAssetDataLoading(false);
          });

          // get business menu
          getBusinessMenu(response.businessId)
          .then((res)=>{
            setMenuCategories(Object.keys(res.menu))
          })
          .catch((err)=>{
            console.log(err)
          })


        // setAITags(reformatTags(response.labels));
      }
    });
  };

  useEffect(()=>{
    setSelectedMenuCategory(menuCategories.indexOf(activeMenu))
  },[menuCategories])

  useEffect(()=>{
    setAssetData({ ...assetData, 'ownerTags': subCategories });
  },[subCategories])

  useEffect(() => {
    setAssetDataLoading(true);
    getAssetData();
  }, []);

  useEffect(()=>{
    handleUpdateOwnerTags('ownerTags',ownerTags)
  },[ownerTags])

  useEffect(() => {
    category && setAssetData({ ...assetData, ["assetType"]: category });
  }, [category]);
  //tag changes
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

  const handleMenuCategoryChange = (index) => {
    if (selectedMenuCategory === index)
      setSelectedMenuCategory(-1);
    else
      setSelectedMenuCategory(index);
      setSelectedMenuCategoryName(menuCategories[index])
  }

   // Function to add new menu category
   const handleNewMenuCategory = (newMenuCategory) => {
    setModalOpen(false);
    addBusinessMenuCategory(assetData.businessId, newMenuCategory) // Business id to be made dynamic
      .then(() => {
        setMenuCategories([newMenuCategory, ...menuCategories]);
      })
      .catch((err) => {
        // Something went wrong
      });
  }

  return (
    <Loader loading={assetDataLoading || !assetDataUnchanged}>
      <ProfileDashboardAdd open={modalOpen} handleClose={handleModalClose} handleSuccess={handleNewMenuCategory} />
      <Box className="content-detail">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
          sx={{
            backdropFilter: "blur(5px)",
          }}
        >
          <ContentStats handleClose={handleClose} />
        </Modal>
        {location.pathname.includes("/content/detail") ? (
          <Box className="title-area">
            <Typography className="title-text">Content Details</Typography>
          </Box>
        ) : (
          <Box className="title-area">
            <Typography className="title-text">Review Content</Typography>
            <Typography className="description-text">
              All content should be screened for accuracy and brand alignment.
              Content that contains illegal substance, violent activity, or
              pornographic material must be denied and flagged.
            </Typography>
          </Box>
        )}
        <Typography className="heading">Business</Typography>
        <Box className="header-area">
          <Box className="profile-details-area">
            <img
              src={businessData?.businessImageUrl}
              alt="profile"
              className="profile-image"
            />
            <Box className="profile-title-container">
              <Typography className="profile-title">
                {businessData?.businessName}
              </Typography>
              <Box className="tags-container">
                {businessData?.subCategories.map((label, index) => (
                  <Box className="tag-group">
                    <Typography className="tag">{label}</Typography>
                    {assetData?.labels?.length !== index + 1 && (
                      <img className="dot-image" alt="dot" src={dot} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box className="stats-area">
            <Box className="stats-container">
              <Box className="stat-group">
                <Typography className="stat-title">Reports</Typography>
                <Typography className="stat-value">100</Typography>
              </Box>
              <Box className="stat-group">
                <Typography className="stat-title">Warnings</Typography>
                <Typography className="stat-value">6</Typography>
              </Box>
              <Box className="stat-group">
                <Typography className="stat-title">Strikes</Typography>
                <Typography className="stat-value">2</Typography>
              </Box>
              <Box className="stat-group">
                <Typography className="stat-title">Subscription</Typography>
                <Typography className="stat-value">piq</Typography>
              </Box>
            </Box>
            <Box className="view-more-container" onClick={handleOpen}>
              <Typography className="view-more-text">View More</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="details-area">
          <Box className="video-container">
            <SIngleVideoPlaybackDetails
              data={assetData}
              businessData={businessData}
              index={1}
            />
          </Box>
          <Box className="form-container">
            <Box className="form-group-half">
              <Box className="field-container">
                <Typography className="field-title">
                  Name (What’s offered)
                </Typography>
                <IconInput
                  placeholder={"Enter Here"}
                  value={assetData?.assetName}
                  onChange={(event) => handleChangeField("assetName", event)}
                />
              </Box>
              <Box className="field-container">
                <Typography className="field-title">Type</Typography>
                <NormalSelect
                  menuItems={[
                    "Menu Item",
                    "Sneak PIQ",
                  ]}
                  selectValue={category}
                  onSelectChange={(e) => setCategory(e.target.value)}
                />
              </Box>
            </Box>
            <Box className="form-group">
              <Box className="field-container">
                <Typography className="field-title">Description</Typography>
                <MultilineInput placeholder={"Enter Message Here" } 
                value={assetData?.description}
                onChange={(event) => handleChangeField("description", event)}/>
              </Box>
            </Box>
            <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Owner Tags</Typography>
            </Box>
            <IconInput
              placeholder={"Enter an owner tag"}
              value={subCategoriesField}
              onChange={(e) => setSubCategoriesField(e.target.value)}
              onKeyDownFunction={handleKeyPress}
            />
            <div className="owner-tags-option-container">
                <div className="tags-container-box">
                {subCategories.map((tag) => {
                    return (
                      <div
                        className="tag-selected"
                        //onClick={() => handleSelectedTags(tag)}
                      >
                        {tag}
                      </div>
                    );
                  })}
                  </div>
                  </div>
          </Box>
           {/* Menu category input */} 
           {category === "Menu Item" && selectedAssociation === 0 && <div className="input-group">
              <Typography className="input-label">
                Menu Category:
              </Typography>
              <div className="tags-container overflow-x-scroll">
                <div className="tag-selected" onClick={handleModalOpen}>+ Add</div>
                {menuCategories.map((menuCategory, index) => {
                  return (
                    <div
                      className={`${selectedMenuCategory === index ? "tag-selected" : "tag"}`}
                      onClick={() => {
                      handleMenuCategoryChange(index)
                      handleChangeMenu('menuCategory',menuCategory)
                     // setSelectedMenuCategory(menuCategory)
                      }} >
                      {menuCategory}
                    </div>
                  );
                })}
              </div>
            </div>}
            {category === "Menu Item" &&
            <Box className="form-group">
              <Box className="field-container">
                <Typography className="field-title">Price</Typography>
                <IconInput
                  placeholder={"Enter Price"}
                  value={assetData?.price}
                  type={"number"}
                  onChange={(event) => handleChangeField("price", event)}
                />
              </Box>
            </Box>
             }
            <Box className="form-group">
              <Box className="field-container">
                <Typography className="field-title">Creator</Typography>
                <IconInput placeholder={"Search"} icon={searchIcon} />
                <Box className="tags-container">
                  <Box className="tag">
                    <Typography className="tag-text">
                      {businessData?.businessName}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="actions-area">
          {location.pathname.includes("/content/detail") ? (
            <Loader loading={saveLoading}>
              <Box className="button-container">
                <SecondaryButton text={"Cancel"} />
                <PrimaryButton text={"Save"} onClick={handleSaveAsset} />
              </Box>
            </Loader>
          ) : (
            <Loader loading={saveLoading}>
              <Box className="button-container">
                <SecondaryButton text={"Reject"} />
                <PrimaryButton text={"Approve"} onClick={()=>{approveAsset('approved')}} />
              </Box>
            </Loader>
          )}
        </Box>
      </Box>
    </Loader>
  );
}

export default ContentDetail;
