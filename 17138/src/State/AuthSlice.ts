import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { log } from "console";
import { User } from "../types/userTypes";
// import { resetSeller } from "./seller/sellerSlice";


export const sendLoginSignupOtp = createAsyncThunk(
  "seller/sendLoginSignupOtp",async({email}:{email:string},{rejectWithValue}) => {
    try{
        const response = await api.post("/auth/sent/loginsignupotp",{email});
        console.log("Login OTP : ", response);
    }   catch (error) {
      console.error("Error fetching seller profile:", error); 
    }
}
)

export const signin = createAsyncThunk<any,any>(
  "auth/signin",async(loginRequest:{email:string},{rejectWithValue}) => {
    try{
        const response = await api.post("/auth/signing",loginRequest);
        console.log("Login OTP : ", response.data);
        localStorage.setItem("jwt", response.data.jwt);
        return response.data.jwt;
    }   catch (error) {
      console.error("Error fetching seller profile:", error); 
    }
}
)

export const signup = createAsyncThunk<any,any>(
  "auth/signup",async(signupRequest:{email:string},{rejectWithValue}) => {
    try{
        const response = await api.post("/auth/signup",signupRequest);
        console.log("Login OTP : ", response.data);
        localStorage.setItem("jwt", response.data.jwt);
        return response.data.jwt;
    }   catch (error) {
      console.error("Error fetching seller profile:", error); 
    }
}
)

export const fetchUserProfile = createAsyncThunk<any,any>(
  "/auth/fetchUserProfile",async({jwt},{rejectWithValue}) => {
    try{
        const response = await api.get("/users/profile",
         { headers:{
            Authorization: `Bearer ${jwt}`,
          },
          });
        console.log("User Profile : ", response.data);
        
        return response.data;
    }   catch (error) {
      console.error("Error fetching seller profile:", error); 
    }
}
)

export const logout = createAsyncThunk<any,any>(
  "/auth/logout",async(navigate, {rejectWithValue}) => {
    try{
        localStorage.clear();
        console.log("Logout Success: ");
        navigate("/");
    }   catch (error) {
      console.error("Error Logout", error); 
    }
}
)

interface AuthState {
  jwt: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null; 
  loading: boolean;
}

const initialState:AuthState = {
  jwt: localStorage.getItem("jwt") || null,
  otpSent: false,
  isLoggedIn: false,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(sendLoginSignupOtp.pending, (state) => {
      state.loading = true;
    })
    

    builder
      .addCase(sendLoginSignupOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginSignupOtp.rejected, (state) => {
        state.loading = false;
        state.otpSent = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.jwt = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.jwt = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.jwt = null;
        state.isLoggedIn = false;
        state.user = null;
      })
      
      builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })

      
  },

})

export default authSlice.reducer;

