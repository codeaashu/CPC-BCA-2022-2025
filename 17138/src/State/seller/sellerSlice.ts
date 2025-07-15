// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { api } from "../../config/Api";
// import { report } from "process";
// import { create } from "domain";
// import { createSellerAccount } from "./sellerSliceAuth";

// export const fetchSellerProfile = createAsyncThunk(
//   "/seller/fetchSellerProfile",
//   async (jwt: string, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/sellers/profile", {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("Seller profile fetched successfully:", response.data);
//       return response.data;
//     } catch (error: any) {
//       console.error("Error fetching seller profile:", error);
//       return rejectWithValue("Failed to fetch seller profile");
//     }
//   }
// );


// // export const fetchSellerProfile = createAsyncThunk(
// //   "/seller/fetchSellerProfile",async(jwt: string,{rejectWithValue}) => {
// //     try{
// //         const response = await api.get("/sellers/profile", {
// // headers: {
// //           Authorization: `Bearer ${jwt}`,
// //         },
// //         });
// //         console.log("Seller profile fetched successfully:", response.data);
// //         return response.data;
// //     }   catch (error) {
// //       console.error("Error fetching seller profile:", error); 
// //     }
// // }
// // )

// //logout 13th jul
// // export const logout = createAsyncThunk<any,any>(
// //   "/seller/logout",async(navigate, {rejectWithValue}) => {
// //     try{
// //         localStorage.clear();
// //         console.log("Logout Success: ");
// //         navigate("/");
// //     }   catch (error) {
// //       console.error("Error Logout", error); 
// //     }
// // }
// // )

// export const logout = createAsyncThunk(
//   "/seller/logout",
//   async (navigate: (path: string) => void, { rejectWithValue }) => {
//     try {
//       localStorage.removeItem("jwt");
//       navigate("/");
//       return true;
//     } catch (error: any) {
//       return rejectWithValue("Logout failed");
//     }
//   }
// );


// interface SellerState {
//   sellers: any[],
//   selectedSeller: any | null,
//   profile: any | null,
//   report: any | null,
//   loading: boolean,
//   error: string | null,
// }

// const initialState:SellerState={
//   sellers:[],
//   selectedSeller:null,
//   profile: null,
//   report: null,
//   loading: false,
//   error: null,
// }



// const sellerSlice=createSlice({
//   name: "sellers",
//   initialState,
//   // reducers: {
//   //  clearSellerProfile: (state) => {
//   //     state.profle = null;
//   //     state.loading = false;
//   //     state.error = null;
//     // },
//   // },
//   reducers: {
//   resetSeller: () => initialState, // resets seller slice on logout
// },

//   extraReducers: (builder) => {
//     builder
//      .addCase(createSellerAccount.fulfilled, (state, action) => {
//       state.success = true;
//     })
//     .addCase(createSellerAccount.rejected, (state, action) => {
//       state.error = action.payload;
//     })
//     .addCase(fetchSellerProfile.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(fetchSellerProfile.fulfilled, (state, action) => {
//       state.loading = false;
//       state.profile = action.payload;
//       state.error = null;
//     })
//     .addCase(fetchSellerProfile.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     }
//     )
//     //logout
//     .addCase(logout.fulfilled, (state) => {
//       state.profile = null;
//       state.loading = false;
//       state.error = null;
//     } 
//     )
//     .addCase(logout.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     }
//     )
//   },
// });


// export default sellerSlice.reducer;

// // export const { clearSellerProfile } = sellerSlice.actions;
// export const { resetSeller } = sellerSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { createSellerAccount } from "./sellerSliceAuth";

export const fetchSellerProfile = createAsyncThunk(
  "/seller/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Seller profile fetched successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching seller profile:", error);
      return rejectWithValue("Failed to fetch seller profile");
    }
  }
);

export const logout = createAsyncThunk(
  "/seller/logout",
  async (navigate: (path: string) => void, { rejectWithValue }) => {
    try {
      localStorage.removeItem("jwt");
      navigate("/");
      return true;
    } catch (error: any) {
      return rejectWithValue("Logout failed");
    }
  }
);

interface SellerState {
  sellers: any[];
  selectedSeller: any | null;
  profile: any | null;
  report: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
  success: false,
};

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    resetSeller: () => initialState, // resets entire seller state (on logout)
  },
  extraReducers: (builder) => {
    builder
      // ✅ Register Seller
      .addCase(createSellerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSellerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createSellerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      // ✅ Fetch Profile
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Logout
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerSlice.reducer;
export const { resetSeller } = sellerSlice.actions;
