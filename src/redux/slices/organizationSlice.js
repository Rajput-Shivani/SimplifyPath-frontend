// src/redux/profileSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import OrganisationService from "../../services/api/organizationService";
import { unauthorizedError } from "../../utils/helpers";
import { setTotalPage } from "./globalSlice";

const Organisation = new OrganisationService();

export const getOrganizationData = createAsyncThunk(
  "/organization",
  async (
    { page, limit, navigate, searchQuery, sortKey, sortDirection },
    { dispatch }
  ) => {
    try {
      const response = await Organisation.getAllOrganization({
        page,
        limit,
        navigate,
        searchQuery,
        sortKey,
        sortDirection,
      });
      if (response) {
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
export const addOrganizationData = createAsyncThunk(
  "/addOrganizationData",
  async ({payload, navigate} ,{ dispatch }) => {
    try {
      const response = await Organisation.addOrganization(payload);
      dispatch(getOrganizationData());
      toast.success("Add Organization Successfully");
      return response.data;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.message ? error?.data?.message : error?.data?.errors
        );
      }

      throw error;
    }
  }
);

// export const removeOrganizationData = createAsyncThunk(
//   "/removeOrganizationData",
//   async (id, { dispatch }) => {
//     try {
//       const response = await Organisation.removeOrganization(id);
//       dispatch(getOrganizationData());
//       toast.success("Delete Organization Successfully");
//       return response;
//     } catch (error) {
//       toast.error(error?.data?.message);
//       throw error;
//     }
//   }
// );

export const editOrganizationData = createAsyncThunk(
  "/editOrganizationData",
  async ({ id: id, body: body, navigate: navigate }, { dispatch }) => {
    try {
      const response = await Organisation.editOrganization(id, body, navigate);
      dispatch(getOrganizationData());
      toast.success("Organization updated successfully");
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.message ? error?.data?.message : error?.data?.errors
        );
      }
      throw error;
    }
  }
);

// export const removeOrganizationData = createAsyncThunk(
//   "/removeOrganizationData",
//   async (id, { dispatch }) => {
//     try {
//       const response = await Organisation.removeOrganization(id);
//       dispatch(getOrganizationData());
//       toast.success("Delete Organization Successfully");
//       return response;
//     } catch (error) {
//       toast.error(error?.data?.message);
//       throw error;
//     }
//   }
// );

export const activateOrganizationData = createAsyncThunk(
  "/activateOrganizationData",
  async ({ id: id, body: body, navigate: navigate }, { dispatch }) => {
    try {
      const response = await Organisation.activateOrganization(
        id,
        body,
        navigate
      );
      dispatch(getOrganizationData());
      // toast.success("Organization activated successfully");
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.message ? error?.data?.message : error?.data?.errors
        );
      }
      throw error;
    }
  }
);

const organisationSlice = createSlice({
  name: "organization",
  initialState: {
    loading: false,
    organisations: null,
    selectedOrg: null,
    loader: false,
    page: 1,
    limit: 10,
    searchItemOrganization: "",
  },
  reducers: {
    setSelectedOrg: (state, action) => {
      state.selectedOrg = action.payload;
    },
    clearSelectedOrg: (state, action) => {
      state.selectedOrg = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearchItemOrganization: (state, action) => {
      state.searchItemOrganization = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationData.pending, (state) => {
        state.loading = true;
        state.loader = true;
      })
      .addCase(getOrganizationData.fulfilled, (state, action) => {
        state.loading = false;
        state.organisations = action.payload;
        state.loader = false;
      })
      .addCase(getOrganizationData.rejected, (state) => {
        state.loading = false;
        state.loader = false;
      })
      .addCase(addOrganizationData.pending, (state) => {
        state.loading = true;
        state.loader = true;
      })
      .addCase(addOrganizationData.fulfilled, (state, action) => {
        state.loading = false;
        state.loader = false;
      })
      .addCase(addOrganizationData.rejected, (state) => {
        state.loading = false;
        state.loader = false;
      })

      .addCase(editOrganizationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editOrganizationData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editOrganizationData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(activateOrganizationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(activateOrganizationData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(activateOrganizationData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSelectedOrg,
  clearSelectedOrg,
  setPage,
  setLimit,
  setSearchItemOrganization,
} = organisationSlice.actions;

export default organisationSlice.reducer;
