import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addPaymentAsync = createAsyncThunk(
  "addPayment",
  async ({ cartId, reqbody }) => {
    try {
      const { data } = await axios.post(
        `/api/checkout/${cartId}/payment`,
        reqbody
      );
      return data;
    } catch (err) {
      
    }
  }
);

export const fetchPaymentAsync = createAsyncThunk("payment", async (user) => {
  try {
    if (user) {
      const userId = user.id;
      const { data } = await axios.get(`/api/users/${userId}/payment`);
      return data;
    }
  } catch (err) {
    
  }
});

const initialState = {};
export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPaymentAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchPaymentAsync.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectPayment = (state) => state.payment;

export default paymentSlice.reducer;
