import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileInformation: null,
  videoContent: [],
  selectedPlan: null,
};

const profileDataFromLocalStorage =
  JSON.parse(localStorage.getItem("profileData")) || initialState;

const profileDataSlice = createSlice({
  name: "profileData",
  initialState: profileDataFromLocalStorage,
  reducers: {
    setProfileInformation: (state, action) => {
      
      state.profileInformation = action.payload;
      localStorage.setItem("profileData", JSON.stringify(state));
    },
    setVideoContent: (state, action) => {
      state.videoContent = action.payload;
      localStorage.setItem("profileData", JSON.stringify(state));
    },
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
      localStorage.setItem("profileData", JSON.stringify(state));
    },
    clearProfileData: (state, action) => {
      state.profileInformation = null;
      state.videoContent = [];
      state.selectedPlan = null;
      localStorage.removeItem("profileData");
    },
  },
});
const { reducer, actions } = profileDataSlice;

export const {
  setProfileInformation,
  setVideoContent,
  setSelectedPlan,
  clearProfileData,
} = actions;
export default reducer;
