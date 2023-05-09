/**
 * This file contains an allUsersSlice to configure all of my Redux logic for the `users` slice of my state.
 */

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * `fetchUsersAsync` GETS data at /api/users and returns all users.
 */
export const fetchAllUsersAsync = createAsyncThunk(
  "allUsers/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/users");
      data.sort();
      
      return data;
    } catch (error) {
  
    }
  }
);

/**
 * `deleteUserById DELETES data at api/users/:userId
 */
export const deleteUserById = createAsyncThunk(
  "users/deleteUserById",
  async (userId) => {
    const { data } = await axios.delete(`/api/users/${userId}`);
    return data;
  }
);

//Here I invoke the createSlice function, and pass it an object with all of my state details.
export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    //For now, all our data is aync so my logic does not go here, but in the extraReducers.
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAsync.fulfilled, (state, { payload }) => payload)
      .addCase(deleteUserById.fulfilled, (state, { payload }) =>
        state.filter((user) => user.id !== payload.id)
      );
  },
});

//*This is a function I will pass to useSelect in my `Users` component, to read values from my specific slice of my redux store.
export const selectAllUsers = (state) => state.allUsers;

//*I need to export the reducer from my slice, and add it to my configureStore function in client/app/store.js.
export default allUsersSlice.reducer;
