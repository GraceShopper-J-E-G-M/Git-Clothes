import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk(
  "fetchSingleUser",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      console.log("data", data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

//admin edit user
export const editSingleUser = createAsyncThunk(
  "editSingleUser",
  async ( updatedObject ) => {
    try {
      const { data } = await axios.put(`/api/users/${updatedObject.id}`, updatedObject);
      return data;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export const singleUserSlice = createSlice({
  name: "singleUser",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, { payload }) => payload);
    builder.addCase(editSingleUser.fulfilled, (state, action) => {
      return action.payload;
    })
    },
    });

export const selectSingleUser = (state) => {
  return state.singleUser;
};

export default singleUserSlice.reducer;
