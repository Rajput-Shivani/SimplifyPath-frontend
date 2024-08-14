// src/redux/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/api/authService";
import { useState } from "react";
import AppSecureStorage from "../../services/secureStorage";
import { PAGE_ROUTES } from "../../utils/constants";

// Replace with your backend API endpoint for Google login

// const [isDataStored, setIsDataStored] = useState(false)
const auth = new AuthService();
const storage = new AppSecureStorage();
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ data, navigate }, { dispatch }) => {
    dispatch(setLoading(true));
    const body = {
      clientId: data.clientId,
      credentials: data.credential,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    dispatch(setCredentials(body));
    try {
      document.body.style.opacity = 1;
      const response = await auth.login(body);
      storage.set("permissions", JSON.stringify(response.data.permissions));    
      if (response) {
        dispatch(setRole(response.data.role));
        storage.set("token", response.data.accessToken);
        storage.set("tokenExpiry", response.data.expiry);
        storage.set("role", response.data.role);
        storage.set("domain", response.data.email);
        storage.set("id", response.data.id);
        storage.set("name", response.data.name);
        storage.set("orgId", response?.data?.organisationId);
        const permissions = { Chat: ["Get"] };
        const firstKey = Object.keys(permissions)[0];
        let role = storage.get("role");
        if (role === "superadmin") {
          navigate("/analytics");
          window.location.replace("/analytics");
        } else {
          navigate(`/${firstKey.toLowerCase()}`, { replace: true });
          window.location.replace(`/${firstKey.toLowerCase()}`);
        }
        if (response) {
          dispatch(setLoading(false));
        }
        return response.data;
      } else {
        // alert();
        dispatch(setLoading(false));
        throw new Error();
      }
      document.body.style.opacity = 0.5;
    } catch (error) {
      console.log("err", error);
      dispatch(setLoading(false));
      //   toast.error(error?.data?.message);
      // if (error?.response && error?.response.status === 401) {
      //   toast("wrong credentials");
      //   navigate("/");
      // }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: "idle",
    clientId: null,
    credentials: null,
    role: null,
    loader: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.clientId = action.payload.clientId;
      state.credentials = action.payload.credentials;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLoading: (state, action) => {
      state.loader = action.payload;
    },

    extraReducers: (builder) => {
      builder
        .addCase(googleLogin.pending, (state) => {
          state.loading = "loading";
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.user = action.payload;
        })
        .addCase(googleLogin.rejected, (state) => {
          state.loading = "failed";
        });
    },
  },
});

export const { setCredentials, setRole, setLoading } = authSlice.actions;

export default authSlice.reducer;
