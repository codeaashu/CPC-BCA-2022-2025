import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Order, OrderItem, OrderState } from "../../types/orderTypes";
import { Address } from "../../types/userTypes";

const initialState: OrderState = {
    orders: [],
    orderItem: null,
    curentOrder: null,
    // paymentOrder: null,
    loading: false,
    error: null,
    orderCancelled: false,
};

const API_URL="/api/orders";

export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
    "order/fetchUserOrderHistory",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get<Order[]>(`$(API_URL)/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Order history response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching user order history:", error.response);
            return rejectWithValue("Failed to fetch order history");
        }
    }
);

export const fetchOrderById = createAsyncThunk<Order, { jwt: string | null; orderId: number }>(
    "order/fetchOrderById",
    async ({ jwt, orderId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Fetch order by ID response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching order by ID:", error.response);
            return rejectWithValue("Failed to fetch order by ID");
        }
    }
);

export const createOrder = createAsyncThunk<any, {address:Address; jwt: string ; paymentGateway: string }>(
    "order/createOrder",
    async ({ jwt, address, paymentGateway }, { rejectWithValue }) => {
        try {
            const response = await api.post(API_URL, address,  {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                params: {
                    paymentMethod: paymentGateway,
                },
            });
            if(response.data.payment_link_url) {
                window.location.href = response.data.payment_link_url;
            }
            console.log("Create order response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error creating order:", error.response);
            return rejectWithValue("Failed to create order");
        }
    }
);

export const fetchOrderItemById = createAsyncThunk<OrderItem, { jwt: string | null; orderItemId: number }>(
    "order/fetchOrderItemById",
    async ({ jwt, orderItemId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/item/${orderItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Fetch order item by ID response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching order item by ID:", error.response);
            return rejectWithValue("Failed to fetch order item by ID");
        }
    }
);

export const paymentSuccess = createAsyncThunk<Order, { jwt: string | null; orderId: number }>(
    "order/paymentSuccess",
    async ({ jwt, orderId }, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/payment/success`, null, {
                params: {
                    orderId: orderId,
                },
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Payment success response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error processing payment success:", error.response);
            return rejectWithValue("Failed to process payment success");
        }
    }
);

export const cancelOrder = createAsyncThunk<Order, { jwt: string | null; orderId: number }>(
    "order/cancelOrder",
    async ({ jwt, orderId }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/cancel`, null, {
                params: {
                    orderId: orderId,
                },
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Cancel order response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error cancelling order:", error.response);
            return rejectWithValue("Failed to cancel order");
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrderHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.curentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                // Handle the response as needed
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchOrderItemById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderItemById.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItem = action.payload;
            })
            .addCase(fetchOrderItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(paymentSuccess.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(paymentSuccess.fulfilled, (state, action) => { 
                state.loading = false;
                state.curentOrder = action.payload;
            })
            .addCase(paymentSuccess.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.curentOrder = action.payload;
                state.orderCancelled = true;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.orderCancelled = false;
            });
    },
});


export default orderSlice.reducer;