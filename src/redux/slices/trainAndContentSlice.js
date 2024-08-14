// src/redux/TrainAndContentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import TrainAndContent from "../../services/api/trainAndContentService";
import axios from "axios";
import { flattenObject, unauthorizedError } from "../../utils/helpers";
import {API_URL} from "../../utils/constants"
import AppSecureStorage from "../../services/secureStorage";
import { setTotalPage } from "./globalSlice";

const trainAndContent = new TrainAndContent();
const storage = new AppSecureStorage();

export const getAllUploadedDocuments = createAsyncThunk(
  "/admin/train/content?page=1&limit=1",
  async ({ page, limit, type, navigate, searchQuery }, { dispatch }) => {
    try {
      const response = await trainAndContent.getAllDocuments(
        page,
        limit,
        type,
        navigate,
        searchQuery
      );
      if (response) {
        console.log("document respo", response)
        dispatch(setTotalPage(response?.total))
        dispatch(setDocumentData(response));
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        // unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

export const getAllUploadedDocumentsProfile = createAsyncThunk(
  "/admin/train/content?page=1",
  async ({ page, limit, navigate, searchQuery }, { dispatch }) => {
    dispatch(setIsDocumentLoad(true))
    try {
      const response = await trainAndContent.getAllDocumentsProfile(
        page,
        limit,
        navigate,
        searchQuery
      );
      if (response) {
        dispatch(setIsDocumentLoad(false))
        dispatch(setTotalPage(response?.total))
        return response;
      } else {
        dispatch(setIsDocumentLoad(false))
        throw new Error();
      }
    } catch (error) {
      dispatch(setIsDocumentLoad(false))
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

export const uploadPdf = createAsyncThunk(
  "admin/uploadPdf",
  async (
    { payloadData, fileType, page, limit, navigate, searchQuery },
    { dispatch }
  ) => {
    try {
      const response = await axios.post(
        // `http://localhost:2000/api/v1/admin/train/content/${fileType}`,
        `${API_URL}/api/v1/admin/train/content/${fileType}`,
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${storage.get("token")}`,
          },
        }
      );

      if (response) {
        toast.success(
          "Processing has started for pdf uploading. Once the processing is complete, you will be notified, and you can ask your queries to the bot."
        );
        dispatch(
          getAllUploadedDocuments({
            page: page,
            limit: limit,
            type: fileType,
            searchQuery: searchQuery,
          })
        );

        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.response?.data?.errors
            ? error?.response?.data?.errors
            : error?.response?.data?.message
        );
      }
      throw error;
    }
  }
);

export const uploadURLData = createAsyncThunk(
  "admin/uploadURL",
  async (
    { body, fileType, page, limit, navigate, searchQuery },
    { dispatch }
  ) => {
    try {
      const response = await axios.post(
        // `http://localhost:2000/api/v1/admin/train/content/${fileType}`,
        `${API_URL}/api/v1/admin/train/content/${fileType}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${storage.get("token")}`,
          },
        }
      );

      if (response) {
        toast.success(
          "Processing has started for url uploading. Once the processing is complete, you will be notified, and you can ask your queries to the bot."
        );
        dispatch(
          getAllUploadedDocuments({
            page: page,
            limit: limit,
            type: fileType,
            searchQuery: searchQuery,
          })
        );
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.response?.data?.errors
            ? error?.response?.data?.errors
            : error?.response?.data?.message
        );
      }
      throw error;
    }
  }
);

export const uploadText = createAsyncThunk(
  "admin/uploadText",
  async (
    { body, fileType, page, limit, navigate, searchQuery },
    { dispatch }
  ) => {
    try {
      const response = await axios.post(
        // `http://localhost:2000/api/v1/admin/train/content/${fileType}`,
        `${API_URL}/api/v1/admin/train/content/${fileType}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${storage.get("token")}`,
          },
        }
      );

      if (response) {
        toast.success(
          "Processing has started for text uploading. Once the processing is complete, you will be notified, and you can ask your queries to the bot."
        );
        dispatch(
          getAllUploadedDocuments({
            page: page,
            limit: limit,
            type: fileType,
            searchQuery: searchQuery,
          })
        );

        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.response?.data?.errors
            ? error?.response?.data?.errors
            : error?.response?.data?.message
        );
      }
      throw error;
    }
  }
);

export const removePDF = createAsyncThunk(
  "/admin/delete/",
  async (
    { id, page, limit, fileType, navigate, searchQuery },
    { dispatch }
  ) => {
    try {
      const response = await trainAndContent.removePDF({
        id,
        navigate,
      });
      toast.success("record Delete Successfully");
      dispatch(
        getAllUploadedDocuments({
          page: page,
          limit: limit,
          type: fileType,
          searchQuery: searchQuery,
        })
      );
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.data?.errors
        );
      }
      throw error;
    }
  }
);

