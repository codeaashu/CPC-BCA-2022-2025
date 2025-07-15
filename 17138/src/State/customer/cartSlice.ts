import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../config/Api";
import { Cart,CartItem } from "../../types/cartTypes";

interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
};

const API_URL= "/api/cart";

export const fetchUserCart = createAsyncThunk<Cart, string>(
    "cart/fetchUserCart",
    async (jwt:string, { rejectWithValue }) => {
        try {
            const response = await api.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Cart response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching user cart:", error.response);
            return rejectWithValue("Failed to fetch user cart");
            
    }
});

interface AddItemRequest {
    productId: number;
    size: string;
    quantity: number;
}

export const addItemToCart = createAsyncThunk<Cart, AddItemRequest & { jwt: string | null; request: AddItemRequest }>(
    "cart/addItemToCart",
    async ({ jwt, request }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/add`, request, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Add item to cart response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error adding item to cart:", error.response);
            return rejectWithValue("Failed to add item to cart");
        }
    }
);

export const deleteCartItem  = createAsyncThunk
<any, { jwt: string | null; cartItemId: number }>(
    "cart/deleteCartItem",
    async ({ jwt, cartItemId }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Delete cart item response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error deleting cart item:", error.response);
            return rejectWithValue("Failed to delete cart item");
        }
    }
);

export const updateCartItem = createAsyncThunk<Cart, { jwt: string | null; cartItemId: number; cartItem:{quantity:number} }>(
    "cart/updateCartItem",
    async ({ jwt, cartItemId,cartItem }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/item/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Update cart item response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error updating cart item:", error.response);
            return rejectWithValue("Failed to update cart item");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCartState: (state) => {
            state.cart = null;
            state.loading = false;
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                if (state.cart) {
                    const updatedItems = state.cart.cartItems.filter(item => item.id !== action.payload.id);
                    state.cart.cartItems = updatedItems;
                    state.cart.totalSellingPrice -= action.payload.sellingPrice * action.payload.quantity; // Adjust total price
                    state.cart.totalItem -= 1; // Decrease item count
                }
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                if (state.cart) {
                    const updatedItem = action.payload.cartItems.find(item => item.id === action.payload.id);
                    if (updatedItem) {
                        const index = state.cart.cartItems.findIndex(item => item.id === updatedItem.id);
                        if (index !== -1) {
                            state.cart.cartItems[index] = updatedItem;
                        }
                    }
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // .addCase(applyCoupon.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.cart = action.payload;
                
            // })
            
    },
});

export default cartSlice.reducer;