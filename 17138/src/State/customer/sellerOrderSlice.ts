import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerOrders = createAsyncThunk(
  "sellerOrders/fetchSellerOrders",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/seller/orders", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue("Failed to load seller orders");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "sellerOrders/updateOrderStatus",
  async (
    {
      jwt,
      orderId,
      orderStatus,
    }: { jwt: string; orderId: number; orderStatus: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        null,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue("Failed to update order status");
    }
  }
);

const sellerOrderSlice = createSlice({
  name: "sellerOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  } as any,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.orders.findIndex((o: any) => o.id === updated.id);
        if (index !== -1) {
          state.orders[index] = updated;
        }
      });
  },
});

export default sellerOrderSlice.reducer;
