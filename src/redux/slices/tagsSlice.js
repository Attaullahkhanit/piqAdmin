import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const tagsFromLocalStorage =
  JSON.parse(localStorage.getItem("tags")) || initialState;

const tagsSlice = createSlice({
  name: "tags",
  initialState: tagsFromLocalStorage,
  reducers: {
    setAllTags: (state, action) => {
      state = action.payload;
      localStorage.setItem("tags", JSON.stringify(state));
    },
    addTag: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("tags", JSON.stringify(state));
    },
    clearTags: (state) => {
      state = [];
    },
  },
});
const { reducer, actions } = tagsSlice;
export const { setAllTags, addTag, clearTags } = actions;
export default reducer;
