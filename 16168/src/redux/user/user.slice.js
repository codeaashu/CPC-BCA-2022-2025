import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false, 
    user: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isLoggedIn = true; 
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.isLoggedIn = false; 
            state.user = {};
        }
    },      
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
