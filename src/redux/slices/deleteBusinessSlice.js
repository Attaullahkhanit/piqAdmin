import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PIQ_BASE_URL } from "../../apis/variables";
import axios from "axios";

export const deleteBusiness = createAsyncThunk("business/delete", async (id,profilesdata) => {
    try {
        // Your delete operation here
        console.log('delete business id',id)
        const response = await axios
              .post(`${PIQ_BASE_URL}/business/delete-business`, {
                businessId: id,
              })
        return response.data;
      } catch (error) {
        // Use the serializeError function to handle non-serializable data
        console.log('error',error)
       // return serializeError(error);
      }
  });

const deleteBusinessSlice = createSlice({
  name: "deleteBusiness",
  initialState: {
    profilesarr: [],
    deleteProfile: false,
    deletedProfile: null,
    error: "",
  },
  reducers: {
    deleteBusinessData: (state, action) => {
      state.deletedProfile = action.payload;
      state.deleteProfile = true;
      //console.log('state when delete profile',state.deleteProfile)
    },
    updateBusinessStatus: (state, action) => {
        //console.log('aaaaaaaaa')
        state.deleteProfile = false;
        // console.log('state delete profile',state.deleteProfile)
    },
    setBusinessProfiles: (state, action) => {
      state.profilesarr = action.payload;
    }
  },
  extraReducers: {
    [deleteBusiness.pending]: (state,action) => {
        state.deleteProfile = true;
    },
    [deleteBusiness.fulfilled]: (state,action) => {
        state.deleteProfile = false;
        //state.deletedProfile = null;
    },
    [deleteBusiness.rejected]: (state,action) => {
        state.error = "Can't delete business";
    },
  }
});
const { reducer, actions } = deleteBusinessSlice;
export const { deleteBusinessData, updateBusinessStatus, setBusinessProfiles } =
  actions;
export default reducer;



