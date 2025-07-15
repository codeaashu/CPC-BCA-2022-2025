import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";
import { create } from "domain";

export const fetchSellerProducts = createAsyncThunk<Product[],any>(
  "/sellerProduct/fetchSellerProducts",
    async (jwt, { rejectWithValue }) => {
        try {
        const response = await api.get("/sellers/products", {
            headers: {
            Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Seller products fetched successfully:", response.data);
        
        return response.data;
        } catch (error) {
        console.error("Error fetching seller products:", error);
        throw error;
        }
    }
)

export const createProduct = createAsyncThunk<Product,
 { request:any,jwt: string |null}>(
    "/sellerProduct/createProduct",
    async (args, { rejectWithValue }) => {
        const { request, jwt } = args;
        try {
        const response = await api.post("/sellers/products", request, {
            headers: {
            Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Product created successfully:", response.data);
         // Optionally, you can return the created product
         // to update the state in the slice.
        return response.data;
        } catch (error) {
        console.error("Error creating product:", error);
        return rejectWithValue(error);
        }
    }
 )

 interface SellerProductState {
    products: Product[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
}
const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            builder.addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            })
            builder.addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            builder.addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create product";
            });
    },
    });

    export default sellerProductSlice.reducer;