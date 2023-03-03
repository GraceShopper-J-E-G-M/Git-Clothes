import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editOrderItemAsync = createAsyncThunk(
  "editOrderItem",
  async ({ orderItemId, reqBody }) => {
    try {
      console.log(orderItemId, reqBody);
      const { data } = await axios.put(`/api/cart/${orderItemId}`, reqBody);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteOrderItemAsync = createAsyncThunk(
  "deleteOrderItem",
  async (orderItemId) => {
    try {
      const { data } = await axios.delete("/api/cart", {
        params: { orderItemId },
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {};
export const orderItemSlice = createSlice({
  name: "orderItem",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(editOrderItemAsync.fulfilled, (state, action) => {
      console.log("In OrderItem slice:", action.payload);
      return action.payload;
    }),
});

export const selectOrderItem = (state) => state.orderItem;

export default orderItemSlice.reducer;
