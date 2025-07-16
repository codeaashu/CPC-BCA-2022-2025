import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { channelVideos } from "@/axios";

export const  fetchAllChannelVideos = createAsyncThunk("deshboard/fetchAllChannelVideos", async (username,thunkApi)=>{
    try {
        const response = await channelVideos(username);
        return response.data;
    } catch (error) {
        thunkApi.rejectWithValue(error.message)
    }
});

const deshboardSlice = createSlice({
    name:"deshboard",
    initialState:{
        dashboardData :[],
        dashboardLoading:false,
        dashboardError:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllChannelVideos.pending, (state)=>{
            state.dashboardLoading = true
        })
        .addCase(fetchAllChannelVideos.fulfilled, (state,action)=>{
            state.dashboardLoading = false
            state.dashboardData = action.payload;
        })
        .addCase(fetchAllChannelVideos.rejected, (state, action)=>{
            state.dashboardLoading = false
            state.dashboardError = action.payload

        })
    }

});

export default deshboardSlice.reducer;
