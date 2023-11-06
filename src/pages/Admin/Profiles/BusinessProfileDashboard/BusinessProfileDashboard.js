import {
  Button,
  Grid,
  ListItem,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import "./styles.scss";
import { ReactComponent as Addicon } from "../../../../assets/admin/ProfileDashboard/Sidebar/add.svg";
import { ReactComponent as Edit } from "../../../../assets/admin/ProfileDashboard/Sidebar/edit.svg";
import { ReactComponent as AngleDownArrow } from "../../../../assets/admin/ProfileDashboard/Sidebar/angle-small-down.svg";
import ProfileDashboardAdd from "../../../../components/Modals/ProfileDashboardAdd/ProfileDashboardAdd";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VideoGallery from "../../../../components/videoComponent/VideoGallery/VideoGallery";
import SneakPiqGallery from "../../../../components/videoComponent/SneakPiqGallery/SneakPiqGallery";
import getBusinessMenu from "../../../../apis/business/getBusinessMenu";
import getBusinessSneakPiqs from "../../../../apis/business/getBusinessSneakPiqs";
import AllVideoGallery from "../../../../components/videoComponent/AllVideoGallery/AllVideoGallery";
// import addBusinessMenuCategory from "../../../../apis/business/addBusinessMenuCategory";
import addBusinessMenu from "../../../../apis/profile/addBusinessMenu";
import addBusinessMenuCategory from "../../../../apis/business/addBusinessMenuCategory";

function BusinessProfileDashboard(props) {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [menuCategories, setMenuCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const [itemOpen, setItemOpen] = React.useState(false);
  // menu option state
  const [submenuVisible, setSubmenuVisible] = useState(false);

  // content option state
  const [submenuVisible6, setSubmenuVisible6] = useState(false);
  const [submenuVisible7, setSubmenuVisible7] = useState(false);
  const [submenuVisible8, setSubmenuVisible8] = useState(false);
  const [submenuVisible9, setSubmenuVisible9] = useState(false);

  const [videosData, setVideosData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // content option
  const toggleSubmenu6 = () => setSubmenuVisible6(!submenuVisible6);
  const toggleSubmenu7 = () => setSubmenuVisible7(!submenuVisible7);
  const toggleSubmenu8 = () => setSubmenuVisible8(!submenuVisible8);
  const toggleSubmenu9 = () => setSubmenuVisible9(!submenuVisible9);

  const [menuData, setMenuData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeVideoName, setActiveVideoName] = useState("");
  const [activeAll, setActiveAll] = useState(true);
  const [subMenuData, setSubMenuData] = useState([]);
  const [businessSneakPiqs, setBusinessSneakPiqs] = useState([]);

  const [openMenuItems, setOpenMenuItems] = useState({});

  const { id } = useParams();
  console.log("business id", { id });

  const [activeTab, setActiveTab] = useState("tab1");
  const [activeMenuTab, setActiveMenuTab] = useState();

  const handleTabClick = (tab) => {
    console.log("active tab", tab);
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  const getBusinessMenuData = (businessId) => {
    setIsLoading(true);
    //fetch business data
    getBusinessMenu(businessId)
      .then((data) => {
        setMenuData(data.menu);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const getBusinessSneakPiqData = (businessId) => {
    setIsLoading(true);
    //fetch business data
    getBusinessSneakPiqs(businessId)
      .then((data) => {
        setBusinessSneakPiqs(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getBusinessMenuData(id);
    getBusinessSneakPiqData(id);
  }, []);
  useEffect(() => {
    getBusinessMenuData(id);

    //console.log('updated business data',menuData)
  }, [menuCategories]);

  useEffect(() => {
    console.log("updated menu data", Object.values(menuData)[0]);
    // if (Object.keys(menuData).length > 0){
    //     setVideosData(Object.values(menuData)[0])
    //     setActiveVideoName(Object.keys(menuData)[0])
    // }
  }, [menuData]);

  useEffect(() => {
    console.log("updated sneakpiq data", businessSneakPiqs);
    // if (Object.keys(menuData).length > 0){
    //     setVideosData(Object.values(menuData)[0])
    //     setActiveVideoName(Object.keys(menuData)[0])
    // }
    setActiveAll(true);
    setActiveTab("tab0");
    setActiveMenuTab();
  }, [businessSneakPiqs]);

  const handleVideoData = (key, index) => {
    setActiveVideoName(key);
    setActiveMenuTab(index);
    setVideosData(menuData[key]);
    setActiveTab("tab1");
    setActiveAll(false);
    console.log("updated videos data", videosData);
    setOpenMenuItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index] || false,
    }));
  };

  const handleAllSneakPiqs = () => {
    setActiveTab("tab2");
  };
  const getMenuListId = location.pathname.split("/"); //["profile", "dashboard", "kljhgfyjhhk"]

  // Api calling to post data
  const getMenuItemFromBackend = () => {
    addBusinessMenu(getMenuListId[3]) // Business id to be made dynamic
      .then((data) => {
        setMenuCategories(Object.keys(data.menu));
        console.log(data, "data value");
      })
      .catch(() => {
        // Something went wrong
      });
  };
  useEffect(() => {
    getMenuItemFromBackend();
  }, []);
  // Function to add new menu category
  const handleNewMenuCategory = (newMenuCategory) => {
    setModalOpen(false);
    addBusinessMenuCategory("ujfPMs3x24OsmmFdMjAY", newMenuCategory) // Business id to be made dynamic
      .then(() => {
        setMenuCategories([newMenuCategory, ...menuCategories]);
      })
      .catch((err) => {
        // Something went wrong
      });
  };
  return (
    <>
      <ProfileDashboardAdd
        open={open}
        handleClose={handleClose}
        handleSuccess={(e) => handleNewMenuCategory(e)}
      />
      <Grid container className="container-gallery">
        <Grid item xs={3.3} className="left-side-bar">
          <ListItem>
            <div className="title-menu">
              <div className="menu-text">Menu</div>
              <div className="menu-icons">
                <Addicon className="add-icon" onClick={handleOpen} />
                <Edit className="edit-icon" />
              </div>
            </div>
          </ListItem>
          <ListItem
            className="menu-list-item"
            style={{
              background: activeAll === true ? "rgba(0, 0, 0, 0.05)" : "white",
            }}
            onClick={() => {
              setActiveAll(true);
              setActiveTab("tab0");
              setActiveMenuTab();
            }}
          >
            <div className="menu-item-breakfast">
              <div>All</div>
            </div>
          </ListItem>
          {menuData &&
            Object.keys(menuData).map((key, index) => (
              <div key={key}>
                {/* <p>{key}</p>
                        {console.log(menuData[key])}
                        <p>{index}</p> */}
                <ListItem
                  className="menu-list-item"
                  onClick={() => handleVideoData(key, index)}
                  style={{
                    background:
                      activeMenuTab === index ? "rgba(0, 0, 0, 0.05)" : "white",
                  }}
                >
                  <div className="menu-item-breakfast">
                    <div>{key}</div>
                    <div>
                      {openMenuItems[index] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <AngleDownArrow />
                      )}
                    </div>
                  </div>
                </ListItem>
                {console.log(index)}
                {openMenuItems[index] && (
                  <>
                    {videosData && activeMenuTab === index && (
                      <>
                        {videosData?.map((key, index) => (
                          <ListItem
                            className="sub-menu-item"
                            onClick={() =>
                              navigate("/view/asset", { state: key })
                            }
                          >
                            {key.assetName}
                            {console.log(key)}
                          </ListItem>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}

          <div className="side-bar-divider"></div>
          <ListItem>
            <Typography className="category-sneak-piq">Sneak piq</Typography>
          </ListItem>
          <ListItem
            className="menu-list-item"
            onClick={() => handleAllSneakPiqs()}
          >
            <div className="menu-item-breakfast">
              <div>All</div>
            </div>
          </ListItem>
          <ListItem className="menu-list-item">
            <div className="menu-item-breakfast">
              <div>Original</div>
            </div>
          </ListItem>
          <ListItem className="menu-list-item">
            <div className="menu-item-breakfast">
              <div>From Users</div>
            </div>
          </ListItem>
          <div className="side-bar-divider"></div>
          <ListItem>
            <Typography className="category-sneak-piq">Content</Typography>
          </ListItem>
          <ListItem className="menu-list-item">
            <div className="menu-item-breakfast">
              <div>All</div>
            </div>
          </ListItem>
          <ListItem className="menu-list-item" onClick={toggleSubmenu6}>
            <div className="menu-item-breakfast">
              <div>Uploaded</div>
              <div>
                <AngleDownArrow />
              </div>
            </div>
          </ListItem>
          {submenuVisible6 && (
            <>
              <ListItem className="sub-menu-item">Item 1</ListItem>
              <ListItem className="sub-menu-item">Item 2</ListItem>
            </>
          )}
          <ListItem className="menu-list-item" onClick={toggleSubmenu7}>
            <div className="menu-item-breakfast">
              <div>Purchased</div>
              <div>
                <AngleDownArrow />
              </div>
            </div>
          </ListItem>
          {submenuVisible7 && (
            <>
              <ListItem className="sub-menu-item">Item 1</ListItem>
              <ListItem className="sub-menu-item">Item 2</ListItem>
            </>
          )}
          <ListItem className="menu-list-item" onClick={toggleSubmenu8}>
            <div className="menu-item-breakfast">
              <div>Used</div>
              <div>
                <AngleDownArrow />
              </div>
            </div>
          </ListItem>
          {submenuVisible8 && (
            <>
              <ListItem className="sub-menu-item">Item 1</ListItem>
              <ListItem className="sub-menu-item">Item 2</ListItem>
            </>
          )}
          <ListItem className="menu-list-item" onClick={toggleSubmenu9}>
            <div className="menu-item-breakfast">
              <div>Not Used</div>
              <div>
                <AngleDownArrow />
              </div>
            </div>
          </ListItem>
          {submenuVisible9 && (
            <>
              <ListItem className="sub-menu-item">Item 1</ListItem>
              <ListItem className="sub-menu-item">Item 2</ListItem>
            </>
          )}
        </Grid>
        <Grid item xs={8.7} className="right-side-section">
          <ListItem className="right-side-container">
            {activeTab === "tab0" && (
              <AllVideoGallery
                businessVideos={menuData}
                handleVideoData={handleVideoData}
              />
            )}
            {activeTab === "tab1" && (
              <VideoGallery
                businessVideos={videosData}
                videoName={activeVideoName}
              />
            )}
            {activeTab === "tab2" && (
              <SneakPiqGallery sneakPiqData={businessSneakPiqs} />
            )}
          </ListItem>
        </Grid>
      </Grid>
    </>
  );
}

export default BusinessProfileDashboard;
