// src/redux/profileSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ProfileService from "../../services/api/profileService";
import { unauthorizedError } from "../../utils/helpers";

const profile = new ProfileService();

export const getProfileDetails = createAsyncThunk(
  "/profile",
  async (navigate, { dispatch }) => {
    dispatch(setProfileLoading(true))
    try {
      const response = await profile.getProfileDetailsData(navigate);
      dispatch(setProfileLoading(false))
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      dispatch(setProfileLoading(false))
      if (error?.response) {
        unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

export const updateProfileDetails = createAsyncThunk(
  "/updateProfileDetails",
  async ({ body, navigate }, { dispatch }) => {
    try {
      const response = await profile.updateProfileDetailsData(body, navigate);
      toast.success("Profile updated successfully");
      dispatch(getProfileDetails());
      return response;
    } catch (error) {
      toast.error(error.data.errors);
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    user: null,
    userCredentials: null,
    searchItemProfile: "",
    profileLoading:false
  },
  reducers: {
    setSearchItemProfile: (state, action) => {
      state.searchItemProfile = action.payload;
    },
    setProfileLoading:(state,action)=>{
      state.profileLoading= action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfileDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProfileDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfileDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUserCredentials, setSearchItemProfile,setProfileLoading } =
  profileSlice.actions;

export default profileSlice.reducer;
