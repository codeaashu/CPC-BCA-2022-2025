import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChannel } from '@/axios';

export const fetchChannelDetail = createAsyncThunk('channel/get', async (username, thunkAPI) => {
    try {
        const response = await getChannel(username);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channelData: [],
        channelIsLoading:false,
        channelError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannelDetail.pending, (state) => {
                state.channelIsLoading = true;
            })
            .addCase(fetchChannelDetail.fulfilled, (state, action) => {
                state.channelIsLoading = false;
                state.channelData = action.payload;
            })
            .addCase(fetchChannelDetail.rejected, (state, action) => {
                state.channelIsLoading = false;
                state.channelError = action.payload;
            });
    },
});

export default channelSlice.reducer;