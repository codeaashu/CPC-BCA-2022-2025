import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { likeToggle, likedVideo  } from "@/axios";


export const likeToggleSlice = createAsyncThunk("like/likesToggleSlice", async(videoId, thunkApi)=>{
    try {
        const response = await likeToggle(videoId);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})
export const likedVideoSlice = createAsyncThunk("like/likesVideoSlice", async(videoId, thunkApi)=>{
    try {
        const response = await likedVideo();
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

const likeSlice = createSlice({
    name:"like",
    initialState:{
        likeData:[],
        likeLoading:false,
        likeError:null
    },
    extraReducers:(builder)=>{
            builder
            // for likesToggleSlice
            .addCase(likeToggleSlice.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(likeToggleSlice.fulfilled,(state, action)=>{
                state.isLoading = false
                state.likeData = action.payload

            })
            .addCase(likeToggleSlice.rejected,(state, action)=>{
                state.isLoading = true
                state.error = action.payload

            })
            // for likedVideoSlice
            .addCase(likedVideoSlice.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(likedVideoSlice.fulfilled,(state, action)=>{
                state.isLoading = false
                state.likeData = action.payload

            })
            .addCase(likedVideoSlice.rejected,(state, action)=>{
                state.isLoading = true
                state.error = action.payload

            })
    }
})

export default likeSlice.reducer;