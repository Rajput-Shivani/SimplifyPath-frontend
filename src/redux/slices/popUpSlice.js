// src/redux/popUpSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const popUpSlice = createSlice({
  name: "popUp",
  initialState: {
   isPopUpShow :false,
   actionName:"",
   popUpTitle:"",
   closeBtnName:"",
   submitBtnName:"",
   isActivatePopup:false,
   isEditpopup:false,
   isEditActivate:false
  },
  reducers: {
    setIsPopUpShow:(state , action)=>{
        state.isPopUpShow = action.payload
    },
    setActionName:(state, action)=>{
        state.actionName = action.payload
    },
    setPopUpTitle:(state, action)=>{
        state.popUpTitle = action.payload
    },
    setCloseBtnName:(state, action)=>{
        state.closeBtnName = action.payload
    },
    setSubmitBtnName:(state, action)=>{
        state.submitBtnName = action.payload
    },
    setIsActivatePopup:(state , action)=>{
        state.isActivatePopup = action.payload
    },
    setIsEditpopup:(state , action)=>{
        state.isEditpopup = action.payload
    },
    setIsEditActive:(state, action)=>{
        state.isEditActivate = action.payload
    }
  },
});

export const { setIsPopUpShow , setActionName, setPopUpTitle, setCloseBtnName,
    setSubmitBtnName,setIsActivatePopup, setIsEditpopup,setIsEditActive
} = popUpSlice.actions;

export default popUpSlice.reducer;
