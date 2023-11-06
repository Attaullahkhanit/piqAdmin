import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import {
  adminRoutes,
  authRoutes,
  businessRoutes,
  videoRoutes,
} from "./routes/Routes";
import LayoutAlternator from "./layouts/LayoutAlternator/LayoutAlternator";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import getAllTags from "./apis/common/getAllTags";
import { setAllTags } from "./redux/slices/tagsSlice";
import { clearProfileData } from "./redux/slices/profileDataSlice";
import { clearBusinessData } from "./redux/slices/businessProfileSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const fetchAllTags = async () => {
    const data = await getAllTags();
    dispatch(setAllTags(data));
  };
  const pathNamesToBeIgnored = [
    "/profiles/add",
    "/profiles/add/information",
    "/profiles/video/all",
    "/profiles/video/add",
    "/profiles/video/editThumbnail",
    "/profiles/video/addDetail",
    "/profiles/video/addTags",
    "/profiles/video/uploadSuccess",
    "/business/video/add",
    "/business/video/editThumbnail",
    "/business/video/addDetail",
    "/business/video/addTags",
    "/business/video/uploadSuccess",
  ];
  useEffect(() => {
    if (!localStorage.getItem("tags")) {
      fetchAllTags();
    }
    return () => {
      localStorage.removeItem("tags");
    };
  }, []);

  useEffect(() => {
    if (
      !pathNamesToBeIgnored.includes(location.pathname) &&
      !location.pathname.includes("/profiles/")
    ) {
      dispatch(clearProfileData());
    }
    if (
      !location.pathname.includes("/business") &&
      !location.pathname.includes("/profiles")
    ) {
      dispatch(clearBusinessData());
    }
    if (!isLoggedIn && location.pathname === "/") {
      navigate("/signin");
    }
  }, [location.pathname]);

  const ProtectedRoute = ({ children, redirectTo }) => {
    console.log("path", location.pathname);
    if (isLoggedIn) {
      return children;
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
        <LayoutAlternator>
          <Routes>
            {adminRoutes.map((route) => (
              <Route
                path={`${route.path}`}
                element={
                  <ProtectedRoute redirectTo={"/signin"}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}
            {businessRoutes.map((route) => (
              <Route
                path={`/business${route.path}`}
                element={
                  <ProtectedRoute redirectTo={"/signin"}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}
            {authRoutes.map((route, index) => (
              <Route
                key={index}
                path={`${route.path}`}
                element={route.element}
              />
            ))}
          </Routes>
        </LayoutAlternator>
      </div>
    </Provider>
  );
}

export default App;
