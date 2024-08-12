import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/authSlice";
import integrationReducer from "./redux/slices/integrationSlice";
import chatReducer from "./redux/slices/chatSlice";
import popUpRedducer from "./redux/slices/popUpSlice";
import userRoleReducer from "./redux/slices/userRoleSlice";
import userManagementReducer from "./redux/slices/userManagementSlice";
import globalReducer from "./redux/slices/globalSlice";
import trainAndContentReducer from "./redux/slices/trainAndContentSlice";
import profileReducer from "./redux/slices/profileSlice";
import organizationReducer from "./redux/slices/organizationSlice";
import analyticsReducer from "./redux/slices/analyticsSlice";

export const store = configureStore({
  reducer: {
    globalReducer,
    authReducer,
    integrationReducer,
    chatReducer,
    popUpRedducer,
    userRoleReducer,
    userManagementReducer,
    trainAndContentReducer,
    profileReducer,
    organizationReducer,
    analyticsReducer
  },
});
