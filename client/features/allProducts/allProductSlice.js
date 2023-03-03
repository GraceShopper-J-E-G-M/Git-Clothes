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
    name: "allProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });

  export const selectAllProducts = (state) => {
    return state.allProducts;
  }
  
  export default allProductSlice.reducer;