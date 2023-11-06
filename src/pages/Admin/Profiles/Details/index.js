import {
  Box,
  CircularProgress,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import profilePicture from "../../../../assets/admin/Profile/profilePicture.png";
import userPlaceholder from "../../../../assets/admin/Profile/userPlaceholder.png";
import profileBackground from "../../../../assets/admin/Profile/profileBackground.png";
import ProfileDummyBackground from "../../../../assets/admin/Profile/abstract-background.jpg";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import SecondaryButton from "../../../../components/Buttons/Secondary/SecondaryButton";
import shop from "../../../../assets/admin/Dashboard/shop.png";
import addressIcon from "../../../../assets/admin/Profile/addressIcon.png";
import phoneIcon from "../../../../assets/admin/Profile/phone.png";
import emailIcon from "../../../../assets/admin/Profile/email.png";
import noImage from "../../../../assets/admin/Profile/noImagePlaceholder.png";
import filterIcon from "../../../../assets/admin/Profile/filter.png";
import priceTag from "../../../../assets/admin/Profile/price-tag.png";
import linkIcon from "../../../../assets/admin/Profile/link.png";
import searchIcon from "../../../../assets/admin/common/search.png";
import categoryIcon from "../../../../assets/admin/Profile/category.png";
import userProfileImage from "../../../../assets/admin/common/userDummy.png";
import arrowDown from "../../../../assets/business/navbar/arrowDown.png";
import "./styles.scss";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import NormalSelect from "../../../../components/InputFields/NormalSelect/NormalSelect";
import MultilineInput from "../../../../components/InputFields/MultilineInput/MultilineInput";
import DayTimingCard from "../../../../components/Cards/Profile/DayTimingCard/DayTimingCard";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../../../../components/Cards/Subscription/SubscriptionCard";
import { subscriptionCardData } from "../../../../components/Cards/Subscription/dummyContent";
import { Add } from "@mui/icons-material";
import ImageCropper from "../../../../components/ImageCropper/ImageCropper";
import { handleFileSelect } from "../../../../components/ImageCropper/utils";
import { checkIfEmpty } from "../../../../utils/checkIfEmpty";
import { useDispatch, useSelector } from "react-redux";
import { setProfileInformation } from "../../../../redux/slices/profileDataSlice";
import uploadToFirestoreStorage from "../../../../utils/uploadToFirestoreStorage";
import approveProfileInFirebase from "../../../../apis/dashboard/Profiles/approveProfile";
import Loader from "../../../../components/Util/Loader/Loader";
import getSingleBusinessData from "../../../../apis/business/getBusinessData";
import reformatOperationalData from "../../../../utils/reformatOperationalData";
import { setBusinessData } from "../../../../redux/slices/businessProfileSlice";
import saveBusiness from "../../../../apis/business/saveBusiness";
import { debounce } from "../../../../utils/searchData";
import { searchLocation } from "../../../../apis/common/searchLocation";
import addNewBusiness from "../../../../apis/profile/addNewBusiness";

function ProfileDetails({ id, header, type, selectedRefIndex, setResults }) {
  const profileInformation = useSelector(
    (state) => state.profileData.profileInformation
  );
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
  const [approvalLoading, setApprovalLoading] = useState(false);
  const profileData = useSelector((state) => state.profileData);
  const [subscriptionType, setSubscriptionType] = useState(
    profileInformation?.subscriptionType || "Free Plan"
  );
  const [selectedRef, setSelectedRef] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadedBackgroundFile, setUploadedBackgroundFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(
    profileInformation?.profileImage || businessData?.logo || null
  );
  const [croppedImageBase64, setCroppedImageBase64] = useState(null);
  const [croppedBackgroundBase64, setCroppedBackgroundBase64] = useState(null);
  const [croppedBackground, setCroppedBackground] = useState(
    profileInformation?.profileBackground || businessData?.coverPhoto || null
  );
  const [name, setName] = useState(
    profileInformation?.name || businessData?.businessName || ""
  );
  const [location, setLocation] = useState(
    profileInformation?.location || businessData?.location || ""
  );
  const [phone, setPhone] = useState(
    profileInformation?.phone || businessData?.businessPhone || ""
  );
  const [email, setEmail] = useState(
    profileInformation?.email || businessData?.businessEmail || ""
  );
  const [website, setWebsite] = useState(
    profileInformation?.website || businessData?.businessWebsite || ""
  );
  const [instagram, setInstagram] = useState(
    profileInformation?.instagram || businessData?.businessInstagram || ""
  );
  const [address, setAddress] = useState(
    profileInformation?.address || businessData?.address || ""
  );
  const [city, setCity] = useState(
    profileInformation?.city || businessData?.city || ""
  );
  const [country, setCountry] = useState(
    profileInformation?.country || businessData?.country || ""
  );
  const [state, setState] = useState(
    profileInformation?.state || businessData?.state || ""
  );
  const [establishmentType, setestablishmentType] = useState(
    profileInformation?.category || businessData?.category || "Restaurant"
  );
  const [subCategories, setSubCategories] = useState(
    profileInformation?.subCategories || businessData?.subCategories || []
  )
  const [subCategoriesField, setSubCategoriesField] = useState('')
  const [about, setAbout] = useState(
    profileInformation?.about || businessData?.about || ""
  );
  const [timing, setTiming] = useState(
    ( profileInformation?.timing || businessData?.operationalData &&
      reformatOperationalData(businessData?.operationalData)) || [
        { weekday: 1, day: "Monday", open: [], close: [], status: false },
        { weekday: 2, day: "Tuesday", open: [], close: [], status: false },
        { weekday: 3, day: "Wednesday", open: [], close: [], status: false },
        { weekday: 4, day: "Thursday", open: [], close: [], status: false },
        { weekday: 5, day: "Friday", open: [], close: [], status: false },
        { weekday: 6, day: "Saturday", open: [], close: [], status: false },
        { weekday: 7, day: "Sunday", open: [], close: [], status: false },
      ]
  );
  const [addProfile, setAddProfile] = useState(false)
  const dispatch = useDispatch();

  //console.log('operational data',businessData.operationalData)


  // const [removedBackground, setRemovedbackground] = useState(null);

  const AccountInfoRef = useRef(null);
  const HoursRef = useRef(null);
  const SubscriptionRef = useRef(null);
  const UsersRef = useRef(null);
  const navigate = useNavigate();

  // scroll to given ref on page
  const executeScroll = (selectedRef) =>
    selectedRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  const handleSaveEditProfile = () => {
    const operationalData = timing.map((item) => {
      if (item.open.length>0 || item?.close.length>0){
      return {
        //status: item.status,
        open: item.open.split(':'),
        close: item.close.split(':'),
        //weekday: item.weekday,
      };
    }
    else{
      return {}
    }
  });
    setApprovalLoading(true);
    const data = {
      businessName: name,
      location: location,
      address: address,
      city: city,
      state: state,
      country: country,
      businessPhone: phone,
      businessEmail: email,
      businessWebsite: website,
      instagram: instagram,
      establishmentType: establishmentType,
      about: about,
      operationalData: operationalData,
      businessImageUrl: croppedImage,
      coverPhoto: croppedBackground,
    };
    console.log(data, "dataaa ");
    // dispatch(setBusinessData(data));

    saveBusiness(id, data).then(() => {
      setApprovalLoading(false);
      navigate(`/business/${id}`);
    });
  };

  useEffect(() => {
    if (selectedRefIndex !== -1) {
      switch (selectedRefIndex) {
        case 0:
          setSelectedRef(AccountInfoRef);
          break;
        case 1:
          setSelectedRef(SubscriptionRef);
          break;
        case 2:
          setSelectedRef(UsersRef);
      }
    }
  }, [selectedRefIndex]);

  useEffect(() => {
    if (selectedRef !== null) {
      executeScroll(selectedRef);
    }
  }, [selectedRef]);

  useEffect(() => {
    if (uploadedImageFile) {
      setUploadedBackgroundFile(null);
      setOpenImageModal(true);
    }
  }, [uploadedImageFile]);

  useEffect(() => {
    if (uploadedBackgroundFile) {
      setUploadedImageFile(null);
      setOpenImageModal(true);
    }
  }, [uploadedBackgroundFile]);

  useEffect(() => {
    if (croppedBackgroundBase64) {
      uploadToFirestoreStorage(
        croppedBackgroundBase64,
        "images",
        uploadedBackgroundFile?.name,
        true
      ).then((url) => {
        dispatch(
          setProfileInformation({
            ...profileInformation,
            backgroundFirebaseUrl: url,
          })
        );
      });
    }
  }, [croppedBackgroundBase64]);

  useEffect(() => {
    if (croppedImageBase64) {
      uploadToFirestoreStorage(
        croppedImageBase64,
        "images",
        uploadedImageFile?.name,
        true
      ).then((url) => {
        dispatch(
          setProfileInformation({
            ...profileInformation,
            profileImageFirebaseUrl: url,
          })
        );
      });
    }
  }, [croppedImageBase64]);

  const handleClose = () => {
    setOpenImageModal(false);
    setUploadedImageFile(null);
    setUploadedBackgroundFile(null);
  };

  const handleTimingChange = (index, type, value) => {
    setTiming((prev) => {
      const newTiming = [...prev];
      if (type === "open") {
        newTiming[index].open = value;
      } else if (type === "close") {
        newTiming[index].close = value;
      } else {
        newTiming[index].status = value;
      }
      return newTiming;
    });
  };

  const addNewBusinessProfile = (data) => {
    // new add business api call
    addNewBusiness(data).then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    console.log('profile information data',data)
  }

  const handleSubmit = () => {
    dispatch(
      setProfileInformation({
        ...profileInformation,
        name,
        location,
        phone,
        email,
        website,
        instagram,
        establishmentType,
        address,
        city,
        country,
        state,
        about,
        timing,
        subCategories,
        profileImage: croppedImage,
        profileBackground: croppedBackground,
        subscriptionType,
      })
    )
    setAddProfile(true)
  };

  useEffect(()=>{
    if (profileInformation?.name && profileInformation?.email && addProfile ){
      addNewBusinessProfile(profileInformation)
      navigate("/profiles/requests/list")
    }
  },[profileInformation])

  const handleApprove = (id) => {
    setApprovalLoading(true);
    console.log(id);
    approveProfileInFirebase(id, "approved").then(() => {
      setApprovalLoading(false);
    });
  };

  const handleReject = (id) => {
    setApprovalLoading(true);
    approveProfileInFirebase(id, "rejected").then(() => {
      setApprovalLoading(false);
      navigate("/");
    });
  };

  const [websiteErrorMessage, setWebsiteErrorMessage] = useState("");
  const validateWebsite = (website) => {
    const pattern = /^www\..+\.com$/i; // Case-insensitive match
    return pattern.test(website);
  };

  const changwebsitefield = (e) => {
    const websiteValue = e.target.value;

    if (websiteValue === "") {
      setWebsiteErrorMessage("Website is Required*");
    } else if (!validateWebsite(websiteValue)) {
      setWebsiteErrorMessage("Invalid Website Format");
    } else {
      setWebsiteErrorMessage("");
    }
    setWebsite(websiteValue);
  };

  //  validation phone number
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    return pattern.test(phoneNumber);
  };

  const changePhoneField = (e) => {
    const phonefieldvalue = e.target.value;
    if (phonefieldvalue === "") {
      setPhoneErrorMessage("Phone Number is Required*");
    } 
    else if (!validatePhoneNumber(phonefieldvalue)) {
      setPhoneErrorMessage("Invalid Phone Number Format");
    } 
    else {
      setPhoneErrorMessage("");
   }
   // setPhone(phonefieldvalue);
   let cleaned = ('' + phonefieldvalue).replace(/\D/g, '');
      // Check if the input is of correct length
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        setPhone(`(${match[1]}) ${match[2]}-${match[3]}`);
      } else {
        setPhone(phonefieldvalue);
      }
  };
  //  email validation
  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const changeEmailField = (e) => {
    const emailfieldvalue = e.target.value;
    if (emailfieldvalue === "") {
      setEmailErrorMessage("Email is Required*");
    } else if (!validateEmail(emailfieldvalue)) {
      setEmailErrorMessage("Invalid Email Format");
    } else {
      setEmailErrorMessage("");
    }
    setEmail(e.target.value);
  };

  const handleKeyPress = (event) => {
    console.log('handle key pressss')
    if (event.key === 'Enter' && subCategoriesField.trim() !== '') {
      setSubCategories([...subCategories, subCategoriesField]);
      setSubCategoriesField('');
    }
  };

  // Search Bar show five list
  const [input, setInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const [filteredLocations, setFilteredLocations] = useState();

  const fetchData = async (value) => {
    await searchLocation(value)
      .then((res) => {
        console.log(res, "res");
        setFilteredLocations(res.results);
      })
      .catch((err) => {});
  };
  //Search bar debouncing
  const searchbar = (e) => {
    const changeData = e.target.value;
    setInput(changeData);
    setSelectedLocation(changeData);
  };
  useEffect(
    (e) => {
      if (input !== "") {
        const search = setTimeout(() => {
          fetchData(input);
        }, 1200);
        return () => clearTimeout(search);
      }
    },
    [input]
  );

  console.log('cropped image', croppedImage)

  return (
    <Box className="profile-details">
      <Box className="cropper-container">
        <ImageCropper
          image={uploadedImageFile}
          background={uploadedBackgroundFile}
          openModal={openImageModal}
          handleClose={handleClose}
          setCroppedImage={setCroppedImage}
          setCroppedBackground={setCroppedBackground}
          setCroppedImageBase64={setCroppedImageBase64}
          setCroppedBackgroundBase64={setCroppedBackgroundBase64}
        />
      </Box>

      <Box className="header" ref={AccountInfoRef}>
        {header}
      </Box>
      <Typography className="sub-title">Account Information</Typography>
      {console.log('profile information',profileInformation)}
      {console.log('Business data',businessData)}
      <Box className="form-area">
        <Box className="assets-container">
          <Box className="logo-area">
            <Typography className="text">Logo</Typography>
            <Box className="profile-picture-container">
              {type === "add" && !croppedImage ? (
                <Box className="no-image-placeholder-container">
                  <img
                    src={noImage}
                    alt="no-profile-picture"
                    className="no-profile-image"
                  />
                </Box>
              ) : (
                <img
                  src={(croppedImage && croppedImage.length>1) ? croppedImage : userPlaceholder}
                  alt="profile-picture"
                  className="profile-image"
                />
              )}
              <Box className="action-buttons-container">
                <div id="profile-change-button">
                  <PrimaryButton
                    text={"Change"}
                    height={"50px"}
                    setSelectedImageFile={setUploadedImageFile}
                    type={"file"}
                    imageType={"profile"}
                    handleFileSelect={handleFileSelect}
                  />
                </div>
              </Box>
            </Box>
          </Box>
          <Box className="background-area">
            <Typography className="text">Background</Typography>
            <Box className="background-container">
              {type === "add" && !croppedBackground ? (
                <Box className="no-image-placeholder-container">
                  <img
                    src={noImage}
                    alt="no-profile-picture"
                    className="no-profile-image"
                  />
                </Box>
              ) : (
                <img
                  src={(croppedBackground && croppedBackground.length>1) ? croppedBackground : ProfileDummyBackground}
                  alt="profile-background"
                />
              )}
              <Box className="action-buttons-container">
                <div
                  id="background-change-button"
                  style={{ marginBottom: "10px" }}
                >
                  <PrimaryButton
                    text={"Change"}
                    height={"50px"}
                    setSelectedImageFile={null}
                    setSelectedBackgroundFile={setUploadedBackgroundFile}
                    type={"file"}
                    imageType={"background"}
                    handleFileSelect={handleFileSelect}
                  />
                </div>
                {/* for review we have this */}
                {type !== "add" && (
                  <SecondaryButton
                    text={"Delete"}
                    height={"50px"}
                    // onClick={() => setRemovedbackground(true)}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="fields-area">
          <Box className="field-container">
            <Box className="title-container">
              <img src={shop} alt="icon" />
              <Typography className="title">Name</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Here"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box className="field-container" sx={{ position: "relative" }}>
            <Box className="title-container">
              <img src={addressIcon} alt="icon" />
              <Typography className="title">Location</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Location"}
              value={selectedLocation}
              onChange={searchbar}
            />
            <Box
              card
              sx={{
                position: "absolute",
                backgroundColor: "#fff",
                width: "100%",
                justifyContent: "center",
                boxShadow: 3,
                borderRadius: 1,
                maxHeight: "120px",
                overflow: "hidden",
              }}
            >
              {filteredLocations?.map((item) => {
                return (
                  <ListItemButton
                    sx={{ maxHeight: "45px", zIndex: "999" }}
                    onClick={() => {
                      setSelectedLocation(item.title);
                      setFilteredLocations([]);
                      setLocation([item.coordinates.lat,item.coordinates.lng]);
                    }}
                    className="search-list-item"
                  >
                    {item.title}, {item.address}
                  </ListItemButton>
                );
              })}
            </Box>
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={phoneIcon} alt="icon" />
              <Typography className="title">Phone</Typography>
            </Box>
            <IconInput
              placeholder={"000-000-0000"}
              value={phone}
              onChange={changePhoneField}
              phoneErrorMessage={phoneErrorMessage}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={emailIcon} alt="icon" />
              <Typography className="title">Email</Typography>
            </Box>
            <IconInput
              placeholder={"abc@gmail.com"}
              value={email}
              onChange={changeEmailField}
              errorMessage={emailErrorMessage}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={linkIcon} alt="icon" />
              <Typography className="title">Website</Typography>
            </Box>
            <IconInput
              placeholder={"www.abc.com"}
              value={website}
              onChange={changwebsitefield}
              websiteErrorMessage={websiteErrorMessage}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={linkIcon} alt="icon" />
              <Typography className="title">Business Instagram</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Link"}
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Address</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">City</Typography>
            </Box>
            <IconInput
              placeholder={"Enter City"}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Country</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Country"}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">State</Typography>
            </Box>
            <IconInput
              placeholder={"Enter State"}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={categoryIcon} alt="icon" />
              <Typography className="title">Establishment (Type)</Typography>
            </Box>
            {/* <IconInput
              placeholder={"Enter Here"}
              value={establishmentType}
              onChange={(e) => setestablishmentType(e.target.value)}
            /> */}
             <NormalSelect
              selectValue={establishmentType ? establishmentType : "Restaurant"}
              menuItems={["Restaurant", "Bar", "Club"]}
              onSelectChange={(e) => setestablishmentType(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Subscription</Typography>
            </Box>
            <NormalSelect
              selectValue={subscriptionType}
              menuItems={["Free Plan", "Starter Plan", "piq Plan"]}
              onSelectChange={(e) => setSubscriptionType(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Sub Categories</Typography>
            </Box>
            <IconInput
              placeholder={"Enter a Sub category"}
              value={subCategoriesField}
              onChange={(e) => setSubCategoriesField(e.target.value)}
              onKeyDownFunction={handleKeyPress}
            />
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
          </Box>
          <Box className="field-container-full">
            <Box className="title-container">
              <Typography className="title">About</Typography>
            </Box>
            <MultilineInput
              placeholder={"Enter Message Here"}
              minRows={4}
              maxRows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
      <Box className="timings-container" ref={HoursRef}>
        <Typography className="sub-title">Hours</Typography>
        <Grid container className="timing-schedule-container" spacing={5}>
          {timing.map((day, index) => (
            <Grid item xs={6}>
              <DayTimingCard
                day={day.day}
                openTime={day.open}
                closeTime={day.close}
                dayStatus={day.status}
                disabled={!day.status}
                onDayStatusChange={(e) =>
                  handleTimingChange(index, "status", e.target.checked)
                }
                onOpenTimeChange={(e) =>
                  handleTimingChange(index, "open", e.target.value)
                }
                onCloseTimeChange={(e) =>
                  handleTimingChange(index, "close", e.target.value)
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {type === "manage" && (
        <Box ref={SubscriptionRef}>
          <Typography className="sub-title">Subscription Plan</Typography>
        </Box>
      )}
      {type === "manage" && (
        <Box className="subscriptions-container">
          {subscriptionCardData.map((card, index) => (
            <SubscriptionCard
              icon={card?.icon}
              title={card.title}
              price={card.price}
              details={card.details}
              buttonText={card.buttontext}
              offered={card.current}
            />
          ))}
        </Box>
      )}
      {type === "manage" && (
        <Box className="user-access-container">
          <Box className="user-access-title-area" ref={UsersRef}>
            <Typography className="sub-title">User & Access</Typography>
            <Box className="add-user-button-container">
              <Add />
            </Box>
          </Box>
          <Box className="user-access-search-container">
            <IconInput placeholder={"Enter Here"} icon={searchIcon} />
            <Box className="image-container">
              <img src={filterIcon} alt="filterIcon" />
            </Box>
          </Box>
          <Box className="user-access-cards-container">
            <Box className="user-access-card">
              <Box className="left-area">
                <Box className="image-container">
                  <img src={userProfileImage} alt="user" />
                </Box>
                <Box className="title-container">
                  <Typography className="title">Sophia James</Typography>
                  <Typography className="last-login">
                    Last login: Apr 23, 2023
                  </Typography>
                </Box>
              </Box>
              <Box className="right-area">
                <Box className="role-container">
                  <Typography className="role">Admin</Typography>
                </Box>
                <img src={arrowDown} alt="arrow-down" />
              </Box>
            </Box>
          </Box>
          <Box className="user-access-cards-container">
            <Box className="user-access-card">
              <Box className="left-area">
                <Box className="image-container">
                  <img src={userProfileImage} alt="user" />
                </Box>
                <Box className="title-container">
                  <Typography className="title">Sophia James</Typography>
                  <Typography className="last-login">
                    Last login: Apr 23, 2023
                  </Typography>
                </Box>
              </Box>
              <Box className="right-area">
                {/* <Box className="role-container">
                <Typography className="role">Admin</Typography>
              </Box> */}
                <img src={arrowDown} alt="arrow-down" />
              </Box>
            </Box>
          </Box>
          <Box className="user-access-cards-container">
            <Box className="user-access-card">
              <Box className="left-area">
                <Box className="image-container">
                  <img src={userProfileImage} alt="user" />
                </Box>
                <Box className="title-container">
                  <Typography className="title">Sophia James</Typography>
                  <Typography className="last-login">
                    Last login: Apr 23, 2023
                  </Typography>
                </Box>
              </Box>
              <Box className="right-area">
                {/* <Box className="role-container">
                <Typography className="role">Admin</Typography>
              </Box> */}
                <img src={arrowDown} alt="arrow-down" />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {type === "manage" ? (
        <Box className="bottom-area-fixed">
          <Loader loading={approvalLoading}>
            <div>
              <PrimaryButton
                text={"Save"}
                disabled={false}
                onClick={handleSaveEditProfile}
                // onClick={() => {
                //   navigate("/profiles/add");
                // }}
              />
            </div>
          </Loader>
        </Box>
      ) : type === "add" ? (
        // <Box className="bottom-area">
        //   <div>
        //     <PrimaryButton
        //       text={"Next"}
        //       disabled={
        //         checkIfEmpty("name", name) ||
        //         checkIfEmpty("location", location) ||
        //         checkIfEmpty("phone", phone) ||
        //         checkIfEmpty("email", email) ||
        //         checkIfEmpty("website", website) ||
        //         checkIfEmpty("instagram", instagram) ||
        //         checkIfEmpty("establishmentType", establishmentType) ||
        //         checkIfEmpty("about", about) ||
        //         checkIfEmpty("timing", timing) ||
        //         checkIfEmpty("croppedImage", croppedImage) ||
        //         checkIfEmpty("cropped bg", croppedBackground)
        //       }
        //       onClick={() => {
        //         handleSubmit();
        //         navigate("/profiles/add");
        //       }}
        //     />
        //   </div>
        // </Box>

      <Box className="bottom-area">
      <div>
        <PrimaryButton
          text={"Submit"}
          disabled={
            checkIfEmpty("name", name) ||
            checkIfEmpty("location", location) ||
            checkIfEmpty("phone", phone) ||
            checkIfEmpty("email", email) ||
            checkIfEmpty("website", website) ||
            checkIfEmpty("instagram", instagram) ||
            //checkIfEmpty("establishmentType", establishmentType) ||
            checkIfEmpty("about", about) ||
            checkIfEmpty("timing", timing) ||
            checkIfEmpty("croppedImage", croppedImage) ||
            checkIfEmpty("cropped bg", croppedBackground)
          }
          onClick={() => {
            handleSubmit();
            //navigate("/profiles/requests/list");
          }}
        />
      </div>
      </Box>
      ) : (
        <Box className="bottom-area">
          <Loader loading={approvalLoading}>
            <div>
              <SecondaryButton
                text={"Deny"}
                onClick={() => handleReject(profileInformation?.id)}
              />
            </div>
            <div>
              {console.log('Profile information id',profileInformation?.id)}
              <PrimaryButton
                text={"Approve"}
                onClick={() => handleApprove(profileInformation?.id)}
              />
            </div>
          </Loader>
        </Box>
      )}
    </Box>
  );
}

export default ProfileDetails;
