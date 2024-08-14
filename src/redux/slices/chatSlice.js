// src/redux/chatSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import ChatService from "../../services/api/chatService";
import { addDateAndTime, unauthorizedError } from "../../utils/helpers";
import { toast } from "react-toastify";

const chat = new ChatService();
// Get the current date dynamically
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");

const endDate = `${year}-${month}-${day}`;
const startDate = "2025-1-15";

export const getChatData = createAsyncThunk(
  `/chat?startDate=${startDate}&endDate=${endDate}`,
  async (navigate, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await chat.getChatData(navigate);
      dispatch(setLoading(false));
      if (response) {
        dispatch(setMessages(response));
        const linkUrl = addDateAndTime(response);
        dispatch(setDateTime(linkUrl));
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response) {
        // unauthorizedError(navigate);
      } else {
        // toast.error("Something went wrong");
      }
      dispatch(setLoading(false));
      throw error;
    }
  }
);
export const getfeedbackData = createAsyncThunk(
  `/feedback`,
  async ({ body, navigate, id }, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const response = await chat.feedback(body, navigate, id);
      setTimeout(() => toast.success(response?.message), 3000);
      // dispatch(setLoading(false));
      if (response) {
        const linkUrl = addDateAndTime(response);
        dispatch(setDateTime(linkUrl));

        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error?.response) {
        unauthorizedError(navigate);
      } else {
        toast.error(error.response.message);
      }
      dispatch(setLoading(false));
      throw error;
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    messages: [],
    newMessage: "",
    socket: {
      connected: false,
    },
    dateData: null,
    review: false,
    jobId: "",
    feedbackStatus: "",
    feedbackLoading: false,
    isThumbsUp: true,
    isThumbsDown: true,
    isReviewIcon: false,
    feedbackSubmitted: false,
    reviewSubmitted: false,
    loader: true,
  },
  reducers: {
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = {
        connected: true,
      };
    },
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    setDateTime: (state, action) => {
      state.dateData = action.payload;
    },
    setReview: (state, action) => {
      state.review = action.payload;
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
    setFeedbackStatus: (state, action) => {
      state.feedbackStatus = action.payload;
    },
    setIsThumbsUp: (state, action) => {
      state.isThumbsUp = action.payload;
    },
    setIsThumbsDown: (state, action) => {
      state.isThumbsDown = action.payload;
    },
    setIsReviewIcon: (state, action) => {
      state.isReviewIcon = action.payload;
    },
    setFeedbackSubmitted: (state, action) => {
      state.feedbackSubmitted = action.payload;
    },
    setReviewSubmitted: (state, action) => {
      state.reviewSubmitted = action.payload;
    },
    setLoading: (state, action) => {
      state.loader = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChatData.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getChatData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getfeedbackData.pending, (state) => {
        state.feedbackLoading = true;
      })
      .addCase(getfeedbackData.fulfilled, (state, action) => {
        state.feedbackLoading = false;
        state.messages = action.payload;
      })
      .addCase(getfeedbackData.rejected, (state) => {
        state.feedbackLoading = false;
      });
  },
});

export const {
  setMessages,
  setNewMessage,
  setSocket,
  setDateTime,
  setReview,
  setJobId,
  setFeedbackStatus,
  setIsThumbsUp,
  setIsReviewIcon,
  setFeedbackSubmitted,
  setIsThumbsDown,
  setReviewSubmitted,
  setLoading,
} = chatSlice.actions;

export default chatSlice.reducer;
