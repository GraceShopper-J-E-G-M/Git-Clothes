import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart", async (user) => {
  try {
    //console.log("In slice:", user);
    if (user) {
      const userId = user.id;

      const { data } = await axios.get("/api/cart", { params: { userId } });
      //console.log("In slice:", data);
      return data;
    }
  } catch (err) {
    console.error(err);
  }
});

export const addCartAsync = createAsyncThunk("addCart", async (reqbody) => {
  try {
    console.log("ReqBody:+++++++", reqbody);
    const { data } = await axios.post("/api/cart", reqbody);
    console.log("IN SLICE:+++++", data);
    return data;
  } catch (err) {
    throw new Error(`User quantity is greater than available product quantity`);
  }
});

export const updateCheckoutCartAsync = createAsyncThunk(
  "updateCart",
  async (reqbody) => {
    try {
      console.log("ReqBody:+++++++", reqbody);
      const { data } = await axios.put("/api/cart", reqbody);
      console.log("IN SLICE:+++++", data);
      return data;
    } catch (err) {
      throw new Error(
        `User quantity is greater than available product quantity`
      );
    }
  }
);

const initialState = {};
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
      })
      .addCase(addCartAsync.rejected, (state, action) => {
        console.log(action.error);
        return action.error;
      })
      .addCase(updateCheckoutCartAsync.rejected, (state, action) => {
        console.log(action.error);
        return action.error;
      });
  },
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
