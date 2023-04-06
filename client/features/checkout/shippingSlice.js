import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addShippingAddressAsync = createAsyncThunk(
  "addShipping",
  async ({ cartId, reqbody }) => {
    try {
      const { data } = await axios.post(
        `/api/checkout/${cartId}/shipping`,
        reqbody
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {};
export const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addShippingAddressAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectShipping = (state) => state.shipping;

export default shippingSlice.reducer;
