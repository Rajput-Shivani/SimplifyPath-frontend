// src/redux/UserManagementSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import UserManagementService from "../../services/api/userManagementService";
import { unauthorizedError } from "../../utils/helpers";
import AppSecureStorage from "../../services/secureStorage";
import { setTotalPage } from "./globalSlice";

const userManagement = new UserManagementService();
const storage = new AppSecureStorage();
// get all users
export const getAllUsersManagementData = createAsyncThunk(
  "/admin/users",
  async (
    { page, limit, navigate, filterValue, searchQuery, sortKey, sortDirection },
    { dispatch }
  ) => {
    try {
      const response = await userManagement.getAllUserManagement({
        page,
        limit,
        navigate,
        filterValue,
        searchQuery,
        sortKey,
        sortDirection,
      });
      if (response) {
        console.log("usermanagment", response)
        dispatch(setTotalPage(response?.total))
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

export const getAllUsersManagement = createAsyncThunk(
  "/admin/users",
  async ({ page, limit, email, role, navigate }, { dispatch }) => {
    try {
      const response = await userManagement.getAllUserManagementData(
        page,
        limit,
        email,
        role,
        navigate
      );
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

// get roles
export const getRoles = createAsyncThunk(
  "/admin/role",
  async ({ navigate }, { dispatch }) => {
    try {
      const response = await userManagement.getAllRoles(navigate);
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response) {
        unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

// get all users
export const getAllPermissions = createAsyncThunk(
  "/admin/permission",
  async (navigate, { dispatch }) => {
    try {
      const response = await userManagement.getAllPermissions(navigate);
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

// delete user
export const deleteUser = createAsyncThunk(
  "/admin/user/delete",
  async (
    {
      id,
      page,
      limit,
      navigate,
      filterValue,
      searchQuery,
      sortKey,
      sortDirection,
    },
    { dispatch }
  ) => {
    try {
      const response = await userManagement.deleteUser(id, navigate);
      dispatch(
        getAllUsersManagementData({
          page,
          limit,
          navigate,
          filterValue,
          searchQuery,
          sortKey,
          sortDirection,
        })
      );
      toast.success("User Deleted successfully");
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.errors ? error?.data?.errors : error?.data?.message
        );
      }
      throw error?.data?.message;
    }
  }
);

export const sendReminderEmail = createAsyncThunk(
  "/admin/user/reminder",
  async ({ id, navigate }, { dispatch }) => {
    try {
      const response = await userManagement.sendReminderEmail(id, navigate);
      toast.success("Reminder Email Sent successfully");
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.errors ? error?.data?.errors : error?.data?.message
        );
      }
      throw error?.data?.message;
    }
  }
);

export const addNewUser = createAsyncThunk(
  "/admin/user/create",
  async (
    {
      body,
      navigate,
      page,
      limit,
      filterValue,
      searchQuery,
      sortKey,
      sortDirection,
    },
    { dispatch }
  ) => {
    try {
      const response = await userManagement.addNewUser(body, navigate);
      toast.success(response?.message);
      dispatch(
        getAllUsersManagementData({
          page,
          limit,
          navigate,
          filterValue,
          searchQuery,
          sortKey,
          sortDirection,
        })
      );
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.errors ? error?.data?.errors : error?.data?.message
        );
      }
      throw error?.data?.message;
    }
  }
);

export const update_user = createAsyncThunk(
  "/admin/user/update",
  async (
    {
      id,
      data,
      navigate,
      page,
      limit,
      filterValue,
      searchQuery,
      sortKey,
      sortDirection,
    },
    { dispatch }
  ) => {
    try {
      const response = await userManagement.updateUser(
        id,
        data,
        navigate,
        page,
        limit
      );
      toast.success("User updated successfully");
      dispatch(
        getAllUsersManagementData({
          page,
          limit,
          navigate,
          filterValue,
          searchQuery,
          sortKey,
          sortDirection,
        })
      );

      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.errors ? error?.data?.errors : error?.data?.message
        );
      }
      throw error?.data?.message;
    }
  }
);

const UserManagementSlice = createSlice({
  name: "UserManagement",
  initialState: {
    loading: "idle",
    expandMoreIcon: false,
    isActive: false,
    getUserManagementData: null,
    getRolesData: {},
    getAllPermission: "",
    page: 1,
    limit: 10,
    pageRole: 0,
    limitRole: 10,
    addUserRoleData: null,
    filterValue: "All",
    searchItemUserManagement: "",
    sortConfig: { key: "name", direction: "asc" },
  },
  reducers: {
    setExpandMoreIcon: (state, action) => {
      state.expandMoreIcon = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = true;
    },
    closeActiveModal: (state, action) => {
      state.isActive = false;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setPageRole: (state, action) => {
      state.pageRole = action.payload;
    },
    setLimitRole: (state, action) => {
      state.limitRole = action.payload;
    },
    setAddUserRoleData: (state, action) => {
      state.addUserRoleData = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
    setSearchItemUserManagement: (state, action) => {
      state.searchItemUserManagement = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersManagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersManagement.fulfilled, (state, action) => {
        state.loading = false;
        state.getUserManagementData = action.payload;
      })
      .addCase(getAllUsersManagement.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.getRolesData = action.payload;
      })
      .addCase(getRoles.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllPermission = action.payload;
      })
      .addCase(getAllPermissions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendReminderEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendReminderEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendReminderEmail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(update_user.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_user.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(update_user.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setExpandMoreIcon,
  setIsActive,
  closeActiveModal,
  setPage,
  setLimit,
  setPageRole,
  setLimitRole,
  setAddUserRoleData,
  setFilterValue,
  setSortConfig,
  setSearchItemUserManagement,
} = UserManagementSlice.actions;

export default UserManagementSlice.reducer;
