import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, signUp } from "@/axios";

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (data, thunkApi) => {
    try {
      const response = await loginUser(data);
      
      return response.data;

    } catch (error) {
      thunkApi.rejectWithValue(error.message || error);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    try {
      const response = await logoutUser();
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchSignUp = createAsyncThunk(
  "user/signup",
  async (data, thunkApi) => {
    try {
      const response = await signUp(data);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: {},
    authIsLoading: false,
    authError: null,
    success: false,
  },
  reducers: {
    resetAuthState: (state) => {
      state.authIsLoading = false;
      state.authError = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state, action) => {
        state.authIsLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.authData = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.authIsLoading = false;
        state.authError = action.payload;
      })
      
      .addCase(fetchLogout.pending, (state, action) => {
        state.authIsLoading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.authIsLoading = false;
        // state.authData = action.payload;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.authIsLoading = false;
        state.authError = action.payload;
      })

      .addCase(fetchSignUp.pending, (state, action) => {
        state.authIsLoading = true;
        state.authError = null;
        state.success = false;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.success = true;
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.authIsLoading = false;
        state.authData = action.payload;
      })
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
