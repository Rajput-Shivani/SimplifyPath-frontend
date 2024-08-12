// src/redux/AnalyticsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { unauthorizedError } from "../../utils/helpers";
import AnalyticsService from "../../services/api/analyticsService";
import { setLoading } from "./authSlice";

const analytics = new AnalyticsService();

export const getAnalytics_Data = createAsyncThunk(
  `/analytics`,
  async ({ startDate, endDate, navigate }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await analytics.getAnalyticsData({
        startDate,
        endDate,
        navigate,
      });
      dispatch(setLoading(false));
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response) {
        unauthorizedError(navigate);
      }
      dispatch(setLoading(false));
      throw error;
    }
  }
);

const AnalyticsSlice = createSlice({
  name: "Analytics",
  initialState: {
    loader: false,
    analyticsData: null,
    selectedKey: "data1",
    searchItemAnalytics: "",
    searchItemResponse: "",
  },
  reducers: {
    setAnalyticsData: (state, action) => {
      state.analyticsData = action.payload;
    },
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setSearchItemAnalytics: (state, action) => {
      state.searchItemAnalytics = action.payload;
    },
    setSearchItemresponse: (state, action) => {
      state.searchItemResponse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnalytics_Data.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAnalytics_Data.fulfilled, (state, action) => {
        state.loader = false;
        state.analyticsData = action.payload;
      })
      .addCase(getAnalytics_Data.rejected, (state) => {
        state.loader = false;
      });
  },
});

export const {
  setAnalyticsData,
  setSelectedKey,
  setSearchItemAnalytics,
  setSearchItemresponse,
} = AnalyticsSlice.actions;

export default AnalyticsSlice.reducer;
