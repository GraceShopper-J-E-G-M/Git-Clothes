import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart", async (user) => {
  try {
    console.log("In slice:", user);
    const userId = user.id;
    const { data } = await axios.get("/api/cart", { params: { userId } });
    console.log("In slice:", data);
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const addCartAsync = createAsyncThunk("addCart", async ({ reqbody }) => {
  try {
    const { data } = await axios.post("/api/cart", reqbody);
    return data;
  } catch (err) {
    console.error(err);
  }
});

const initialState = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addCartAsync.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
