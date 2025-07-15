import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/cartTypes";
import { api } from "../../config/Api";
import { CouponState } from "../../types/couponType";

const API_URL = "api/coupons";

export const applyCoupon = createAsyncThunk
<Cart, { jwt: string | null; Code: string;
    orderValue: number;
    apply:string;
 },{rejectValue:string}>(
    "coupon/applyCoupon",
    async ({ jwt, Code, orderValue, apply }, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/apply`, null, {
                params: {
                    code: Code,
                    orderValue: orderValue,
                    apply: apply,
                },
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Apply coupon response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error applying coupon:", error.response);
            return rejectWithValue("Failed to apply coupon");
        }
    }
    
);

const initialState: CouponState = {
    coupons: null,
    cart: null,
    loading: false,
    error: null,
    couponCreated: false,
    couponApplied: false,
};

export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        resetCouponState: (state) => {
            state.coupons = null;
            state.cart = null;
            state.loading = false;
            state.error = null;
            state.couponCreated = false;
            state.couponApplied = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.couponApplied = true;
            })
            .addCase(applyCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.couponApplied = false;
            });
    },
});
    