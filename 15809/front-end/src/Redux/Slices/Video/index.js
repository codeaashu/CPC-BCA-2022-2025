import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteVideoById,
  getAllVideos,
  getVideoById,
  getVideosBySearch,
  postVideo,
  updateVideo,
} from "@/axios";

// fetching all videos with pagination
export const fetchAllVideos = createAsyncThunk(
  "video/get",
  async (page = 1, thunkAPI) => {
    try {
      const response = await getAllVideos(page);
      return response;
    } catch (error) {
      console.error("Error fetching videos:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// for fetching video by id
export const fetchVideoById = createAsyncThunk(
  "video/getById",
  async (videoId, thunkAPI) => {
    try {
      const response = await getVideoById(videoId);
      // console.log("API Response fetch video by id:", response);
      // console.log("from fvbi ", videoId);

      return response.data[0];
    } catch (error) {
      console.error("Error fetching videos:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// for fetching related videos
export const fetchRelatedVideos = createAsyncThunk(
  "video/getRelated",
  async (videoId, thunkAPI) => {
    try {
      // Use the existing getAllVideos function but we'll filter out the current video later
      const response = await getAllVideos();

      // Since we might not have a specific API endpoint for related videos,
      // we'll simulate it by returning all videos except the current one
      const allVideos = response.data;
      const relatedVideos = Array.isArray(allVideos.docs)
        ? allVideos.docs.filter((video) => video._id !== videoId)
        : [];

      return relatedVideos;
    } catch (error) {
      console.error("Error fetching related videos:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPostVideo = createAsyncThunk(
  "video/post",
  async (data, thunkAPI) => {
    try {
      const response = await postVideo(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteVideoById = createAsyncThunk(
  "video/delete",
  async (videoId, thunkAPI) => {
    try {
      const response = await deleteVideoById(videoId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const fetchVideosBySearch = createAsyncThunk(
  "video/search",
  async ({ query, page, sortBy, sortType }, thunkAPI) => {
    try {
      const response = await getVideosBySearch(query, page, sortBy, sortType);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchVideoUpdate = createAsyncThunk('video/update',async({data,videoId},thunkAPI)=>{
  try {
    const response = await updateVideo(data,videoId);
    return response.data;
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})

const videoSlice = createSlice({
  name: "video",
  initialState: {
    content: [],
    selectedVideo: null,
    relatedVideos: [],
    videoLoading: false,
    videoError: null,
    searchResult: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.content = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload; // Access the payload from rejectWithValue
      })

      .addCase(fetchVideoById.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      })

      // fetchRelatedVideos
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.relatedVideos = action.payload;
        if (state.selectedVideo) {
          state.currentVideoIndex = state.relatedVideos.findIndex(
            (video) => video._id === state.selectedVideo._id
          );
        }
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload;
        state.relatedVideos = [];
      })

      .addCase(fetchPostVideo.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchPostVideo.fulfilled, (state, action) => {
        state.videoLoading = false;
      })
      .addCase(fetchPostVideo.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload;
      })

      .addCase(fetchDeleteVideoById.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchDeleteVideoById.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchDeleteVideoById.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      })

      
      .addCase(fetchVideosBySearch.pending,(state)=>{
        state.videoLoading = true;
        state.videoError = null;

      })
      .addCase(fetchVideosBySearch.fulfilled,(state, action)=>{
        state.videoError = null;
        state.videoLoading = false;
        state.searchResult = action.payload;

      })
      .addCase(fetchVideosBySearch.rejected,(state,action)=>{
        state.videoLoading = false;
        state.videoError = action.payload;
      })

      // fetchVideoUpdate
      .addCase(fetchVideoUpdate.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchVideoUpdate.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.selectedVideo = action.payload;
        
        // // Update the video in content array if it exists there
        // if (state.content && state.content.docs) {
        //   const index = state.content.docs.findIndex(video => video._id === action.payload._id);
        //   if (index !== -1) {
        //     state.content.docs[index] = action.payload;
        //   }
        // }
      })
      .addCase(fetchVideoUpdate.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload;
      })
  },
});

export default videoSlice.reducer;
