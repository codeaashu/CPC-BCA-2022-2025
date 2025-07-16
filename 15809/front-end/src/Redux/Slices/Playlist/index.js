import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userPlaylist,
  createPlaylist,
  addVideoOnPlaylist,
  removeVideoFromPlaylist,
  deletePlaylistById,
  getPlaylistById,
  updatePlaylistById,
} from "@/axios";

export const fetchUserPlaylist = createAsyncThunk(
  "playlist/user",
  async (userId, thunkApi) => {
    try {
      const response = await userPlaylist(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCreatePlaylist = createAsyncThunk(
  "playlist/create",
  async (data, thunkApi) => {
    try {
      const response = await createPlaylist(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchAddVideoOnPlaylist = createAsyncThunk(
  "playlist/add",
  async ({ videoId, playlistId }, thunkApi) => {
    try {
      const response = await addVideoOnPlaylist(videoId, playlistId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchRemoveVideoFromPlaylist = createAsyncThunk(
  "playlist/remove",
  async (videoId, playlistId, thunkApi) => {
    try {
      const response = await removeVideoFromPlaylist(videoId, playlistId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchUpdatePlaylistById = createAsyncThunk(
  "playlist/update",
  async (playlistId, thunkApi) => {
    try {
      const response = await updatePlaylistById(playlistId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchDeletePlaylistById = createAsyncThunk(
  "playlist/delete",
  async (playlistId, thunkApi) => {
    try {
      const response = await deletePlaylistById(playlistId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchGetPlaylistById = createAsyncThunk(
  "playlist/get",
  async (playlistId, thunkApi) => {
    try {
      const response = await getPlaylistById(playlistId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlistData: [],
    selectedPlaylist:[],
    playlistIsLoading: false,
    playlistError: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserPlaylist.pending, (state) => {
        state.playlistIsLoading = true;
      })
      .addCase(fetchUserPlaylist.fulfilled, (state, action) => {
        state.playlistIsLoading = false;
        state.playlistData = action.payload;
      })
      .addCase(fetchUserPlaylist.rejected, (state, action) => {
        state.playlistIsLoading = false;
        state.playlistError = action.payload;
      })

      .addCase(fetchCreatePlaylist.pending, (state) => {
        state.playlistIsLoading = true;
      })
      .addCase(fetchCreatePlaylist.fulfilled, (state, action) => {
        state.playlistIsLoading = false;
      })
      .addCase(fetchCreatePlaylist.rejected, (state, action) => {
        state.playlistIsLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchAddVideoOnPlaylist.pending, (state) => {
        state.playlistIsLoading = true;
      })
      .addCase(fetchAddVideoOnPlaylist.fulfilled, (state, action) => {
        state.playlistIsLoading = false;
        
      })
      .addCase(fetchAddVideoOnPlaylist.rejected, (state, action) => {
        state.playlistIsLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchRemoveVideoFromPlaylist.pending, (state) => {
        state.playlistIsLoading = true;
      })
      .addCase(fetchRemoveVideoFromPlaylist.fulfilled, (state, action) => {
        state.playlistIsLoading = false;
        state.playlistData = action.payload;
      })
      .addCase(fetchRemoveVideoFromPlaylist.rejected, (state, action) => {
        state.playlistIsLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchUpdatePlaylistById.pending, (state) => {
        state.playlistIsLoading = true;
      })
      .addCase(fetchUpdatePlaylistById.fulfilled, (state, action) => {
        state.playlistIsLoading = false;
        state.playlistData = action.payload;
      })
      .addCase(fetchUpdatePlaylistById.rejected, (state, action) => {
        state.playlistIsLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchDeletePlaylistById.pending, (state) => {
        state.playlistIsLoading = true;
      })
      .addCase(fetchDeletePlaylistById.fulfilled, (state, action) => {
        state.playlistIsLoading = false;
        state.playlistData = action.payload;
      })
      .addCase(fetchDeletePlaylistById.rejected, (state, action) => {
        state.playlistIsLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchGetPlaylistById.pending, (state) => {
        state.playlistIsLoading = true;
      })
      .addCase(fetchGetPlaylistById.fulfilled, (state, action) => {
        state.playlistIsLoading = false;
        state.selectedPlaylist = action.payload;
      })
      .addCase(fetchGetPlaylistById.rejected, (state, action) => {
        state.playlistIsLoading = false;
        state.error = action.payload;
      });
  },
});

export default playlistSlice.reducer;
