// src/redux/IntegrationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IntegrationService from "../../services/api/integrationService";
import { toast } from "react-toastify";
import { setIsConfirmation } from "./globalSlice";
import { unauthorizedError } from "../../utils/helpers";
// import { setLoading } from "./global";
// import { unauthorizedError } from "../../utils/helpers";

const integration = new IntegrationService();

export const getIntegrationsData = createAsyncThunk(
  "/integration",
  async (navigate, { dispatch }) => {
    try {
      //   dispatch(setLoading(true));
      const response = integration.getIntegrationData(navigate);
      //   dispatch(setLoading(false));
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      }
      //   dispatch(setLoading(false));
      throw error;
    }
  }
);

export const getOrgIntegrationsData = createAsyncThunk(
  "/orgIntegration",
  async (navigate, { dispatch }) => {
    try {
      //   dispatch(setLoading(true));
      const response = integration.getOrgIntegrationData(navigate);
      //   dispatch(setLoading(false));
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        // unauthorizedError(navigate);
      }
      //   dispatch(setLoading(false));
      throw error;
    }
  }
);

export const removeIntegrationsData = createAsyncThunk(
  "/integration/default",
  async ({ name, navigate }, { dispatch }) => {
    try {
      const response = await integration.removeIntegration(name, navigate);
      dispatch(getIntegrationsData());
        toast.success(response.message);
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        // unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

//update default integration
export const updateIntegrationsData = createAsyncThunk(
  "/integration/default",
  async (body, navigate, { dispatch }) => {
    try {
      const response = await integration.updateIntegration(body, navigate);
      toast.success(response.message);
      dispatch(getIntegrationsData());
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        // unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

//keka api integration
export const kekaIntegrations = createAsyncThunk(
  "/integration/keka",
  async ({ body, navigate }, { dispatch }) => {
    try {
      const response = await integration.sendKekaIntegration(body, navigate);
      dispatch(getIntegrationsData());
       toast.success(response.message);
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
//telegram api integration
export const telegramIntegrations = createAsyncThunk(
  "/integration/telegram",
  async ({ body, navigate }, { dispatch }) => {
    try {
      const response = await integration.sendTelegramIntegration(
        body,
        navigate
      );
      dispatch(getIntegrationsData());
        toast.success(response?.message);
      dispatch(setIsTelegramActivate(response?.data));
      if (response?.data) {
        dispatch(setOepnTelegram(true));
      }
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

//dbf api integration
export const dbfIntegrations = createAsyncThunk(
  "/integration/dbf",
  async ({ body, navigate }, { dispatch }) => {
    try {
      const response = await integration.sendDBFIntegration(body, navigate);
      dispatch(getIntegrationsData());
        toast.success(response.message);
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

//active api integration
export const activateIntegrations = createAsyncThunk(
  "/activation",
  async ({ body, navigate }, { dispatch }) => {
    try {
      const response = await integration.activateIntegration(body, navigate);
      dispatch(getOrgIntegrationsData());
        toast.success(response?.message);
        dispatch(setIsConfirmation(false))
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

//active api integration telegram
export const activateIntegrationsTelegram = createAsyncThunk(
  "/app/activation/telegram",
  async ({ body, navigate }, { dispatch }) => {
    try {
      const response = await integration.activateIntegrationTelegram(
        body,
        navigate
      );
      dispatch(getOrgIntegrationsData());
        toast.success(response?.message);
        dispatch(setTelegramToken(""))
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        // unauthorizedError(navigate);
      } else if (error?.response) {
        toast.error(error?.message);
      } else {
        toast.error(
          error?.data?.errors ? error?.data?.errors : error?.data?.message
        );
      }
      throw error?.data?.message;
    }
  }
);

//get darwinbox api
export const getDarwinBox = createAsyncThunk(
  "/integration/darwinbox",
  async ({ employeeId, body, navigate }, { dispatch }) => {
    try {
      const response = await integration.getDawrwinBoxApi(
        employeeId,
        body,
        navigate
      );
      dispatch(getIntegrationsData());
      toast.success(response.message);
      return response;
    } catch (error) {
      if (error?.response && error?.response.status === 401) {
        // unauthorizedError(navigate);
      }
      throw error;
    }
  }
);

const IntegrationSlice = createSlice({
  name: "Integration",
  initialState: {
    loader: false,
    // filter: false,
    // isKeka: "",
    // isDBF: "",
    // isDarwinbox: "",
    // isTelegram: "",
    // isCalender: "",
    // integrationList: [],
    // orgIntegrationList: [],
    // integrationData: [],
    // instructionsData: [],
    // isTelegramActivate: "",
    openTelegram: false,
    refreshToken:"",
    employeeId:"",
    user:{
      email:"",
      password:""
    },
    telegramId:"",
    telegramToken:"",
    integrationDrawerOpen:false
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setDBF: (state, action) => {
      state.isDBF = action.payload;
      state.isKeka = false;
    },
    setCalender: (state, action) => {
      state.isCalender = action.payload;
    },
    setKeka: (state, action) => {
      state.isKeka = action.payload;
      state.isDBF = false;
    },
    setTelegram: (state, action) => {
      state.isTelegram = action.payload;
      state.isKeka = false;
      state.isDBF = false;
    },
    setIntegrationData: (state, action) => {
      state.integrationData = action.payload;
    },
    setInstructionsData: (state, action) => {
      state.instructionsData = action.payload;
    },
    setIsTelegramActivate: (state, action) => {
      state.isTelegramActivate = action.payload;
    },
    setOepnTelegram: (state, action) => {
      state.openTelegram = action.payload;
    },
    setIsDarwinBox: (state, action) => {
      state.isDarwinbox = action.payload;
      state.isDBF = false;
      state.isKeka = false;
      state.isTelegram = false;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setEmployeeId: (state, action) => {
      state.employeeId = action.payload;
    },
    setUser: (state, action) => {
      const { email, password } = action.payload;
      if (email !== undefined) state.user.email = email;
      if (password !== undefined) state.user.password = password;
    },
    setTelegramId: (state, action) => {
      state.telegramId = action.payload;
    },
    setTelegramToken: (state, action) => {
      state.telegramToken = action.payload;
    },
    setIntegrationDrawerOpen: (state, action) => {
      state.integrationDrawerOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIntegrationsData.pending, (state) => {
        state.loader = true;
      })
      .addCase(getIntegrationsData.fulfilled, (state, action) => {
        state.loader = false;
        state.integrationList = action.payload;
      })
      .addCase(getIntegrationsData.rejected, (state) => {
        state.loader = false;
      })
      .addCase(updateIntegrationsData.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateIntegrationsData.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(updateIntegrationsData.rejected, (state) => {
        state.loader = false;
      })
      .addCase(kekaIntegrations.pending, (state) => {
        state.loader = true;
      })
      .addCase(kekaIntegrations.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(kekaIntegrations.rejected, (state) => {
        state.loader = false;
      })
      .addCase(telegramIntegrations.pending, (state) => {
        state.loader = true;
      })
      .addCase(telegramIntegrations.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(telegramIntegrations.rejected, (state) => {
        state.loader = false;
      })
      .addCase(dbfIntegrations.pending, (state) => {
        state.loader = true;
      })
      .addCase(dbfIntegrations.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(dbfIntegrations.rejected, (state) => {
        state.loader = false;
      })
      .addCase(getOrgIntegrationsData.pending, (state) => {
        state.loader = true;
      })
      .addCase(getOrgIntegrationsData.fulfilled, (state, action) => {
        state.loader = false;
        state.orgIntegrationList = action.payload;
      })
      .addCase(getOrgIntegrationsData.rejected, (state) => {
        state.loader = false;
      })
      .addCase(activateIntegrations.pending, (state) => {
        state.loader = true;
      })
      .addCase(activateIntegrations.fulfilled, (state, action) => {
        state.loader = false;
        state.orgIntegrationList = action.payload;
      })
      .addCase(activateIntegrations.rejected, (state) => {
        state.loader = false;
      })
      .addCase(activateIntegrationsTelegram.pending, (state) => {
        state.loader = true;
      })
      .addCase(activateIntegrationsTelegram.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(activateIntegrationsTelegram.rejected, (state) => {
        state.loader = false;
      })
      .addCase(getDarwinBox.pending, (state) => {
        state.loader = true;
      })
      .addCase(getDarwinBox.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(getDarwinBox.rejected, (state) => {
        state.loader = false;
      });
  },
});

export const {
  setFilter,
  setCalender,
  setDBF,
  setKeka,
  setTelegram,
  setIntegrationData,
  setInstructionsData,
  setIsTelegramActivate,
  setOepnTelegram,
  setIsDarwinBox,
  setRefreshToken,
  setEmployeeId,
  setUser,
  setTelegramId,
  setTelegramToken,
  setIntegrationDrawerOpen
} = IntegrationSlice.actions;

export default IntegrationSlice.reducer;
