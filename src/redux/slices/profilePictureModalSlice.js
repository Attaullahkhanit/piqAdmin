import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false, image: null };

const profilePictureModalSlice = createSlice({
  name: "profilePictureModal",
  initialState,
});

export default profilePictureModalSlice.reducer;
