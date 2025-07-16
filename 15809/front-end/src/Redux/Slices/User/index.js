import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateAccount, updateAvatar, updateCoverImage, userDetail } from '@/axios';

export const fetchUserDetail = createAsyncThunk('user/get', async (_, thunkAPI) => {
    try {
        const response = await userDetail();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchUpdateAccount = createAsyncThunk("user/updateAccount",async(accountData,thunkAPI)=>{
    try {
        const response = await updateAccount(accountData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchUpdateAvatar = createAsyncThunk("user/updateAvatar",async(avatarData,thunkAPI)=>{
    try {
        const response = await updateAvatar(avatarData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchUpdateCoverImage = createAsyncThunk("user/updateCoverImage",async(coverImageData,thunkAPI)=>{
    try {
        const response = await updateCoverImage(coverImageData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetail: [],
        isLoading: false,
        error: null,
        userUpdatedDetails:[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchUserDetail cases
            .addCase(fetchUserDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userDetail = action.payload;
            })
            .addCase(fetchUserDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // fetchUpdateAccount cases
            .addCase(fetchUpdateAccount.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUpdateAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userUpdatedDetails = action.payload;
            })
            .addCase(fetchUpdateAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // fetchUpdateAvatar cases
            .addCase(fetchUpdateAvatar.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUpdateAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userUpdatedDetails = action.payload;
            })
            .addCase(fetchUpdateAvatar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // fetchUpdateCoverImage cases
            .addCase(fetchUpdateCoverImage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUpdateCoverImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userUpdatedDetails = action.payload;
            })
            .addCase(fetchUpdateCoverImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;