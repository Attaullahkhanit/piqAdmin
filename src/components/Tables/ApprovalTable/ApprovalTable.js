import { Box, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import upArrow from "../../../assets/admin/Content/upArrow.png";
import downArrow from "../../../assets/admin/Content/downArrow.png";
import videoDummy from "../../../assets/admin/Content/videoDummy.png";
import userPlaceholder from "../../../assets/admin/Profile/userPlaceholder.png";
import deleteIcon from "../../../assets/admin/Content/deleteIcon.png";
import editIcon from "../../../assets/admin/Content/editIcon.png";
import dot from "../../../assets/admin/Dashboard/dot.png";
import profileDummy from "../../../assets/admin/Profile/profilePicture.png";
import "./styles.scss";
import Marquee from "react-double-marquee";
import { ReactComponent as AlertIcon } from "../../../assets/admin/Profile/alertIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileInformation } from "../../../redux/slices/profileDataSlice";
import deleteAsset from "../../../apis/assets/deleteAsset";
import {
  deleteBusiness,
  deleteBusinessData,
  setBusinessProfiles,
} from "../../../redux/slices/deleteBusinessSlice";
import { timeAgo } from "../../../utils/getTimeAgo";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../Util/Loader/Loader";
import NormalSelect from "../../InputFields/NormalSelect/NormalSelect";
import NoDataPlaceholder from "../../Util/NoDataPlaceholder/NoDataPlaceholder";
import ProfileMatchModal from "../../Modals/ProfileMatchModal/ProfileMatchModal";
import { editAsset } from "../../../apis/assets/editAsset";
import saveBusiness from "../../../apis/business/saveBusiness";
//import deleteBusiness from "../../../apis/business/deleteBusiness";
import refactorFirebaseProfileData from "../../../utils/refactorFirebaseProfileData";
import getApprovedProfiles from "../../../apis/dashboard/Profiles/getApprovedProfiles";
import { setBusinessData } from "../../../redux/slices/businessProfileSlice";

function ApprovalTable({
  mainTitle,
  data,
  setData,
  hasMore,
  fetchMoreData,
  loading,
  profileOptions,
}) {
  // const [loading, setLoading] = useState(false); // Add loading state
  const [mainChecked, setMainChecked] = useState(false);
  const [profileMatchModalOpened, setProfileMatchModalOpened] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState({});
  const [loadingIndex, setLoadingIndex] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [unFilteredProfileData, setUnfilteredProfileData] = useState([]);
  const [profilesData, setProfilesData] = useState([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [profilesDataHasMore, setProfilesDataHasMore] = useState(true);
  const [profileDelete, setProfileDelete] = useState(false);

  dispatch(setBusinessProfiles(data));

  const handleStatusChange = (status, index) => {
    setData((prevData) => {
      const newData = prevData.map((item, i) => {
        if (i === index) {
          return { ...item, status: status };
        }
        return item;
      });
      return newData;
    });

    setLoadingIndex(index);

    if (location.pathname.includes("/content")) {
      const assetId = data[index].assetId;
      const datastatus = { status };
      editAsset(assetId, datastatus)
        .then((res) => {
          console.log(res, "data res");
          const newData = [...data];
          newData[index].status = status;
          setData(newData);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoadingIndex(-1);
        });
    } else {
      const businessId = data[index].id;
      const businessData = { status };
      saveBusiness(businessId, businessData)
        .then((res) => {
          const newData = [...data];
          newData[index].status = status;
          setData(newData);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoadingIndex(-1);
        });
    }
  };

  // check box check ability
  const handleCheckboxChange = (index) => {
    const updatedRow = { ...data[index] };
    updatedRow.checked = !updatedRow.checked;
    const updatedData = [...data];
    updatedData[index] = updatedRow;
    setData(updatedData);
  };

  // get all profiles
  const getAllProfiles = async () => {
    await getApprovedProfiles(pageNumber, 40).then((response) => {
      const data = response?.data;
      const currentPage = response?.current_page;
      const totalPages = response?.total_pages;
      if (currentPage === totalPages) {
        setProfilesDataHasMore(false);
      }
      setPageNumber(currentPage + 1);
      setProfilesData((prev) => [
        ...prev,
        ...refactorFirebaseProfileData(data),
      ]);
      setUnfilteredProfileData((prev) => [
        ...prev,
        ...refactorFirebaseProfileData(data),
      ]);
      setProfilesLoading(false);
      setProfileDelete(false);
    });
  };

  // delete business
  const deleteBusinessProfile = (id) => {
    console.log("delete business dispatch id", id);
    dispatch(deleteBusinessData(id));
    dispatch(deleteBusiness(id));
    //setProfilesLoading(true);
    //getAllProfiles();
  };

  // edit asset post api calling

  const handleProfileMatchModal = (index, data) => {
    const assetId = data[index].assetId;
    const newData = {state: "your status here"}
    setMatchedProfile(data[index]);
    setProfileMatchModalOpened(true);
    // setLoading(true);
  };
  if (profilesLoading) {
    return <Loader loading={profilesLoading} />;
  } else {
    return (
      <Box className="approval-table">
        <ProfileMatchModal
          open={profileMatchModalOpened}
          handleClose={() => setProfileMatchModalOpened(false)}
          profile={matchedProfile}
        />
        <table>
          <thead>
            <th>
              <td style={{ flex: 1 }}>
                <Checkbox
                  className="radio-check-box-business"
                  checked={mainChecked}
                  sx={{
                    color: "#DCDCDC",
                    "&.Mui-checked": {
                      color: "#FFAE00",
                    },
                  }}
                  onChange={() => setMainChecked(!mainChecked)}
                />
              </td>
              <td style={{ flex: 10 }}>
                <Typography className="heading-text">{mainTitle}</Typography>
              </td>
              <td>
                <Typography className="heading-text">Category</Typography>
              </td>
              <td>
                <Box className="sorting-header">
                  <Typography className="heading-text">Added</Typography>
                  <Box className="sorting-container">
                    <img src={upArrow} alt="arrow up" />
                    <img src={downArrow} alt="arrow down" />
                  </Box>
                </Box>
              </td>
              <td style={{ flex: 3 }}>
                <Box className="sorting-header">
                  <Typography className="heading-text">Views</Typography>
                  <Box className="sorting-container">
                    <img src={upArrow} alt="arrow up" />
                    <img src={downArrow} alt="arrow down" />
                  </Box>
                </Box>
              </td>
              <td style={{ flex: 3 }}>
                <Box className="sorting-header">
                  <Typography className="heading-text">Shares</Typography>
                  <Box className="sorting-container">
                    <img src={upArrow} alt="arrow up" />
                    <img src={downArrow} alt="arrow down" />
                  </Box>
                </Box>
              </td>
              <td style={{ flex: 3 }}>
                <Box className="sorting-header">
                  <Typography className="heading-text">Saves</Typography>
                  <Box className="sorting-container">
                    <img src={upArrow} alt="arrow up" />
                    <img src={downArrow} alt="arrow down" />
                  </Box>
                </Box>
              </td>
              <td>
                <Box className="sorting-header">
                  <Typography className="heading-text">Impressions</Typography>
                  <Box className="sorting-container">
                    <img src={upArrow} alt="arrow up" />
                    <img src={downArrow} alt="arrow down" />
                  </Box>
                </Box>
              </td>
              {/* <td style={{ flex: 5 }}>
              <Typography className="heading-text">Comments</Typography>
            </td> */}
              <td style={{ flex: 5 }}>
                <Box className="sorting-header">
                  <Typography className="heading-text">Status</Typography>
                  <Box className="sorting-container">
                    <img src={upArrow} alt="arrow up" />
                    <img src={downArrow} alt="arrow down" />
                  </Box>
                </Box>
              </td>
              <td style={{ flex: 2 }}>
                <Typography className="heading-text">Actions</Typography>
              </td>
            </th>
          </thead>
          <tbody id="table-body">
            {data.length > 0 ? (
              <InfiniteScroll
                hasMore={hasMore}
                next={fetchMoreData}
                loader={<Loader loading={true} />}
                scrollableTarget="table-body"
                dataLength={data.length}
              >
                {data.map((row, index) => (
                  <tr key={index}>
                    <td style={{ flex: 1 }}>
                      <Checkbox
                        className="radio-check-list"
                        checked={row?.checked || mainChecked}
                        sx={{
                          color: "#DCDCDC",
                          "&.Mui-checked": {
                            color: "#FFAE00",
                          },
                        }}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td style={{ flex: 10 }}>
                      {mainTitle === "video" ? (
                        <Box className="content-area">
                          <img
                            src={row?.thumbnail}
                            alt="video"
                            className="video-thumbnail"
                            onClick={() => navigate(`/content/detail/${row?.assetId}`)}
                          />
                          <Box className="content-details-area">
                            <Typography
                              className="title cursor-pointer"
                              onClick={() => {
                                if (row?.status === "approved") {
                                  navigate(`/content/detail/${row?.assetId}`);
                                } else {
                                  navigate(
                                    `/content/approval/detail/${row?.assetId}`
                                  );
                                }
                              }}
                            >
                              {row?.assetName}
                            </Typography>
                            <Box className="tags-container">
                              {row?.ownerTags?.map((tag, index) => {
                                if (index < 6) {
                                  return (
                                    <Box className="tag-group">
                                      <Typography className="tag-text">
                                        {tag}
                                      </Typography>
                                      {index + 1 !== row?.ownerTags?.length && (
                                        <img src={dot} alt="divider" />
                                      )}
                                    </Box>
                                  );
                                }
                              })}
                            </Box>
                            <Box className="profile-container">
                              <img
                                src={row?.businessImageUrl}
                                alt="profile picture"
                              />
                              <Typography className="business-name">
                                {row?.businessName}
                              </Typography>
                            </Box>
                            <Typography className="business-tag">
                              {row?.labels[0]}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box className="content-area">
                          <img
                            src={
                              row?.businessImage?.length > 1
                                ? row?.businessImage
                                : userPlaceholder
                            }
                            alt="video"
                            className="business-image"
                          />
                          <Box className="content-details-area">
                            <Typography className="business-tag">
                              {row?.type}
                            </Typography>
                            <Box className="title-container">
                              <Typography
                                className="title"
                                onClick={() => {
                                  dispatch(setProfileInformation(row));
                                  dispatch(setBusinessData(row));
                                  navigate(`/business/${row?.id}`);
                                  // if (row.status === "approved") {
                                  //   navigate(`/business/${row.id}`);
                                  // } else {
                                  //   navigate(`/profiles/${row.id}/review`);
                                  // }
                                }}
                              >
                                <Marquee behavior="scroll" direction="left">
                                  {row?.title}
                                </Marquee>
                              </Typography>
                            </Box>
                            <Box className="tags-container">
                              {row?.tags?.map((tag, index) => (
                                <Box className="tag-group">
                                  <Typography className="tag-text">
                                    {tag}
                                  </Typography>
                                  {index + 1 !== row?.tags?.length && (
                                    <img src={dot} alt="divider" />
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </td>
                    <td>
                      <Typography className="row-content-normal">
                        {row?.category}
                        {/* {(row.tags &&
                          row.tags.map((tag, index) => (
                            <Box className="tag-group">
                              <Typography className="tag-text">
                                {tag}
                              </Typography>
                              {index + 1 !== row.tags.length && (
                                <img src={dot} alt="divider" />
                              )}
                            </Box>
                          ))) ||
                          row?.assetType} */}
                      </Typography>
                    </td>
                    <td>
                      <Typography className="row-content-normal">
                        {row?.added || timeAgo(row?.createdAt)}
                      </Typography>
                    </td>
                    <td style={{ flex: 3 }}>
                      <Typography className="row-content-normal">
                        {row?.views}
                      </Typography>
                    </td>
                    <td style={{ flex: 3 }}>
                      <Typography className="row-content-normal">
                        {row?.shares}
                      </Typography>
                    </td>
                    <td style={{ flex: 3 }}>
                      <Typography className="row-content-normal">
                        {row?.saves}
                      </Typography>
                    </td>
                    <td>
                      <Typography className="row-content-normal">
                        {row?.impressions}
                      </Typography>
                    </td>
                    {/* <td style={{ flex: 5 }}>
                    <Typography className="row-content-normal">
                      {row?.comments || ""}
                    </Typography>
                  </td> */}
                    <td style={{ flex: 5 }}>
                      {
                        <Loader loading={loadingIndex === index}>
                          <Box className="row-content-stack">
                            <NormalSelect
                              selectValue={row?.status}
                              menuItems={profileOptions?.map((option) => {
                                if (option.toLowerCase() !== "all") {
                                  return option.toLowerCase();
                                }
                              })}
                              onSelectChange={(e) =>
                                handleStatusChange(e.target.value, index)
                              }
                            />
                            {row?.status?.toLowerCase() === "review" && (
                              <AlertIcon
                                className="alert"
                            onClick={() => handleProfileMatchModal(index, data)}
                               />
                            )}
                          </Box>
                        </Loader>
                      }
                    </td>
                    <td style={{ flex: 2 }}>
                      <Box className="actions-container">
                        <img
                          src={editIcon}
                          alt="edit"
                          onClick={() => {
                            dispatch(setProfileInformation(row));
                            dispatch(setBusinessData(row));
                            navigate(`/content/detail/${row?.assetId}`);
                            // if (row.status === "approved") {
                            //   navigate(`/business/${row.id}`);
                            // } else {
                            // navigate(`/profiles/${row.id}/review`);
                            // }
                          }}
                        />
                        <img
                          src={deleteIcon}
                          alt="delete"
                          onClick={() => {
                            if (location.pathname.includes("/content")){
                              deleteAsset(row.assetId).then(()=>{
                                window.location.reload()
                              })
                            }
                            else{
                            deleteBusinessProfile(row.id);
                            }
                          }}
                        />
                      </Box>
                    </td>
                  </tr>
                ))}
              </InfiniteScroll>
            ) : (
              <NoDataPlaceholder />
            )}
          </tbody>
        </table>
      </Box>
    );
  }
}

export default ApprovalTable;
