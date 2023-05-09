import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCheckoutCartAsync = createAsyncThunk(
  "checkoutCart",
  async (cartId) => {
    try {
 
      const { data } = await axios.get(`/api/checkout/${cartId}`);

      return data;
    } catch (err) {
   
    }
  }
);

const initialState = {};
export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCheckoutCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCheckout = (state) => state.checkout;

export default checkoutSlice.reducer;
