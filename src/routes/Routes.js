import ContentApprovalPlaybackView from "../pages/Admin/Content/ApprovalPlaybackView/ContentApprovalPlaybackView";
import ContentApprovalTableView from "../pages/Admin/Content/ApprovalTableView/ContentApprovalTableView";
import ContentDetail from "../pages/Admin/Content/Detail/ContentDetail";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Subscription from "../pages/Admin/Payment/Subscription/Subscription";
import AddProfile from "../pages/Admin/Profiles/AddProfile/AddInfo/AddProfile";
import AddProfileProgress from "../pages/Admin/Profiles/AddProfile/AddProfileProgress/AddProfileProgress";
import ProfileApprovalTableView from "../pages/Admin/Profiles/Approval/ProfileApprovalTableView";
import Checkout from "../pages/Admin/Payment/Checkout/Checkout";
import ProfileRequests from "../pages/Admin/Profiles/Requests";
import ReviewProfile from "../pages/Admin/Profiles/ReviewProfile/ReviewProfile";
import PaymentMethod from "../pages/Admin/Payment/PaymentMethod/PaymentMethod";
import PaymentSuccessful from "../pages/Admin/Payment/PaymentSuccessful/PaymentSuccessful";
import BusinessHome from "../pages/Business/Home/BusinessHome";
import VideoPerformanceStats from "../pages/Business/PerformanceStats/VideoPerformanceStats";
import ManageBusinessProfile from "../pages/Business/Profile/Manage/ManageBusinessProfile";
import BusinessUser from "../pages/Business/Profile/AddUser/BusinessUser";
import AddVideo from "../pages/Video/AddVideo/AddVideo";
import EditThumbnail from "../pages/Video/EditThumbnail/EditThumbnail";
import AddDetail from "../pages/Video/AddDetail/AddDetail";
import AddTags from "../pages/Video/AddTags/AddTags";
import UploadSuccessful from "../pages/Video/UploadSuccessful/UploadSuccessful";
import AllProfileVideos from "../pages/Video/AllProfileVideos/AllProfileVideos";
import AddContentToProfile from "../pages/Admin/Content/AddContentToProfile/AddContentToProfile";
import SignIn from "../pages/Authentication/SignIn/SignIn";
import ManageNotifications from "../pages/Admin/Notifications/ManageNotifications/ManageNotifications";
import CreateNotification from "../pages/Admin/Notifications/CreateNotification/CreateNotification";
import EditNotification from "../pages/Admin/Notifications/EditNotification/EditNotification";
import BusinessProfileDashboard from "../pages/Admin/Profiles/BusinessProfileDashboard/BusinessProfileDashboard";
import VideoGallery from "../components/videoComponent/VideoGallery/VideoGallery";
import SneakPiqGallery from "../components/videoComponent/SneakPiqGallery/SneakPiqGallery";
import ViewAsset from "../pages/Admin/Profiles/ViewAsset/ViewAsset";
import AddAsset from "../pages/Admin/Assets/AddAsset";
import PlayBackVideoDetail from "../pages/Admin/Profiles/PlayBackVideoDetail/PlayBackVideoDetail";
import AddThumbnail from "../pages/Admin/Assets/AddThumbnail/AddThumbnail";
import AddDetailPage from "../pages/Admin/Assets/AddDetail/AddDetailPage";
import AssetSubmitted from "../pages/Admin/Assets/AssetSubmitted/AssetSubmitted";

export const adminRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/profiles/requests", element: <ProfileRequests /> },
  { path: "/profiles/requests/list", element: <ProfileApprovalTableView /> },
  { path: "/profiles/:id/review", element: <ReviewProfile /> },
  { path: "/profiles/add/", element: <AddProfileProgress /> },
  { path: "/profiles/add/information", element: <AddProfile /> },
  { path: "/profiles/video/all", element: <AllProfileVideos /> },
  { path: "/profiles/video/add", element: <AddVideo /> },
  { path: "/profiles/video/editThumbnail", element: <EditThumbnail /> },
  // { path: "/profiles/video/addDetail", element: <AddDetail /> },
  { path: "/profiles/video/addTags", element: <AddTags /> },
  { path: "/profiles/video/uploadSuccess", element: <UploadSuccessful /> },
  { path: "/subscription", element: <Subscription /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/payment", element: <PaymentMethod /> },
  { path: "/paymentSuccessful", element: <PaymentSuccessful /> },
  { path: "/content/list", element: <ContentApprovalTableView /> },
  {
    path: "/content/approval/playback",
    element: <ContentApprovalPlaybackView />
  },
  { path: "/content/detail/:id", element: <ContentDetail /> },
  { path: "/content/approval/detail/:id", element: <ContentDetail /> },
  { path: "/content/chooseProfile", element: <AddContentToProfile /> },
  { path: "/notifications/manage", element: <ManageNotifications /> },
  { path: "/notifications/create", element: <CreateNotification /> },
  { path: "/notifications/edit", element: <EditNotification /> },
  { path: "/assets/gallery", element: <VideoGallery /> },
  { path: "/assets/sneakpiqgallery", element: <SneakPiqGallery /> },
  { path: "/profile/dashboard/:id", element: <BusinessProfileDashboard /> },
  { path: "/view/asset", element: <ViewAsset /> },
  // Add Video, thumbnail, tags and at the last submit
  { path: "/profile/addAsset", element: <AddAsset /> },
  { path: "/profile/addAsset/thumbnail", element: <AddThumbnail /> },
  { path: "/playbackvideo/detail", element: <PlayBackVideoDetail /> },
  { path: "/video/addDetail", element: <AddDetailPage /> },
  { path: "/profile/assetSubmitted", element: <AssetSubmitted /> },
];

export const businessRoutes = [
  { path: "/:id", element: <BusinessHome /> },
  { path: "/performanceStats", element: <VideoPerformanceStats /> },
  { path: "/profiles/manage/:id", element: <ManageBusinessProfile /> },
  { path: "/profiles/add", element: <BusinessUser /> },
  { path: "/profiles/edit", element: <BusinessUser /> },
  { path: "/video/add", element: <AddVideo /> },
  { path: "/video/editThumbnail", element: <EditThumbnail /> },
  { path: "/video/addDetail", element: <AddDetail /> },
  { path: "/video/addTags", element: <AddTags /> },
  { path: "/video/uploadSuccess", element: <UploadSuccessful /> }
];

export const authRoutes = [
  { path: "/signin", element: <SignIn /> }
];