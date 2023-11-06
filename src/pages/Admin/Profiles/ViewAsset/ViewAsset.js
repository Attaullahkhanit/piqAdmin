import React from "react";
import "./styles.scss";
import { Typography, ListItem, Grid, Box } from "@mui/material";
import {ReactComponent as ProfileIcon} from '../../../../assets/admin/Profile/viewasset/profile icon.svg'
import {ReactComponent as ViewIcon} from '../../../../assets/admin/Profile/viewasset/view.svg'
import {ReactComponent as EditIcon} from '../../../../assets/admin/Profile/viewasset/edit2.svg'
import {ReactComponent as VideoIcon} from '../../../../assets/admin/Profile/viewasset/video.svg'
import {ReactComponent as ShareIcon} from '../../../../assets/admin/Profile/viewasset/share.svg'
import {ReactComponent as SaveIcon} from '../../../../assets/admin/Profile/viewasset/save.svg'
import {ReactComponent as RocketIcon} from '../../../../assets/admin/Profile/viewasset/rocket-lunch.svg'
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import {ReactComponent as EyeIcon} from '../../../../assets/admin/Profile/viewasset/eye.svg'
import {ReactComponent as UparrowIcon} from '../../../../assets/admin/Profile/viewasset/uparrow.svg'
import {ReactComponent as DownarrowIcon} from '../../../../assets/admin/Profile/viewasset/downarrow.svg'
import {ReactComponent as ClockIcon} from '../../../../assets/admin/Profile/viewasset/clock.svg'
import {ReactComponent as ShopingIcon} from '../../../../assets/admin/Profile/viewasset/shopping-bag (2).svg'
import {ReactComponent as EarningIcon} from '../../../../assets/admin/Profile/viewasset/usd-circle.svg'
import VideoImage from '../../../../assets/admin/Profile/viewasset/videofram.png'
import PlayBackVideoDetail from "../PlayBackVideoDetail/PlayBackVideoDetail";
import VideoPlayBackDetail from "../../../../components/videoComponent/VideoPlayBackDetail/VideoPlayBackDetail";
import VideoViewAsset from "../../../../components/videoComponent/VideoViewAsset/VideoViewAsset";
import { useLocation } from "react-router-dom";
import { numberKiloMillion } from "../../../../utils/numberKiloMillion";
import DangerButton from "../../../../components/Buttons/Danger/DangerButton";
import deleteAsset from "../../../../apis/assets/deleteAsset";
import { useNavigate } from "react-router-dom";
import { showToastError, showToastSuccess } from "../../../../utils/showToasify";

