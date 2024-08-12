// src/redux/chatSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { setLoading } from "./global";
// import { unauthorizedError } from "../../utils/helpers";
import UserRoleService from "../../services/api/userRoleService";
import { setTotalPage } from "./globalSlice";

const userRole = new UserRoleService();

export const getRolesData = createAsyncThunk(
  `/admin/role`,
  async (
    { page, limit, searchQuery, sortKey, sortDirection, navigate },
    { dispatch }
  ) => {
    try {
    //   dispatch(setLoading(true));
      const response = await userRole.getRolesData({
        page,
        limit,
        searchQuery,
        sortKey,
        sortDirection,
        navigate,
      });
    //   dispatch(setLoading(false));
    dispatch(setTotalPage(response?.total))
      return response;
    } catch (error) {
      if (error?.response) {
        // unauthorizedError(navigate);
      } else {
        // toast.error("Something went wrong");
      }
    //   dispatch(setLoading(false));
      throw error;
    }
  }
);

//add new role api integration
export const addNewRoleData = createAsyncThunk(
  "/admin/role/",
  async (
    { body, page, limit, searchQuery, sortKey, sortDirection, navigate },
    { dispatch }
  ) => {
    try {
      let searchTerm = searchQuery || ""
      const response = await userRole.addNewRole(body, page, limit, navigate);
      dispatch(
        getRolesData({
          page,
          limit,
          searchQuery:searchTerm,
          sortKey,
          sortDirection,
          navigate,
        })
      );
      toast.success("Add new role successfully");
      return response;
    } catch (error) {
      if (error?.response) {
        // unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.errors ? error?.data?.errors : error?.data?.message
        );
      }

      throw error?.data?.message;
    }
  }
);

export const editRoleData = createAsyncThunk(
  "/admin/editrole/",
  async (
    { body, id, page, limit, searchQuery, sortKey, sortDirection, navigate },
    { dispatch }
  ) => {
    try {
      const response = await userRole.editRole({
        body,
        id,
        page,
        limit,
        navigate,
      });
      // dispatch(
      //   getRolesData({
      //     page,
      //     limit,
      //     searchQuery,
      //     sortKey,
      //     sortDirection,
      //     navigate,
      //   })
      // );
      toast.success("edit role successfully");
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        // unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.errors ? error?.data?.errors : error?.data?.message
        );
      }
      throw error?.data?.message;
    }
  }
);

const editRoleSlice = createSlice({
  name: "editRoles",
  initialState: {
    loading: false,
    roles: [],
    selectedRoleData: null,
    renderallCustomData: null,
    page: 1,
    limit: 10,
    searchItem: "",
    addUserRoles:{
      role:"",
      permissions:null,
    },
    sortConfig: { key: "name", direction: "asc" },
  },
  reducers: {
    setSelectedRoleData: (state, action) => {
      state.selectedRoleData = action.payload;
    },
    clearedSelectedRole: (state, action) => {
      state.selectedRoleData = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    setAddRoleData: (state, action) => {
      state.addUserRoles.role = action.payload?.role;
      state.addUserRoles.permissions = action.payload?.permissions;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRolesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRolesData.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
        state.renderallCustomData = action.payload;
      })
      .addCase(getRolesData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addNewRoleData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewRoleData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewRoleData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editRoleData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editRoleData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editRoleData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSelectedRoleData,
  clearedSelectedRole,
  setPage,
  setLimit,
  setSearchItem,
  setSortConfig,
  setAddRoleData
} = editRoleSlice.actions;

export default editRoleSlice.reducer;
