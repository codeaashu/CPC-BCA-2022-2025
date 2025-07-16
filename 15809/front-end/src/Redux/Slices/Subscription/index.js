import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserChannelSubscribers, getSubscribedChannels, toggleSubscription } from "@/axios";

export const fetchSubscribedChannels = createAsyncThunk(
  "subscription/subscribed",
  async (userId, thunkApi) => {
    try {
      const response = await getSubscribedChannels(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchChannelSubscribers = createAsyncThunk(
  "subscription/subscribers",
  async (userId, thunkApi) => {
    try {
      const response = await getUserChannelSubscribers(userId);
      
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchToggleSubscription = createAsyncThunk(
  "subscription/toggleSubscription",
  async (userId, thunkApi) => {
    try {
      const response = await toggleSubscription(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscribedChannels: [],
    channelSubscribers: [],
    subscriptionIsLoading: false,
    subscriptionError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribedChannels.pending, (state) => {
        state.subscriptionIsLoading = true;
        state.subscriptionError = null;
      })
      .addCase(fetchSubscribedChannels.fulfilled, (state, action) => {
        state.subscriptionIsLoading = false;
        state.subscribedChannels = action.payload;
      })
      .addCase(fetchSubscribedChannels.rejected, (state, action) => {
        state.subscriptionIsLoading = false;
        state.subscriptionError = action.payload;
      })

      .addCase(fetchChannelSubscribers.pending, (state) => {
        state.subscriptionIsLoading = true;
        state.subscriptionError = null;
      })
      .addCase(fetchChannelSubscribers.fulfilled, (state, action) => {
        state.subscriptionIsLoading = false;
        state.channelSubscribers = action.payload;
      })
      .addCase(fetchChannelSubscribers.rejected, (state, action) => {
        state.subscriptionIsLoading = false;
        state.subscriptionError = action.payload;
      })

      .addCase(fetchToggleSubscription.pending, (state) => {
        state.subscriptionIsLoading = true;
        state.subscriptionError = null;
      })
      .addCase(fetchToggleSubscription.fulfilled, (state, action) => {
        state.subscriptionIsLoading = false;
        state.channelSubscribers = action.payload;
      })
      .addCase(fetchToggleSubscription.rejected, (state, action) => {
        state.subscriptionIsLoading = false;
        state.subscriptionError = action.payload;
      })
  },
});

export default subscriptionSlice.reducer;
