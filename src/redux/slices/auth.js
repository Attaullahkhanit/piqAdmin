import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PIQ_BASE_URL } from "../../apis/variables";
// import { mapErrorMessage } from "../../utils/mapErrorMessage";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${PIQ_BASE_URL}/auth/signin-business-user`,
      user
    );
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      return thunkAPI.rejectWithValue({
        error: err.response.data,
        status: err.response.status,
      });
    } else {
      return thunkAPI.rejectWithValue({
        error: {
          success: false,
          message: "Network Error",
        },
      });
    }
  }
});
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${PIQ_BASE_URL}/auth/signup-business-user`,
        user
      );
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          error: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          error: {
            success: false,
            message: "Network Error",
          },
        });
      }
    }
  }
);

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get("/auth/checktoken");
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          error: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          error: {
            success: false,
            message: "Network Error",
          },
        });
      }
    }
  }
);

export const loadTokenFromLocalStorage = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return token;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: loadTokenFromLocalStorage() ? true : false,
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: loadTokenFromLocalStorage(),
    error: "",
    loading: false,
    // allBusinesses: JSON.parse(localStorage.getItem("allBusinesses")) || [],
    allBusinesses: localStorage.getItem("allBusinesses") ? JSON.parse(localStorage.getItem("allBusinesses")) : [],
  },
  reducers: {
    Logout: (state) => {
      console.log("came here");
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";
      state.error = "";
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("tags");
      localStorage.removeItem("allBusinesses");
      localStorage.removeItem("businessData");
    },
    ClearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user_data.userData;
      state.isLoggedIn = true;
      state.token = action.payload.user_data.userData.idToken;
      state.allBusinesses = action.payload.user_data.associatedBusinesses;
      localStorage.setItem(
        "authToken",
        action.payload.user_data.userData.idToken
      );
      localStorage.setItem(
        "allBusinesses",
        JSON.stringify(action.payload.user_data.associatedBusinesses)
      );
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user_data.userData)
      );
    },
    [login.rejected]: (state, action) => {
      const { error, status } = action.payload;
      state.loading = false;
      //   state.error = mapErrorMessage(error);
      state.error = error;
      state.isLoggedIn = false;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user_id;
      state.isLoggedIn = true;
      state.allBusinesses = [];
      // set user to localStorege
      const { idToken } = action.payload.user_id;
      const user = action.payload.user_id;
      localStorage.setItem("authToken", idToken);
      localStorage.setItem("allBusinesses", []);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [register.rejected]: (state, action) => {
      const { error, status } = action.payload;
      state.loading = false;
      //   state.error = mapErrorMessage(error);
      state.error = error;
      state.isLoggedIn = false;
    },
    [checkToken.pending]: (state) => {
      state.loading = true;
    },
    [checkToken.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.loading = false;
    },
    [checkToken.rejected]: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});
const { reducer, actions, extraReducers } = authSlice;
export const { ClearError, Logout } = actions;
export default reducer;
