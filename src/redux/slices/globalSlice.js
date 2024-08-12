// src/redux/globalSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const globalSlice = createSlice({
  name: "global",
  initialState: {
    page: 1,
    limit: 10,
    pageRole: 0,
    limitRole: 10,
    sortConfig: { key: "name", direction: "asc" },
    filterValue: "All",
    searchItemUserManagement: "",
    totalPage:0,
    searchInput:"",
    selectedRole:"",
    selectedUserRoleId:"",
    isConfirm:false,
    confirmationTitle:"",
    confirmationData:"",
    confirmationContent:"",
    selectedOptionData:{},
    categroryInternalData:{},
    promptsData:[],
    searchTerm:""
  },
  reducers: {
    setPage:(state , action)=>{
        state.page = action.payload
    },
    setLimit:(state, action)=>{
        state.limit = action.payload
    },
    setPageRole:(state, action)=>{
        state.pageRole = action.payload
    },
    setlimitRole:(state, action)=>{
        state.limitRole = action.payload
    },
    setSortConfig: (state, action) => {
        state.sortConfig = action.payload;
      },
    setFilterValue:(state , action)=>{
        state.filterValue = action.payload
    },
    setSearchItem:(state, action)=>{
      state.searchItemUserManagement = action.payload
    },
    setTotalPage:(state, action)=>{
      state.totalPage = action.payload
    },
    setSearchInput:(state, action)=>{
      state.searchInput = action.payload
    },
    setSelectedRole:(state, action)=>{
      state.selectedRole = action.payload
    },
    setSelectedUserRoleId:(state, action)=>{
      state.selectedUserRoleId = action.payload
    },
    setIsConfirmation:(state, action)=>{
      state.isConfirm = action.payload
    },
    setConfirmationTitle:(state, action)=>{
      state.confirmationTitle = action.payload
    },
    setConfirmationData:(state, action)=>{
      state.confirmationData = action.payload
    },
    setConfirmationContent:(state, action)=>{
      state.confirmationContent = action.payload
    },
    setSelectedOption:(state, action)=>{
      state.selectedOptionData = action.payload
    },
    setCategoryInternalData:(state, action)=>{
      state.categroryInternalData = action.payload
    },
    setPromptsData:(state, action)=>{
      state.promptsData = action.payload
    },
    setSearchITerm:(state, action)=>{
      state.searchTerm = action.payload
    }
  },
});

export const { setFilterValue , setLimit, setPage, setPageRole,
    setSortConfig,setlimitRole,setTotalPage,setSearchInput,setSelectedRole,setSelectedUserRoleId,
    setIsConfirmation, setConfirmationContent, setConfirmationData, setConfirmationTitle, setSearchItem,
    setSelectedOption,setCategoryInternalData,setPromptsData,setSearchITerm
} = globalSlice.actions;

export default globalSlice.reducer;
