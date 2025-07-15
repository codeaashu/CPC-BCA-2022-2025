import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const sellerLogin = createAsyncThunk(
  "seller/signin",async(loginRequest:{email:string},{rejectWithValue}) => {
    try{
        const response = await api.post("/sellers/login",loginRequest);
        console.log("Login OTP : ", response.data);
        const jwt = response.data.jwt;
        localStorage.setItem("jwt", jwt);
    }   catch (error) {
      console.error("Error fetching seller profile:", error); 
    }
}
)

export const createSellerAccount = createAsyncThunk(
  "seller/create",
  async (sellerData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers", sellerData);
      console.log("Account created successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Failed to create seller account", error);
      return rejectWithValue("Failed to create account");
    }
  }
);
