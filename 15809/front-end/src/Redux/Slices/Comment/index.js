import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createComment,
  getAllCommentsOnVideo,
  getCommentsOnVideo,
  getLikedComment,
  likeToggleOnComment,
} from "@/axios";

export const fetchCommentsOnVideo = createAsyncThunk(
  "comment/get",
  async (videoId, thunkApi) => {
    try {
      const response = await getAllCommentsOnVideo(videoId);
      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createVideoComment = createAsyncThunk(
  "comment/add",
  async ({ videoId, content }, thunkApi) => {
    try {
      const response = await createComment(videoId, { content });
      // Fetch updated comments after creating new one
      thunkApi.dispatch(fetchCommentsOnVideo(videoId));
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchLikeOnComment = createAsyncThunk(
  "comment/getLike",
  async (commentId, thunkApi) => {
    try {
      const response = await getLikedComment(commentId);
      // console.log(response)
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const fetchToggleLikeOnComment = createAsyncThunk("comment/toggleLike",async(commentId,thunkApi)=>{
//     try {
//         const response = await likeToggleOnComment(commentId);
//         // thunkApi.dispatch(fetchLikeOnComment)
//         return response.data;

//     } catch (error) {
//         return thunkApi.rejectWithValue(error.message);
//     }
// })

export const fetchToggleLikeOnComment = createAsyncThunk(
    "comment/toggleLike",
    async (commentId, thunkApi) => {
      try {
        const response = await likeToggleOnComment(commentId);
        // Fetch the updated like status after toggle
        const likeStatusResponse = await getLikedComment(commentId);
        return { 
          commentId, 
          data: response.data,
          isLiked: likeStatusResponse.data 
        };
      } catch (error) {
        return thunkApi.rejectWithValue({ commentId, error: error.message });
      }
    }
  );
// Only fetch like status for visible comments
export const fetchLikeStatus = createAsyncThunk(
  "comment/getLikeStatus",
  async (commentId, thunkApi) => {
    try {
      const response = await getLikedComment(commentId);
      return { commentId, isLiked: response.data };
    } catch (error) {
      return thunkApi.rejectWithValue({ commentId, error: error.message });
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentData: [],
    commentLoading: false,
    commentError: null,

    likedCommentData: [],
    likedCommentLoading: false,
    likedCommentError: null,
    likedComments: {}, // { commentId: boolean }
    likeLoadingStates: {}, // { commentId: boolean }
  },
  reducers: {
    setLikeLoadingState: (state, action) => {
      const { commentId, isLoading } = action.payload;
      state.likeLoadingStates[commentId] = isLoading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsOnVideo.pending, (state) => {
        state.commentLoading = true;
      })
      .addCase(fetchCommentsOnVideo.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentData = action.payload;
      })
      .addCase(fetchCommentsOnVideo.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentError = action.payload;
      })
      .addCase(createVideoComment.pending, (state) => {
        state.commentLoading = true;
      })
      .addCase(createVideoComment.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentData = action.payload;
      })
      .addCase(createVideoComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentError = action.payload;
      })

      // liked comment
      .addCase(fetchLikeOnComment.pending, (state, action) => {
        state.likedCommentLoading = true;
      })
      .addCase(fetchLikeOnComment.fulfilled, (state, action) => {
        state.likedCommentLoading = false;
        state.likedCommentData = action.payload;
      })
      .addCase(fetchLikeOnComment.rejected, (state, action) => {
        state.likedCommentLoading = false;
        state.likedCommentError = action.payload;
      })

    //   .addCase(fetchToggleLikeOnComment.pending, (state, action) => {
    //     state.likedCommentLoading = true;
    //   })
    //   .addCase(fetchToggleLikeOnComment.rejected, (state, action) => {
    //     state.likedCommentLoading = false;
    //     state.likedCommentError = action.payload;
    //   })
      // .addCase(fetchToggleLikeOnComment.fulfilled,(state,action)=>{
      //     state.likedCommentLoading = false
      //     state.likedCommentError = null

      // })
      // Toggle like cases
      .addCase(fetchToggleLikeOnComment.pending, (state, action) => {
        // We can get commentId from the action meta
        const commentId = action.meta.arg;
        state.likeLoadingStates[commentId] = true;
      })
      .addCase(fetchToggleLikeOnComment.fulfilled, (state, action) => {
        const { commentId, isLiked } = action.payload;
        state.likedComments[commentId] = isLiked;
        state.likeLoadingStates[commentId] = false;
      })
      .addCase(fetchToggleLikeOnComment.rejected, (state, action) => {
        const { commentId } = action.meta.arg;
        state.likeLoadingStates[commentId] = false;
        // Revert the like status on error
        if (state.likedComments[commentId] !== undefined) {
          state.likedComments[commentId] = !state.likedComments[commentId];
        }
      })

      // Like status cases
      .addCase(fetchLikeStatus.fulfilled, (state, action) => {
        const { commentId, isLiked } = action.payload;
        state.likedComments[commentId] = isLiked;
        state.likeLoadingStates[commentId] = false;
      })
  },
});
export const { setLikeLoadingState } = commentSlice.actions;
export default commentSlice.reducer;
