import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchProductsAsync = createAsyncThunk('allProducts', async () => {
    try {
      const { data } = await axios.get(`/api/products`);
      return data;
    } catch (err) {
      console.error(err);
    }
  });

  
export const allProductSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        // Add user to the state array
        return action.payload;
      });
    },
  });

  export const selectAllproduct = (state) => {
    return state.Products;
};

  export default allProductSlice.reducer;