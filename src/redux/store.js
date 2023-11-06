import { configureStore } from "@reduxjs/toolkit";
import profilePictureModalReducer from "./slices/profilePictureModalSlice";
import profileDataReducer from "./slices/profileDataSlice";
import tagsReducer from "./slices/tagsSlice";
import businessProfileReducer from "./slices/businessProfileSlice";
import authReducer from "./slices/auth";
import deleteBusinessReducer from "./slices/deleteBusinessSlice"
export const store = configureStore({
  reducer: {
    profilePictureModal: profilePictureModalReducer,
    profileData: profileDataReducer,
    tags: tagsReducer,
    businessProfile: businessProfileReducer,
    auth: authReducer,
    deleteBusiness: deleteBusinessReducer,
  },
});