export const getAllCustom_data = createAsyncThunk(
  "/custom-action",
  async ({ page, limit, navigate }, { dispatch }) => {
    try {
      const response = await trainAndContent.getAllCustomData(
        page,
        limit,
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
      } else {
        toast.error("Something went wrong");
      }
      throw error;
    }
  }
);

export const getAllCustom_Action = createAsyncThunk(
  "/api/v1/action",
  async ({ navigate, searchQuery }, { dispatch }) => {
    try {
      const response = await trainAndContent.getCustomAction(
        navigate,
        searchQuery
      );
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error("Something went wrong");
        console.log("eroo", error)
      }
      throw error;
    }
  }
);

export const removeCustom_data = createAsyncThunk(
  "/admin/train/custom-action/:id",
  async ({ body, userId, page, limit, navigate }, { dispatch }) => {
    try {
      const response = await trainAndContent.removeCustomData(
        body,
        userId,
        navigate
      );
      toast.success("record Delete Successfully");
      dispatch(getAllCustom_data({ page, limit }));
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

export const updateCustom_data = createAsyncThunk(
  "/train/custom-action/:id",
  async ({ id, body, page, limit, navigate }, { dispatch }) => {
    try {
      const response = await trainAndContent.updateCustomData({
        id,
        body,
        navigate,
      });
      toast.success("record Update Successfully");
      dispatch(getAllCustom_data({ page, limit }));
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

export const createCustom_data = createAsyncThunk(
  "/train/custom-action",
  async (body, navigate, { dispatch }) => {
    try {
      const response = await trainAndContent.createCustomData(body, navigate);
      toast.success("record create Successfully");
      dispatch(setCustomActionId(response?._id));
      dispatch(setOpenTestingApi(true));

      return response;
    } catch (error) {
      if (error?.response) {
        // unauthorizedError(navigate);
      } else {
        toast.error(
          error?.data?.message ? error?.data?.message : error?.data?.errors
        );
      }
      throw error;
    }
  }
);

export const createCustomAPI = createAsyncThunk(
  "/train/createCustomAPI",
  async (requestData, { dispatch }) => {
    const { body, method, headers, url, navigate } = requestData;
    try {
      const response = await axios(url, {
        method: method,
        headers: typeof headers === "string" ? JSON.parse(headers) : headers,
        data: body,
      });
      let flattenObjectData = flattenObject(response.data);
      dispatch(setAPIResponseState(true));
      const apiReponseKeyData = Object.keys(flattenObjectData);
      dispatch(setAPIResponseData(apiReponseKeyData));
      toast.success("API request successful");
      return response.data;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error("Something went wrong");
      }
      throw error;
    }
  }
);

export const getSingleDataApi = createAsyncThunk(
  "/getSingleDataApi",
  async (id, navigate, { dispatch }) => {
    try {
      const response = await trainAndContent.getSingleData(id, navigate);
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      } else {
        toast.error("Something went wrong");
      }
      throw error;
    }
  }
);

const TrainAndContentSlice = createSlice({
  name: "TrainAndContect",
  initialState: {
    loading: false,
    documents: "",
    previewData: null,
    previewState: false,
    textDocuments: "",
    allDocument: null,
    activeButton: "Text",
    page: 1,
    limit: 10,
    pageCustom: 1,
    limitCustom: 10,
    openAddTrainMoadl: false,
    renderallCustomData: null,
    renderallCustomAction: null,
    getactionName: "",
    getPrompts: [],
    getEntities: null,
    isTestingApiModal: false,
    isEditTestingApiModal: false,
    customActionId: null,
    method: "POST",
    editmethod: "",
    url: "",
    editURL: "",
    headers: null,
    body: {},
    params: {},
    query: {},
    editBody: {},
    editParams: {},
    editQuery: {},
    responseKeys: null,
    storeEntites: null,
    apiResponseData: null,
    apiResponseState: false,
    responseKeyData: null,
    responseKeysArray: null,
    editApiRow: null,
    urlValue: "",
    isEdit: false,
    singleDataResponse: null,
    actionName: "",
    actionState: false,
    trainedData: null,
    selectedTrainedState: false,
    selectedTrainedStateEdit: false,
    selectedItemId: null,
    editOpen: false,
    editApplyLeave: false,
    openCustom: false,
    openCustomAction: false,
    editableData: {},
    selectedCategory: "",
    selecteSubCategory: null,
    selectedAction: null,
    selectedApp: null,
    selectedActionData: null,
    roleData: [],
    searchItemContent: "",
    searchItemCustom: "",
    //me
    selectedTrainStatus:"text",
    documentLoad:false
  },
  reducers: {
    setPreviewData: (state, action) => {
      state.previewData = action.payload;
    },
    setPreviewState: (state, action) => {
      state.previewState = action.payload;
    },
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setPageCustom: (state, action) => {
      state.pageCustom = action.payload;
    },
    setLimitCustom: (state, action) => {
      state.limitCustom = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = true;
    },
    setIsEditClose: (state, action) => {
      state.isEdit = false;
    },
    setOpenAddTrainMoadl: (state, action) => {
      state.openAddTrainMoadl = action.payload;
    },
    setStoreActionName: (state, action) => {
      state.getactionName = action.payload;
    },
    setStorePromts: (state, action) => {
      state.getPrompts = action.payload;
    },
    setStoreEntities: (state, action) => {
      state.getEntities = action.payload;
    },
    setStoreEntitiesArray: (state, action) => {
      state.storeEntites = action.payload;
    },
    setOpenTestingApi: (state, action) => {
      state.isTestingApiModal = action.payload;
    },
    setEditOpenTestingApi: (state, action) => {
      state.isEditTestingApiModal = action.payload;
    },
    setEditCloseTestingApi: (state, action) => {
      state.isEditTestingApiModal = action.payload;
      state.singleDataResponse = null;
    },
    setCloseTestingApi: (state, action) => {
      state.isTestingApiModal = action.payload;
    },
    setCustomActionId: (state, action) => {
      state.customActionId = action.payload;
    },
    setAPIResponseData: (state, action) => {
      state.apiResponseData = action.payload;
    },
    setMethod: (state, action) => {
      state.method = action.payload;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setEditUrl: (state, action) => {
      state.editURL = action.payload;
    },
    setEditBody: (state, action) => {
      state.editBody = action.payload;
    },
    setEditQuery: (state, action) => {
      state.editQuery = action.payload;
    },
    setEditParams: (state, action) => {
      state.editParams = action.payload;
    },
    setBody: (state, action) => {
      state.body = action.payload;
    },
    setCustomActionId: (state, action) => {
      state.customActionId = action.payload;
    },
    setCustomActionId: (state, action) => {
      state.customActionId = action.payload;
    },
    setCustomActionId: (state, action) => {
      state.customActionId = action.payload;
    },
    setCustomActionId: (state, action) => {
      state.customActionId = action.payload;
    },
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
    setAPIResponseState: (state, action) => {
      state.apiResponseState = action.payload;
    },
    setResponseKeyData: (state, action) => {
      state.responseKeyData = action.payload;
    },
    setResponseKeysArray: (state, action) => {
      state.responseKeysArray = action.payload;
    },
    setEditApiRow: (state, action) => {
      state.editApiRow = action.payload;
    },
    setEditMethod: (state, action) => {
      state.editmethod = action.payload;
    },
    seturlInputValue(state, action) {
      state.urlValue = action.payload;
    },
    clearSingleDataResponse(state, action) {
      state.singleDataResponse = null;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    setParams(state, action) {
      state.params = action.payload;
    },
    setActionName(state, action) {
      state.actionName = action.payload;
    },
    setActionState(state, action) {
      state.actionState = action.payload;
    },
    setTraineddata(state, action) {
      state.trainedData = action.payload;
    },
    setSelectedTrainedState(state, action) {
      state.selectedTrainedState = action.payload;
    },
    setSelectedTrainedStateEdit(state, action) {
      state.selectedTrainedStateEdit = action.payload;
    },
    setSelectedItemId(state, action) {
      state.selectedItemId = action.payload;
    },
    setEditOpen(state, action) {
      state.editOpen = action.payload;
    },
    setEditApplyLeave(state, action) {
      state.editApplyLeave = action.payload;
    },
    setOpenCustom(state, action) {
      state.openCustom = action.payload;
    },
    setOpenCustomAction(state, action) {
      state.openCustomAction = action.payload;
    },
    setEditableData(state, action) {
      state.editableData = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCategory(state, action) {
      state.selecteSubCategory = action.payload;
    },
    setSelectedAction(state, action) {
      state.selectedAction = action.payload;
    },
    setSelectedApp(state, action) {
      state.selectedApp = action.payload;
    },
    setSelectedActionData(state, action) {
      state.selectedActionData = action.payload;
    },
    setRoleData(state, action) {
      state.roleData = action.payload;
    },
    setDocumentData(state, action) {
      state.allDocument = action.payload;
    },
    setSearchItemContent(state, action) {
      state.searchItemContent = action.payload;
    },
    setSearchItemCustom(state, action) {
      state.searchItemCustom = action.payload;
    },
    //me
    setSelectedTrainStatus:(state, action)=>{
      state.selectedTrainStatus = action.payload
    },
    setIsDocumentLoad:(state, action)=>{
      state.documentLoad = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPdf.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPdf.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(uploadPdf.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllUploadedDocumentsProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUploadedDocumentsProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.allDocument = action.payload;
      })
      .addCase(getAllUploadedDocumentsProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removePDF.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePDF.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removePDF.rejected, (state) => {
        state.loading = false;
      })
      .addCase(uploadText.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadText.fulfilled, (state, action) => {
        state.loading = false;
        state.textDocuments = action.payload;
      })
      .addCase(uploadText.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllUploadedDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUploadedDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.allDocument = action.payload;
      })
      .addCase(getAllUploadedDocuments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(uploadURLData.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadURLData.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(uploadURLData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllCustom_data.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustom_data.fulfilled, (state, action) => {
        state.loading = false;
        state.renderallCustomData = action.payload;
      })
      .addCase(getAllCustom_data.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllCustom_Action.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustom_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.renderallCustomAction = action.payload;
      })
      .addCase(getAllCustom_Action.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeCustom_data.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCustom_data.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeCustom_data.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCustom_data.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustom_data.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCustom_data.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createCustom_data.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCustom_data.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCustom_data.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createCustomAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCustomAPI.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCustomAPI.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getSingleDataApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleDataApi.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDataResponse = action.payload;
      })
      .addCase(getSingleDataApi.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setPreviewData,
  setPreviewState,
  setActiveButton,
  setPage,
  setLimit,
  setPageCustom,
  setLimitPage,
  setOpenAddTrainMoadl,
  setStorePromts,
  setStoreActionName,
  setStoreEntities,
  setOpenTestingApi,
  setEditOpenTestingApi,
  setCloseTestingApi,
  setCustomActionId,
  setMethod,
  setUrl,
  setEditUrl,
  setEditBody,
  setHeaders,
  setStoreEntitiesArray,
  setBody,
  setAPIResponseData,
  setAPIResponseState,
  setResponseKeyData,
  setResponseKeysArray,
  setLimitCustom,
  setEditApiRow,
  setEditMethod,
  seturlInputValue,
  setEditCloseTestingApi,
  setIsEdit,
  clearSingleDataResponse,
  setQuery,
  setParams,
  setEditQuery,
  setEditParams,
  setActionName,
  setActionState,
  setTraineddata,
  setSelectedTrainedState,
  setSelectedTrainedStateEdit,
  setSelectedItemId,
  setEditOpen,
  setEditApplyLeave,
  setOpenCustom,
  setOpenCustomAction,
  setEditableData,
  setSelectedCategory,
  setSelectedAction,
  setSelectedApp,
  setSelectedSubCategory,
  setSelectedActionData,
  setRoleData,
  setDocumentData,
  setSearchItemContent,
  setSearchItemCustom,
  //me
  setSelectedTrainStatus,
  setIsDocumentLoad
} = TrainAndContentSlice.actions;

export default TrainAndContentSlice.reducer;
