import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddressAsync = createAsyncThunk("addresses", async (user) => {
  try {
    console.log("In address slice:", user);
    if (user) {
      const userId = user.id;
      const { data } = await axios.get(`/api/users/${userId}/address`);
      console.log("In address slice return data:", data);
      return data;
    }
  } catch (err) {
    console.error(err);
  }
});

const initialState = {};
export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddressAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAddress = (state) => state.address;
export default addressSlice.reducer;
