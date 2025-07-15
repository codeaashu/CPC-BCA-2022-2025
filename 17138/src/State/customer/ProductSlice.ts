import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";
import { create } from "domain";

const API_URL = "/products";
 export const fetchProductById = createAsyncThunk(
    "products/fetchProductById", async (productId:number,{rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/${productId}`);
            
            const data = response.data;
            console.log("Product data:", data);
            return data;
        } catch (error:any) {
            console.error("Error fetching product:", error);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk
// export const fetchProductById = createAsyncThunk(
//   'products/fetchProductById',
//   async (productId: number, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/products/${productId}`);
//       return response.data;
//     } catch (error:any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

 export const searchProduct = createAsyncThunk(
    "products/searchProduct", 
    async (query, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/search`, {
                params: { 
                     query 
                    },
                });
            
            const data = response.data;
            console.log("Search Product data:", data);
            return data;
        } catch (error:any) {
            console.error("Error fetching search product:", error);
            return rejectWithValue(error.message);
        }
    }
);

 export const fetchAllProducts = createAsyncThunk<any,any>(
    "products/fetchAllProducts", 
    async (params,{rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}`,
                {
                    params: {
                        ...params,
                        pageNumber: params.pageNumber || 0 // Spread the params object to include all query parameters
                    }
                }
            );
            
            

            const data = response.data;
            console.log("All Product data:", data);
            return data;
        } catch (error:any) {
            console.error("Error fetching All product:", error);
            return rejectWithValue(error.message);
        }
    }
);

interface ProductState {
    product: Product | null;
    products: Product[] ;
    totalPages: number;
    loading: boolean;
    error: string | null | undefined | any;
    searchProduct: Product[];
}

const initialState: ProductState = {
    product: null,
    products: [],
    totalPages: 1,
    loading: false,
    error: null,
    searchProduct: [],
};

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(searchProduct.pending, (state) => {
                state.loading = true;
                
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.searchProduct = action.payload;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ;
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.content;
               
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});
export default ProductSlice.reducer;