function ViewAsset() {
    const location = useLocation();
    const videoData  = location.state;

    const navigate = useNavigate();

    console.log(videoData, 'video data')
    console.log(videoData.ownerTags, 'ownerTags DAta')

    const deleteAssetfromMenu = (assetId) => {
        deleteAsset(assetId).then((res)=>{
            console.log(res)
            showToastSuccess("Menu Item deleted successfully")
        }).catch((err)=>{
            console.log(err)
            showToastError("Failed to delete Menu Item")
        })
    }

  return (
    <Grid container className="view-asset-container">
      <Grid className="left-side-container" item xs={6} sm={6}>
        <ListItem>
            <Typography className="title-text">{videoData.assetType}</Typography>
        </ListItem>
        <ListItem>
            <div className="name-card">
                <div className="top-row">
                    <div>
                        <div>
                            <Typography className="business-name">{videoData.assetName}</Typography>
                        </div>
                        <div className="profile-icon-name">
                            <ProfileIcon/><Typography className="name">Blueberry Pancakes</Typography>
                        </div>
                    </div>
                    <div className="profile-icon-name">
                        <ViewIcon className="icons"/><EditIcon/>
                    </div>
                </div>
                <div className='divider'></div>
                <div className="bottom-row">
                    <div className="views">
                        <div className="icon-name"><VideoIcon className="icon"/>Views</div>
                        <div className="numeric-value">{numberKiloMillion(videoData.views)}</div>
                    </div>
                    <div className="shares">
                        <div className="icon-name"><ShareIcon className="icon"/>Shares</div>
                        <div className="numeric-value">{numberKiloMillion(videoData.shares)}</div>
                    </div>
                    <div className="saves">
                        <div className="icon-name"><SaveIcon className="icon"/>Saves</div>
                        <div className="numeric-value">{numberKiloMillion(videoData.saves)}</div>
                    </div>
                </div>
            </div>
        </ListItem>
        <ListItem>
            <div className="container-boost-visibility">
                <div className="top-row">
                    <div>
                        <RocketIcon/>
                    </div>
                    <div className="title-content">
                        <Typography className="title">Boost your visibility</Typography>
                        <Typography className="description">Show the world what you offer by promoting your content</Typography>
                    </div>
                </div>
                <div className="bottom-button">
                    <PrimaryButton 
                        text={"Promote"} 
                    />
                </div>
            </div>
        </ListItem>
        <ListItem>
            <Typography className="stats-title">{videoData.status}</Typography>
        </ListItem>
        <ListItem>
            <div className="performance-container">
                <div className="first-row">
                    <div className="impressions">
                        <div className="top-row"><EyeIcon/><Typography className="text">Impressions</Typography></div>
                        <div className="bottom-row">
                            <div className="numeric-value">{numberKiloMillion(videoData.impressions)}</div>
                            <UparrowIcon className="arrow-icon"/>
                            <div className="percent-value">12.9%</div>
                        </div>
                    </div>
                    <div className="impressions">
                        <div className="top-row"><VideoIcon/><Typography className="text">Views</Typography></div>
                        <div className="bottom-row">
                            <div className="numeric-value">{numberKiloMillion(videoData.views)}</div>
                            <DownarrowIcon className="arrow-icon"/>
                            <div className="percent-red-value">12.9%</div>
                        </div>
                    </div>
                </div>
                <div className="first-row">
                    <div className="impressions">
                        <div className="top-row"><ClockIcon/><Typography className="text">View Time (avg)</Typography></div>
                        <div className="bottom-row">
                            <div className="numeric-value">129s</div>
                            <UparrowIcon className="arrow-icon"/>
                            <div className="percent-value">12.9%</div>
                        </div>
                    </div>
                    <div className="impressions">
                        <div className="top-row"><EyeIcon/><Typography className="text">%  Completed</Typography></div>
                        <div className="bottom-row">
                            <div className="numeric-value">30%</div>
                            <UparrowIcon className="arrow-icon"/>
                            <div className="percent-value">12.9%</div>
                        </div>
                    </div>
                </div>
                <div className="first-row">
                    <div className="impressions">
                        <div className="top-row"><ShareIcon/><Typography className="text">Shares</Typography></div>
                        <div className="bottom-row">
                            <div className="numeric-value">{numberKiloMillion(videoData.shares)}</div>
                            <UparrowIcon className="arrow-icon"/>
                            <div className="percent-value">12.9%</div>
                        </div>
                    </div>
                    <div className="impressions">
                        <div className="top-row"><SaveIcon/><Typography className="text">Saves</Typography></div>
                        <div className="bottom-row">
                            <div className="numeric-value">{numberKiloMillion(videoData.saves)}</div>
                            <UparrowIcon className="arrow-icon"/>
                            <div className="percent-value">12.9%</div>
                        </div>
                    </div>
                </div>
                <div className="first-row">
                    <div className="impressions">
                        <div className="top-row"><ShopingIcon/><Typography className="text">Clickthroughs</Typography></div>
                        <div className="bottom-row">
                            <div className="numeric-value">300</div>
                            <UparrowIcon className="arrow-icon"/>
                            <div className="percent-value">12.9%</div>
                        </div>
                    </div>
                    <div className="impressions">
                        <div className="top-row"><EarningIcon/><Typography className="text">Impressions</Typography></div>
                        <div className="bottom-row">
                            <div className="numeric-value">{numberKiloMillion(videoData.impressions)}</div>
                            <UparrowIcon className="arrow-icon"/>
                            <div className="percent-value">12.9%</div>
                        </div>
                    </div>
                </div>
            </div>
        </ListItem>
      </Grid>
      <Grid className="right-side-container" item xs={6} sm={6}>
        <div className="btn-container">
        <DangerButton text="- Delete Asset" width="42%" height="50px"
            onClick={() => {
                deleteAssetfromMenu(videoData.assetId)
                navigate(-1)} }/>
        </div>
        <ListItem className="video-container">
            <div className="video-alignment">
                {/* <img src={VideoImage} width={405} height={861}/> */} 
                <VideoViewAsset
                name={videoData.assetName}
                title="BlueBerry Pancakes"
                percentage="$14.99"
                tags={videoData.ownerTags}
                descriptionText={videoData.description}
                thumbnailURL={videoData.thumbnail}
                videoURLProp={videoData.videoURL}
                />
            </div>
        </ListItem>
      </Grid>
    </Grid>
  );
}

export default ViewAsset;
